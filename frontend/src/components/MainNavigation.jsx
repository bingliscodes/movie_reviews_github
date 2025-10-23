"use client";

import { NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, Button, Stack, Container } from "@chakra-ui/react";
import { useContext } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";

import { ColorModeButton } from "@/components/ui/color-mode";
import { UserContext } from "../store/UserContext";
import { logout } from "../utils/js/authentication";

export default function MainNavigation() {
  const nav = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Box bg="bg.nav" boxShadow="sm" top={0} zIndex={999} w="100%" py={3}>
      <Container px={4} width="width">
        <Flex h={12} alignItems="center" justifyContent="space-between">
          {/* Left side: Logo / Home */}
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Box
              fontSize="2xl"
              fontWeight="bold"
              color="logoColor"
              _hover={{ textDecoration: "none", color: "blue.400" }}
            >
              🎬 Ben Movies
            </Box>
          </NavLink>

          {/* Right side: Buttons */}
          <Stack direction="row" spacing={4} align="center">
            <ColorModeButton
              bg="bg.primaryBtn"
              color="text.primaryBtn"
              borderRadius="full"
              _hover={{ bg: "bg.navHover" }}
            />

            {!isLoggedIn && (
              <Button
                bg="bg.primaryBtn"
                color="text.primaryBtn"
                _hover={{ bg: "bg.navHover" }}
                borderRadius="full"
                onClick={() => nav("/login")}
              >
                Log In / Sign Up
              </Button>
            )}

            {isLoggedIn && (
              <>
                <Button
                  bg="bg.primaryBtn"
                  color="text.primaryBtn"
                  borderRadius="full"
                  _hover={{ bg: "bg.navHover" }}
                  onClick={logout}
                >
                  Log Out
                </Button>

                <NavLink to="/me">
                  <Button
                    bg="bg.primaryBtn"
                    variant="ghost"
                    color="text.primaryBtn"
                    _hover={{ bg: "bg.navHover" }}
                  >
                    <HiMiniUserCircle />
                  </Button>
                </NavLink>
              </>
            )}
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
