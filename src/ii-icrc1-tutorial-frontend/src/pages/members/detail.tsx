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
} from "@chakra-ui/react";
import { useAuth } from "../../lib/AuthContext";
import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { ii_icrc1_tutorial_backend } from "../../../../declarations/ii-icrc1-tutorial-backend";
import { Member } from "../../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { getPlan } from "../../helpers/auth";
import ProfileCard from "../../components/ProfileCard";
import PostCard from "../../components/PostCard";

const actor = ii_icrc1_tutorial_backend;

export async function memberLoader({ params }: LoaderFunctionArgs) {
  const response = await actor.getMemberProfile(Principal.fromText(params.id as string)) as { ok: Member };
  return {
    member: response.ok,
    principal: params.id,
  };
}

export default function SingleMemberPage() {
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

      <Flex wrap={"wrap"} align={"center"} justify={"center"} gap={6}>
        <PostCard
          author={{
            name: "Achim Rolle",
          }}
          date={"2021-09-01"}
          title={"Boost your conversion rate"}
          description={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
          }
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
        />
      </Flex>
    </Box>
  );
}
