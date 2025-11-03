"use client";

import { Stack, VStack, HStack } from "@chakra-ui/react";

import LeftNavContent from "./LeftNavContent";
import RightNavContent from "./RightNavContent";

export default function MainNavigation() {
  return (
    <VStack bg="bg.nav" h={"5rem"} boxShadow="sm" px={2} w="full" spacing={0}>
      <HStack w="full" alignItems="center" p={2} justifyContent="space-between">
        <LeftNavContent />

        <RightNavContent />
      </HStack>
    </VStack>
  );
}
