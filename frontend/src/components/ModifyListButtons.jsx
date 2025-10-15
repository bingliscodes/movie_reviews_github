"use client";
import { Button } from "@chakra-ui/react";

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
      size="xs"
      bg="blue.400"
      color="white"
      _hover={{ bg: "blue.500" }}
      _focus={{ bg: "blue.500" }}
      onClick={async (e) => {
        e.stopPropagation();

        isInList
          ? await removeItem(listType, mediaType, mediaId)
          : await addItem(listType, mediaType, mediaId);

        await refreshLists();
      }}
    >
      {/* {isInList ? `Remove from ${label}` : `Add to ${label}`} */}
      {isInList ? <RemoveIcon /> : <AddIcon />}
    </Button>
  );
};
