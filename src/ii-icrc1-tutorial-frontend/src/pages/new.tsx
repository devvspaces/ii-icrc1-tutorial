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
  useColorMode,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useAuth } from "../lib/AuthContext";
import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { ii_icrc1_tutorial_backend } from "../../../declarations/ii-icrc1-tutorial-backend";
import { Member } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { getPlan } from "../helpers/auth";
import ProfileCard from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import { FaPlus, FaSave } from "react-icons/fa";
import { PostStatus } from "../helpers/types";
import MDEditor from "@uiw/react-md-editor";
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";

const actor = ii_icrc1_tutorial_backend;

export default function NewPost() {
  const { colorMode } = useColorMode();
  const [value, setValue] = useState("**Hello world!!!**");

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading size="lg">Create new post</Heading>
        <Button colorScheme="blue" leftIcon={<FaSave />}>
          Save
        </Button>
      </HStack>

      <HStack mb={6}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="title" isRequired>
          <FormLabel>Status</FormLabel>
          <Select>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </Select>
        </FormControl>
      </HStack>

      <FormControl id="title" isRequired>
        <FormLabel>Content</FormLabel>
        <div data-color-mode={colorMode}>
          <MDEditor
            height={"calc(100vh - 300px)"}
            value={value}
            onChange={(value) => {
              setValue(value || "");
            }}
          />
        </div>
      </FormControl>
    </Box>
  );
}
