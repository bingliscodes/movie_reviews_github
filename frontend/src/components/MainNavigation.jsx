"use client";

import { NavLink } from "react-router-dom";
import { Box, Flex, Button, Stack } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";

const NavigationLink = ({ to, children }) => {
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as={NavLink}
      to={to}
      px={3}
      py={2}
      rounded="md"
      _hover={{
        textDecoration: "none",
        backgroundColor: hoverBg,
      }}
      _currentPage={{
        fontWeight: "bold",
        color: useColorModeValue("teal.600", "teal.300"),
      }}
    >
      {children}
    </Box>
  );
};

export default function Nav() {
  const { mode, toggle } = useColorMode(); // your custom hook
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box bg={bg} px={4} width="100%">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={4}>
          <NavigationLink to="/">Home</NavigationLink>
        </Stack>

        <Stack direction="row" spacing={4} align="center">
          <Button
            onClick={toggle}
            aria-label="Toggle Color Mode"
            colorScheme="gray"
            variant="ghost"
          >
            {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          <Button variant="customModeAware">Log In / Sign Up</Button>
        </Stack>
      </Flex>
    </Box>
  );
}
