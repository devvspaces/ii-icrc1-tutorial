import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Principal } from "@dfinity/principal";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ii_icrc1_tutorial_backend } from "../../../../declarations/ii-icrc1-tutorial-backend";
import {
  Member,
  Post,
} from "../../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { getPlan } from "../../helpers/auth";
import ProfileCard from "../../components/ProfileCard";
import PostCard from "../../components/PostCard";

const actor = ii_icrc1_tutorial_backend;

export async function memberLoader({ params }: LoaderFunctionArgs) {
  const principal = Principal.fromText(params.id!!);
  const response = (await actor.getMemberProfile(principal)) as { ok: Member };
  if (!response.ok) {
    throw new Error("Member not found");
  }
  const posts = (await ii_icrc1_tutorial_backend.getMemberPosts(principal)) as {
    ok: Post[];
  };
  if (!posts.ok) {
    throw new Error("Error loading posts");
  }
  return {
    member: response.ok,
    principal: params.id,
    posts: posts.ok,
  };
}

export default function SingleMemberPage() {
  const { member, principal, posts } = useLoaderData() as {
    member: Member;
    principal: string;
    posts: Post[];
  };
  return (
    <Box>
      <ProfileCard
        name={member.name}
        bio={member.bio}
        github={member.github}
        plan={getPlan(member)!!}
      />

      <Spacer mb={6} />

      <Flex wrap={"wrap"} align={"center"} justify={"center"} gap={6}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            author={{
              name: member.name,
            }}
            date={post.createdAt.toString()}
            title={post.title}
            description={post.content}
          />
        ))}
      </Flex>
    </Box>
  );
}
