import { Flex, Box, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import logo from "../assets/MediaCatLogo.svg";

export default function LeftNavContent() {
  return (
    <Flex alignItems="center" justifyContent="space-between" gap={4}>
      {/* Left side: Logo / Home */}
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Box
          fontSize="2xl"
          fontWeight="bold"
          color="logoColor"
          _hover={{ textDecoration: "none", color: "blue.400" }}
        >
          <Flex align="center">
            MediaCat
            <Image
              marginLeft={4}
              src={logo}
              alt="MediaCat Logo"
              boxSize="4rem"
            />
          </Flex>
        </Box>
      </NavLink>
    </Flex>
  );
}
