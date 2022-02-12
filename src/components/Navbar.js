import React from "react";
import { FaHome, FaSearch, FaPlus } from "react-icons/fa";
import { MdGroup } from "react-icons/md";

import { 
  BottomNavigation, 
  BottomNavigationItem, 
  BottomNavigationIcon, 
  BottomNavigationLabel, 
} from "chakra-ui-bottom-navigation";

export default function Navbar() {
  return (
    <BottomNavigation h="60px" variant="float" colorScheme="teal" showLabel="if-active"
      onChange={(path) => window.location.href = path}>
      <BottomNavigationItem value="/">
        <BottomNavigationIcon as={FaHome} />
        <BottomNavigationLabel>Home</BottomNavigationLabel>
      </BottomNavigationItem>
      <BottomNavigationItem value="/friends">
        <BottomNavigationIcon as={MdGroup} />
        <BottomNavigationLabel>Friends</BottomNavigationLabel>
      </BottomNavigationItem>
      <BottomNavigationItem value="/search">
        <BottomNavigationIcon as={FaSearch} />
        <BottomNavigationLabel>Search</BottomNavigationLabel>
      </BottomNavigationItem>
      <BottomNavigationItem value="/new-post">
        <BottomNavigationIcon as={FaPlus} />
        <BottomNavigationLabel>New Post</BottomNavigationLabel>
      </BottomNavigationItem>
    </BottomNavigation>
  );
}
