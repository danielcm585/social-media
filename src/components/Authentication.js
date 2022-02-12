import React, { useState } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Button, Input, Text, Link } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";

export default function Authentication({ isLogin, setLogin, isOpen, onClose }) {
  // Username
  const [ username, setUsername ] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);

  // Email
  const [ email, setEmail ] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Password 
  const [ password, setPassword ] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Error
  const [ error, setError ] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input type="text" name="username" value={username} onChange={handleUsernameChange} />
            </FormControl>
            {
              !isLogin && (
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input type="email" name="email" value={email} onChange={handleEmailChange} />
                </FormControl>
              )
            }
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input type="password" name="password" value={password} onChange={handlePasswordChange} />
            </FormControl>
            {
              isLogin ? (
                <Text>
                  Create new account?{" "}
                  <Link color="teal.500" onClick={() => {
                    setError("");
                    setLogin(false);
                  }}>click here</Link>
                </Text>
              ) : (
                <Text>
                  Already have an account?{" "}
                  <Link color="teal.500" onClick={() => {
                    setError("");
                    setLogin(true);
                  }}>click here</Link>
                </Text>
              )
            }
            {
              (error != "") && (
                <Box mt="5" p="2" bgColor="red.200" borderRadius="lg">
                  <Flex>
                    <Text color="red.500">{error}</Text>
                  </Flex>
                </Box>
              )
            }
          </ModalBody>
          <ModalFooter>
            {
              isLogin ? (
                <Button bgColor="teal.400" color="white" type="submit"
                  onClick={() => {
                    const requestOptions = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        username: username,
                        password: password
                      })
                    };
                    fetch("http://localhost:3001/users/login", requestOptions)
                      .then(resp => resp.json())
                      .then(json => {
                        if (!json.success) {
                          setError(json.message);
                          return;
                        }
                        localStorage.setItem("user", JSON.stringify({ 
                          username: json.username,
                          photo: json.photo,
                          token: json.token
                        }));
                        onClose();
                      })
                      .catch(err => setError("Login failed"));
                  }}>Login</Button>
              ) : (
                <Button bgColor="teal.400" color="white" type="submit"
                  onClick={() => {
                    const requestOptions = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password
                      })
                    };
                    fetch("http://localhost:3001/users/register", requestOptions)
                      .then(resp => resp.json())
                      .then(json => {
                        if (!json.success) {
                          setError(json.message);
                          return;
                        }
                        setError("");
                        setLogin(true);
                      })
                      .catch(err => setError("Registration failed"));
                  }}>Register</Button>
              )
            }
          </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
