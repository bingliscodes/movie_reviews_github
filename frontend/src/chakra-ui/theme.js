import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        background: {
          light: { value: "#fff" },
          dark: { value: "#000" },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);
export default system;
