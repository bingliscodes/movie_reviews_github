// src/pages/RootLayout.jsx

import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode"; // your wrapper
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  // Pull mode-aware values from theme tokens
  const background = useColorModeValue("background.light", "background.dark");
  const color = useColorModeValue("text.light", "text.dark");

  return (
    <Box
      as="main"
      minHeight="100vh"
      sx={{
        backgroundColor: `{colors.${background}}`,
        color: `{colors.${color}}`,
        fontFamily: "{fonts.body}",
        padding: "{space.4}",
      }}
    >
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </Box>
  );
}
