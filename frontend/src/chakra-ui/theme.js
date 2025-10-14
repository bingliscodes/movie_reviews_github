import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { base: "colors.gray.100", _dark: "colors.blue.300" },
          },
          nav: {
            value: { base: "colors.gray.100", _dark: "colors.gray.900" },
          },
          primaryBtn: {
            value: { base: "colors.blue.200", _dark: "colors.blue.900" },
          },
          navHover: {
            value: { base: "colors.white", _dark: "colors.gray.700" },
          },
        },
        text: {
          DEFAULT: {
            value: { base: "colors.black", _dark: "colors.white" },
          },
          primaryBtn: {
            value: { base: "colors.gray.600", _dark: "colors.blue.300" },
          },
        },
      },
    },
    tokens: {
      colors: {
        // primaryBtn: { value: "gray.600", _dark: "blue.300" },
        // primary: { value: "black", _dark: "blue.300" },
        // logoColor: { value: "gray.900", _dark: "white" },
        // primaryBtnHover: { value: "blue.700", _dark: "blue.500" },
        primary: { value: "black" },
        secondary: { value: "white" },
      },
      // (you can also define other token groups: spacing, sizes, etc.)
    },
  },
});
export default system;
