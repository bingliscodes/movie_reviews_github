// src/pages/RootLayout.jsx

import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  return (
    <Box as="main" minHeight="100vh">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </Box>
  );
}
