"use client";

import { useState, useEffect } from "react";
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
import { FiHome, FiCompass, FiStar, FiSettings, FiMenu } from "react-icons/fi";

import { fetchUserData } from "../../utils/js/apiCalls";
import ListCarousel from "./ListCarousel";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Watched", icon: FiHome },
  { name: "Wish List", icon: FiCompass },
  { name: "Favorites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];
export default function UserSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home");

  useEffect(() => {
    async function fetchUserDataAsync() {
      setLoading(true);
      try {
        const userDataRes = await fetchUserData();

        setUserData(userDataRes.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }

      setLoading(false);
    }
    fetchUserDataAsync();
  }, []);

  // Will likely remove this, but reminder of all variables I have access to
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
  } = userData;

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
            <Text>Adjust your Settings here:</Text>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email address: {email}</p>
          </>
        );
      default:
        return <Text>Choose a page from the sidebar.</Text>;
    }
  };
  return (
    <Box minW="100vw" bg={useColorModeValue("gray.100", "gray.900")}>
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
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
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
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
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
