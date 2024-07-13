import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import Member from "../../components/Member";

export default function Page() {
  return (
    <Box>
      <Flex
        wrap={"wrap"}
        align={"center"}
        gap={6}
      >
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
      </Flex>
    </Box>
  );
}