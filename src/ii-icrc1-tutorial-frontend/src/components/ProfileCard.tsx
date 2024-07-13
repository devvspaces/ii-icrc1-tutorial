"use client";

import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { extractGithubUsername } from "../helpers/string";
import { getPlanColor } from "../helpers/auth";
import { Plan } from "../helpers/types";

interface Props {
  name: string;
  bio: string;
  github: string;
  plan: Plan;
}

export default function ProfileCard({ name, bio, github, plan }: Props) {
  const bg = useColorModeValue("white", "gray.900");
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={bg}
        boxShadow={"2xl"}
        padding={4}
        pos={"relative"}
      >
        <Tag
          size={"sm"}
          pos={"absolute"}
          variant="solid"
          colorScheme={getPlanColor(plan)}
          top={0}
          right={0}
          mt={2}
          mr={2}
        >
          {plan}
        </Tag>
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            alt="#"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            @{extractGithubUsername(github)}
          </Text>
          <Text
            textAlign={"center"}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {bio}
          </Text>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              as={"a"}
              target={"_blank"}
              href={github}
            >
              Github
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
