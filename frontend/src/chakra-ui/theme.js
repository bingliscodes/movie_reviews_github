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
          stack: {
            value: { base: "colors.white", _dark: "colors.gray.900" },
          },
          badge: {
            value: { base: "colors.gray.50", _dark: "colors.gray.800" },
          },
          menu: {
            value: { base: "colors.gray.200", _dark: "colors.gray.900" },
          },
          menuItem: {
            value: { base: "colors.blue.100", _dark: "colors.gray.900" },
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

        border: {
          DEFAULT: {
            value: { base: "colors.gray.200", _dark: "colors.gray.700" },
          },
        },
      },
    },
    tokens: {
      colors: {
        primary: { value: "black" },
        secondary: { value: "white" },
      },
      // (you can also define other token groups: spacing, sizes, etc.)
    },
  },
});
export default system;
