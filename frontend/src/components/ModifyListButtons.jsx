"use client";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdPlaylistAdd, MdPlaylistRemove } from "react-icons/md";
import { HiMiniBookmark, HiBookmarkSlash } from "react-icons/hi2";

import { UserContext } from "../store/userContext";
import { addToList, removeFromList } from "../utils/js/apiCalls";

export const ModifyListButton = ({ mediaType, type, mediaId }) => {
  const { userData, refreshUserData } = useContext(UserContext);

  let list;
  let listName;
  let label;
  let AddIcon;
  let RemoveIcon;

  if (type === "wish") {
    listName = mediaType === "movie" ? "movieWishList" : "tvWishList";
    label = "wishlist";
    list = userData?.data?.movieWishList || [];
    AddIcon = HiMiniBookmark;
    RemoveIcon = HiBookmarkSlash;
  }
  if (type === "watch") {
    listName = mediaType === "movie" ? "movieWatchList" : "tvWatchList";
    label = "watched";
    list = userData?.data?.movieWatchList || [];
    AddIcon = MdPlaylistAdd;
    RemoveIcon = MdPlaylistRemove;
  }
  if (type === "favorite") {
    listName = mediaType === "movie" ? "movieFavoriteList" : "tvFavoriteList";
    label = "favorites";
    list = userData?.data?.movieFavoriteList || [];
    AddIcon = AiFillHeart;
    RemoveIcon = AiOutlineHeart;
  }

  const isInList = list.includes(mediaId);

  return (
    <Button
      rounded="full"
      bg="blue.400"
      color="white"
      _hover={{ bg: "blue.500" }}
      _focus={{ bg: "blue.500" }}
      boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        isInList
          ? await removeFromList(listName, mediaId)
          : await addToList(listName, mediaId);

        await refreshUserData();
      }}
    >
      {isInList ? `Remove from ${label}` : `Add to ${label}`}
      {isInList ? <RemoveIcon /> : <AddIcon />}
    </Button>
  );
};
