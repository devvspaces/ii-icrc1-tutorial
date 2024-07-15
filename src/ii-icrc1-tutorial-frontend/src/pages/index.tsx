import { Box, Center, CircularProgress, Flex, useToast } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { ii_icrc1_tutorial_backend } from "../../../declarations/ii-icrc1-tutorial-backend";
import { useEffect, useState } from "react";
import { PostWithAuthor } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";

export default function Page() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const posts = (await ii_icrc1_tutorial_backend.getPosts()) as PostWithAuthor[];
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
    {
      posts.length === 0 && !isLoading && (
        <Center>
          <Box>No posts found</Box>
        </Center>
      )
    }
      <Flex wrap={"wrap"} align={"center"} justify={"center"} gap={6}>
          {posts.map((post, idx) => (
          <PostCard
            key={idx}
            id={post.post.id.toString()}
            owner={post.post.author}
            author={{
              name: post.author.name,
            }}
            date={post.post.createdAt.toString()}
            title={post.post.title}
            description={post.post.content}
          />
        ))}
      </Flex>
    </Box>
  );
}