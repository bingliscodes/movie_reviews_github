"use client";

import { useState, useContext } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  Drawer,
  useDisclosure,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FiHome, FiStar, FiSettings, FiMenu } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { HiEye } from "react-icons/hi2";

import ListCarousel from "./ListCarousel";
import { UserContext } from "../../store/userContext";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Watched", icon: HiEye },
  { name: "Wish List", icon: FiStar },
  { name: "Favorites", icon: AiOutlineHeart },
  { name: "Settings", icon: FiSettings },
];
export default function UserSidebar() {
  const { userData, isLoggedIn } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPage, setSelectedPage] = useState("Home");

  const boxBg = useColorModeValue("gray.100", "gray.900");

  if (!userData.data) return <h1>Loading...</h1>;

  const {
    email,
    firstName,
    lastName,
    movieFavoriteList,
    movieWatchList,
    movieWishList,
    tvFavoriteList,
    tvWatchList,
    tvWishList,
  } = userData.data;

  const renderContent = () => {
    switch (selectedPage) {
      case "Home":
        return <Text>Welcome to your Home page, {firstName}!</Text>;
      case "Watched":
        return (
          <>
            <ListCarousel
              title="Movies on your Watched List"
              type="movie"
              mediaList={movieWatchList}
            />
            <ListCarousel
              title="TV on your Watched List"
              type="tv"
              mediaList={tvWatchList}
            />
          </>
        );

      case "Wish List":
        return (
          <>
            <ListCarousel
              title="Movies on your Wish List"
              type="movie"
              mediaList={movieWishList}
            />
            <ListCarousel
              title="TV on your Wish List"
              type="tv"
              mediaList={tvWishList}
            />
          </>
        );

      case "Favorites":
        return (
          <>
            <ListCarousel
              title="Movies on your Favorites List"
              type="movie"
              mediaList={movieFavoriteList}
            />
            <ListCarousel
              title="TV on your Favorites List"
              type="tv"
              mediaList={tvFavoriteList}
            />
          </>
        );
      case "Settings":
        return (
          <>
            <Text
              w="full"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              textAlign="left"
              mt={8}
              mb={4}
              px={2}
              borderBottom="2px solid"
              borderColor="blue.400"
            >
              Personal Information:
            </Text>
            <Text textAlign="left">First Name: {firstName}</Text>
            <Text textAlign="left">Last Name: {lastName}</Text>
            <Text textAlign="left">Email address: {email}</Text>
          </>
        );
      default:
        return <Text>Choose a page from the sidebar.</Text>;
    }
  };
  return (
    <Box minW="90vw" mt={6} bg={"boxBg"} boxShadow="sm">
      <SidebarContent
        onClose={() => onClose}
        onItemSelect={setSelectedPage}
        display={{ base: "none", md: "block" }}
      />
      <Drawer.Root
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <Drawer.Content>
          <SidebarContent onClose={onClose} onItemSelect={setSelectedPage} />
        </Drawer.Content>
      </Drawer.Root>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {renderContent()}
      </Box>{" "}
    </Box>
  );
}
const SidebarContent = ({ onClose, onItemSelect, ...rest }) => {
  const sidebarBg = useColorModeValue("white", "gray.900");
  const boxBorderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Box
      bg={sidebarBg}
      borderRight="1px"
      borderRightColor={boxBorderColor}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" align="center" mx="8" justify="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Profile
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            onItemSelect(link.name);
            if (onClose) onClose();
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: "cyan.400", color: "white" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
const MobileNav = ({ onOpen, ...rest }) => {
  const sidebarBg = useColorModeValue("white", "gray.900");
  const boxBorderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={sidebarBg}
      borderBottomWidth="1px"
      borderBottomColor={boxBorderColor}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
