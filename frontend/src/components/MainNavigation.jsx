"use client";

import { NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, Button, Stack } from "@chakra-ui/react";
import { useColorModeValue, ColorModeButton } from "@/components/ui/color-mode";
import { useContext } from "react";

import { UserContext } from "../store/userContext";
import { logout } from "../utils/js/authentication";

export default function MainNavigation() {
  const nav = useNavigate();
  const bgColor = useColorModeValue("gray.300", "gray.900");
  const buttonBgColor = useColorModeValue("gray.900", "#192841");
  const buttonTextColor = useColorModeValue("white", "white");
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Box px={4} width="100%" bg={bgColor}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={4}>
          <NavLink to="/">Home</NavLink>
        </Stack>

        <Stack direction="row" spacing={4} align="center">
          <ColorModeButton bg={buttonBgColor} color={buttonTextColor} />

          {!isLoggedIn && (
            <Button
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => nav("/login")}
            >
              Log In / Sign Up
            </Button>
          )}
          {isLoggedIn && (
            <>
              <Button
                bg={buttonBgColor}
                color={buttonTextColor}
                onClick={logout}
              >
                Log Out
              </Button>

              <NavLink to="/me">Profile</NavLink>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
