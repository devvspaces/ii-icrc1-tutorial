import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../lib/AuthContext";
import {
  Link,
} from "react-router-dom";
import { getPlan } from "../helpers/auth";
import ProfileCard from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import { FaPlus } from "react-icons/fa";
import { PostStatus } from "../helpers/types";
import withAuth from "../lib/withAuth";

function ProfilePage() {

  const { state } = useAuth();

  const member = state.user?.member!!;
  
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

const Page = withAuth(ProfilePage);

export default Page;
