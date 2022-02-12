import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import UserImg from "../images/user.png";
import Authentication from "./Authentication";

import { useDisclosure } from "@chakra-ui/react";
import { 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  MenuDivider 
} from "@chakra-ui/react";
import { Text, Image, Button } from "@chakra-ui/react";
import { Flex, HStack, Box, Spacer } from "@chakra-ui/layout";

export default function Header() {
  // User
  const user = JSON.parse(localStorage.getItem("user"));
  const isGuess = (user == null);

  // Modal 
  const [ isLogin, setLogin ] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Authentication isLogin={isLogin} setLogin={setLogin} isOpen={isOpen} onClose={onClose} />
      <Flex as="header" position="fixed" w="100%" justifyContent="center">
        <Box bg="teal.200" w="480px" p="3" pl="4" pr="4">
          <HStack>
            <Text fontSize="2xl" fontWeight="bold">Social Media</Text>
            <Spacer />
            <Menu>
              <MenuButton bg="teal.100" as={Button} rightIcon={<IoChevronDown />}>
                <HStack>
                  <Image src={isGuess ? UserImg : user.photo} h="6" borderRadius="full" />
                  <Text fontSize="1xl" fontWeight="semibold">{isGuess ? "guess" : user.username}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                {
                  isGuess ? (
                    <>
                      <MenuItem onClick={() => {
                        setLogin(true);
                        onOpen();
                      }}>Login</MenuItem>
                      <MenuItem onClick={() => {
                        setLogin(false);
                        onOpen();
                      }}>Register</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>My Profile</MenuItem>
                      <MenuItem>My Account</MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/";
                      }}>Log Out</MenuItem>
                    </>
                  )
                }
              </MenuList>
            </Menu>
          </HStack>
        </Box>
      </Flex>
    </>
  );
}
