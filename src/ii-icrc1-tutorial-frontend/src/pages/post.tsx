import {
  Box,
  Heading,
  HStack,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import {
  Member,
  Post,
} from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { getPlan } from "../helpers/auth";
import withAuth from "../lib/withAuth";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ii_icrc1_tutorial_backend } from "../../../declarations/ii-icrc1-tutorial-backend";
import { Principal } from "@dfinity/principal";

const actor = ii_icrc1_tutorial_backend;

export async function postLoader({ params }: LoaderFunctionArgs) {
  const owner = Principal.fromText(params.owner as string);
  const member = (await actor.getMemberProfile(owner)) as { ok: Member };
  if (!member.ok) {
    return {
      post: null,
    };
  }
  const response = (await actor.getPost(
    BigInt(params.id as string),
    owner
  )) as { ok: Post };
  if (!response.ok) {
    return {
      post: null,
    };
  }
  return {
    post: response.ok,
    member: member.ok,
  };
}

function NewPost() {
  const { colorMode } = useColorMode();
  const { post, member } = useLoaderData() as {
    post: Post;
    member: Member;
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading size="lg">{post.title}</Heading>
      </HStack>
      
      <Box>
        <Text>Author</Text>
        <Text>{member.name}</Text>
        <Text>{member.github}</Text>
        <Text>{getPlan(member)}</Text>
      </Box>

      <div data-color-mode={colorMode}>
        <MDEditor
          height={"calc(100vh - 300px)"}
          value={post.content}
        />
      </div>
    </Box>
  );
}

const Page = withAuth(NewPost);

export default Page;
