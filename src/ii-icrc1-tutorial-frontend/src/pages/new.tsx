import {
  Box,
  Heading,
  HStack,
  Button,
  useColorMode,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Member, Post } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { FaSave } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBackendActor, createClient } from "../helpers/auth";
import withAuth from "../lib/withAuth";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const { colorMode } = useColorMode();
  const [value, setValue] = useState("**Hello world!!!**");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { state } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "**Hello world!!!**",
      status: "Published",
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(3),
      github: Yup.string().required().url(),
      bio: Yup.string().required().min(10),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        setIsLoading(true);
        const authClient = await createClient();
        const identity = authClient.getIdentity();
        const actor = await createBackendActor(identity);
        console.log("identity", identity.getPrincipal());
        console.log("actor", actor);
        const response = (await actor.createPost(
          values.title,
          values.content,
          values.status
        )) as { ok: Post, err: string }
        setIsLoading(false);
        if (response.ok !== undefined) {
          toast({
            title: "Success.",
            description: "New post created successfully.",
            status: "success",
            duration: 3000,
            position: "top",
          });
          // navigate(`/posts/${state.user?.principal.toText()}/${response.ok.id}`);
        } else {
          toast({
            title: "An error occurred.",
            description: response.err,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (e: unknown) {
        console.error(e);
        setIsLoading(false);
        toast({
          title: "An error occurred.",
          description: "An error occurred while trying to create your account.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

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

const Page = withAuth(NewPost);

export default Page;
