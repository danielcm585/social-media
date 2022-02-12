import React from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";

import { Flex } from "@chakra-ui/layout"

export default function Home() {
  return (
    <>
      <Header />
      <PostList />
      <Navbar />
    </>
  );
}
