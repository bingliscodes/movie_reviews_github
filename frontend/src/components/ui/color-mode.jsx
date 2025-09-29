"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";
import { useEffect, useState } from "react";

// Provider component
export function ColorModeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
    >
      {children}
    </NextThemesProvider>
  );
}

// Custom hook to mimic Chakra's useColorMode()
export function useColorMode() {
  const { resolvedTheme, setTheme } = useNextTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return {
    mode: resolvedTheme ?? "light", // fallback for SSR
    toggle,
  };
}

// Chakra-style helper
export function useColorModeValue(lightValue, darkValue) {
  const { resolvedTheme } = useNextTheme();
  return (resolvedTheme ?? "light") === "dark" ? darkValue : lightValue;
}
