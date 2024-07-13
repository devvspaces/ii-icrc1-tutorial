import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spacer,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../lib/AuthContext";
import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { ii_icrc1_tutorial_backend } from "../../../declarations/ii-icrc1-tutorial-backend";
import { Member } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { getPlan } from "../helpers/auth";
import ProfileCard from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import { FaPlus } from "react-icons/fa";
import { PostStatus } from "../helpers/types";

const actor = ii_icrc1_tutorial_backend;

export async function profileLoader({ params }: LoaderFunctionArgs) {
  // const member = await actor.getMember(Principal.fromText(params.id as string)) as { ok: Member };
  // const submissions = await dao.getSubmissions(params.id as string);
  // const balance = await token.balanceOf(Principal.fromText(params.id as string));
  // const tokenSymbol = await token.tokenSymbol();
  return {
    member: {
      name: "John Doe",
      github: "https://github.com/devvspaces",
      bio: "Actor, musician, songwriter and artist. PM for work inquires or ...",
      plan: { Legendary: null },
    },
    principal: "test",
  };
}

export default function ProfilePage() {
  const { member, principal } = useLoaderData() as {
    member: Member;
    principal: string;
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

      <HStack justify="space-between" mb={4}>
        <Heading size="lg">My Posts</Heading>
        <Button colorScheme="blue" leftIcon={<FaPlus />} as={Link} to={'/new/post'}>
          New Post
        </Button>
      </HStack>

      <Flex wrap={"wrap"} align={"center"} gap={6}>
        <PostCard
          author={{
            name: "Achim Rolle",
          }}
          date={"2021-09-01"}
          title={"Boost your conversion rate"}
          description={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
          }
          status={PostStatus.Published}
        />
        <PostCard
          author={{
            name: "Achim Rolle",
          }}
          date={"2021-09-01"}
          title={"Boost your conversion rate"}
          description={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
          }
          status={PostStatus.Draft}
        />
        <PostCard
          author={{
            name: "Achim Rolle",
          }}
          date={"2021-09-01"}
          title={"Boost your conversion rate"}
          description={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
          }
          status={PostStatus.Published}
        />
        <PostCard
          author={{
            name: "Achim Rolle",
          }}
          date={"2021-09-01"}
          title={"Boost your conversion rate"}
          description={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
          }
          status={PostStatus.Published}
        />
        <PostCard
          author={{
            name: "Achim Rolle",
          }}
          date={"2021-09-01"}
          title={"Boost your conversion rate"}
          description={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
          }
          status={PostStatus.Archived}
        />
      </Flex>
    </Box>
  );
}
