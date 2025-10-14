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

import { ListContext } from "../store/ListContext";

export const ModifyListButton = ({ mediaType, listType, mediaId }) => {
  const {
    movieWishlist,
    tvWishlist,
    movieWatchlist,
    tvWatchlist,
    movieFavoriteList,
    tvFavoriteList,
    removeItem,
    addItem,
    refreshLists,
  } = useContext(ListContext);

  let list;
  let label;
  let AddIcon;
  let RemoveIcon;

  if (listType === "wishlist") {
    if (mediaType === "movie") {
      list = movieWishlist || [];
    }
    if (mediaType === "tv") {
      list = tvWishlist || [];
    }
    label = "wishlist";
    AddIcon = HiMiniBookmark;
    RemoveIcon = HiBookmarkSlash;
  }

  if (listType === "watchlist") {
    if (mediaType === "movie") {
      list = movieWatchlist || [];
    }
    if (mediaType === "tv") {
      list = tvWatchlist || [];
    }
    label = "watched";
    AddIcon = MdPlaylistAdd;
    RemoveIcon = MdPlaylistRemove;
  }

  if (listType === "favorites") {
    if (mediaType === "movie") {
      list = movieFavoriteList || [];
    }
    if (mediaType === "tv") {
      list = tvFavoriteList || [];
    }
    label = "favorites";
    AddIcon = AiFillHeart;
    RemoveIcon = AiOutlineHeart;
  }

  if (!list) return;

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
        e.stopPropagation();

        isInList
          ? await removeItem(listType, mediaType, mediaId)
          : await addItem(listType, mediaType, mediaId);

        await refreshLists();
      }}
    >
      {isInList ? `Remove from ${label}` : `Add to ${label}`}
      {isInList ? <RemoveIcon /> : <AddIcon />}
    </Button>
  );
};
