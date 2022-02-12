import React, { useEffect, useState } from "react";

import Post from "./Post";

import { VStack, Flex } from "@chakra-ui/layout";

export default function PostList() {
  const [ posts, setPosts ] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };
    fetch("http://localhost:3001/posts", requestOptions)
      .then(resp => resp.json())
      .then(json => setPosts(json.posts));
  }, []);

  return (
    <Flex w="100%" justifyContent="center">
      <Flex mt="66px" w="480px">
        <VStack>
          {
            posts.map((post, index) => <Post key={index} post={post} />)
          }
        </VStack>
      </Flex>
    </Flex>
  );
}
