import React, { useState, useEffect } from "react";

import { Image, Text, Link } from "@chakra-ui/react";
import { Box, HStack } from "@chakra-ui/layout";

export default function Post({ post }) {
  const [ userImg, setUserImg ] = useState("");
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: post.username })
    };
    fetch("http://localhost:3001/users/prof-pic", requestOptions)
      .then(resp => resp.json())
      .then(json => setUserImg(json.photo));
  }, []);

  return (
    <Box mb="1">
      <Link href={"users/"+post.username}>
        <HStack p="2">
          <Image src={userImg} h="6" borderRadius="full" />
          <Text>{post.username}</Text>
        </HStack>
      </Link>
      <Image src={post.photo} />
      {/* <HStack p="2">
        Halo
      </HStack> */}
      <HStack p="2">
        <Link href={"users/"+post.username}>
          <Text fontWeight="semibold">{post.username}</Text>
        </Link>
        <Text>{post.caption}</Text>
      </HStack>
    </Box>
  );
}
