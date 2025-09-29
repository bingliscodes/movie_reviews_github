// src/components/ui/provider.jsx
import { ChakraProvider } from "@chakra-ui/react";
import system from "@/chakra-ui/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
