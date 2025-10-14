// src/components/ui/provider.jsx
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../chakra-ui/theme";
import { ColorModeProvider } from "@/components/ui/color-mode";

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}

export default Provider;
