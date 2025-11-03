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
import { FiHome, FiStar, FiSettings, FiMenu } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { HiEye } from "react-icons/hi2";

import ListCarousel from "./ListCarousel";
import { ListContext } from "../../store/ListContext";
import { UserContext } from "../../store/UserContext";
import UserSettings from "./UserSettings";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Watched", icon: HiEye },
  { name: "Wish List", icon: FiStar },
  { name: "Favorites", icon: AiOutlineHeart },
  { name: "Settings", icon: FiSettings },
];
export default function UserSidebar() {
  const userLists = useContext(ListContext);
  const { userData } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPage, setSelectedPage] = useState("Home");

  if (!userLists || !userData) return <h1>Loading...</h1>;

  const {
    movieWishlist,
    tvWishlist,
    movieWatchlist,
    tvWatchlist,
    movieFavoriteList,
    tvFavoriteList,
  } = userLists;
  const { firstName } = userData;

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
              mediaList={movieWatchlist}
            />
            <ListCarousel
              title="TV on your Watched List"
              type="tv"
              mediaList={tvWatchlist}
            />
          </>
        );

      case "Wish List":
        return (
          <>
            <ListCarousel
              title="Movies on your Wish List"
              type="movie"
              mediaList={movieWishlist}
            />
            <ListCarousel
              title="TV on your Wish List"
              type="tv"
              mediaList={tvWishlist}
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
            <UserSettings />
          </>
        );
      default:
        return <Text>Choose a page from the sidebar.</Text>;
    }
  };
  return (
    <Box minW="90vw" mt={6} bg="bg.nav" boxShadow="sm">
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
  return (
    <Box
      bg="bg.stack"
      borderRight="1px"
      borderRightColor="border"
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
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg="bg.stack"
      borderBottomWidth="1px"
      borderBottomColor="border"
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
