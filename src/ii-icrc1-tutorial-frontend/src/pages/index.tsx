import { Box, Center, CircularProgress, Flex, useToast } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { ii_icrc1_tutorial_backend } from "../../../declarations/ii-icrc1-tutorial-backend";
import { useEffect, useState } from "react";
import { Post } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";

export default function Page() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const posts = (await ii_icrc1_tutorial_backend.getPosts()) as Post[];
      setIsLoading(false);
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  return (
    <Box>
    {
      isLoading && (
       <Center>
         <CircularProgress isIndeterminate color="blue.300" />
       </Center>
      )
    }
      <Flex wrap={"wrap"} align={"center"} justify={"center"} gap={6}>
          {posts.map((post) => (
          <PostCard
            key={post.id}
            author={{
              name: 'pending',
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