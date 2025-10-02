// src/components/ui/provider.jsx
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import system from "@/chakra-ui/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";

export function Provider({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
