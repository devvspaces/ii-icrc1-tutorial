import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import PostCard from "../components/PostCard";

export default function Page() {
  return (
    <Box>
      

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