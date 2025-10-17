import { useState, useCallback, useEffect, createContext } from "react";

import { fetchAllLists, addToList, removeFromList } from "../utils/js/apiCalls";

export const ListContext = createContext();

export const ListContextProvider = ({ children }) => {
  const [movieWishlist, setMovieWishlist] = useState([]);
  const [tvWishlist, setTvWishlist] = useState([]);
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [tvWatchlist, setTvWatchlist] = useState([]);
  const [movieFavoriteList, setMovieFavoriteList] = useState([]);
  const [tvFavoriteList, setTvFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLists = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllLists();

      setMovieWishlist(data.movieWishlist || []);
      setTvWishlist(data.tvWishlist || []);

      setMovieWatchlist(data.movieWatchlist || []);
      setTvWatchlist(data.tvWatchlist || []);

      setMovieFavoriteList(data.movieFavoriteList || []);
      setTvFavoriteList(data.tvFavoriteList || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching user lists:", err);
      setError(err.message || "Failed to load lists");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  const addItem = async (listType, mediaType, item) => {
    if (listType === "wishlist") {
      if (mediaType === "movie") {
        const prev = [...movieWishlist];
        setMovieWishlist((prev) => [...prev, item]);
        try {
          await addToList("movieWishlist", item);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setMovieWatchlist(prev);
          setError(err.message || "Failed to add item");
        }
      }
      if (mediaType === "tv") {
        const prev = [...tvWishlist];
        setTvWishlist((prev) => [...prev, item]);
        try {
          await addToList("tvWishlist", item);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setTvWishlist(prev);
          setError(err.message || "Failed to add item");
        }
      }
    } else if (listType === "watchlist") {
      if (mediaType === "movie") {
        const prev = [...movieWatchlist];
        setMovieWatchlist((prev) => [...prev, item]);
        try {
          await addToList("movieWatchlist", item);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setMovieWatchlist(prev);
          setError(err.message || "Failed to add item");
        }
      }
      if (mediaType === "tv") {
        const prev = [...tvWatchlist];
        setTvWatchlist((prev) => [...prev, item]);
        try {
          await addToList("tvWatchlist", item);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setTvWatchlist(prev);
          setError(err.message || "Failed to add item");
        }
      }
    } else if (listType === "favorites") {
      if (mediaType === "movie") {
        const prev = [...movieFavoriteList];
        setMovieFavoriteList((prev) => [...prev, item]);
        try {
          await addToList("movieFavoriteList", item);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setMovieFavoriteList(prev);
          setError(err.message || "Failed to add item");
        }
      }
      if (mediaType === "tv") {
        const prev = [...tvFavoriteList];
        setTvFavoriteList((prev) => [...prev, item]);
        try {
          await addToList("tvFavoriteList", item);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setTvFavoriteList(prev);
          setError(err.message || "Failed to add item");
        }
      }
    }
  };

  const removeItem = async (listType, mediaType, itemId) => {
    if (listType === "wishlist") {
      if (mediaType === "movie") {
        const prev = [...movieWishlist];
        setMovieWishlist((prev) => [...prev, itemId]);
        try {
          await removeFromList("movieWishlist", itemId);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setMovieWatchlist(prev);
          setError(err.message || "Failed to add itemId");
        }
      }
      if (mediaType === "tv") {
        const prev = [...tvWishlist];
        setTvWishlist((prev) => [...prev, itemId]);
        try {
          await removeFromList("tvWishlist", itemId);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setTvWishlist(prev);
          setError(err.message || "Failed to add itemId");
        }
      }
    } else if (listType === "watchlist") {
      if (mediaType === "movie") {
        const prev = [...movieWatchlist];
        setMovieWatchlist((prev) => [...prev, itemId]);
        try {
          await removeFromList("movieWatchlist", itemId);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setMovieWatchlist(prev);
          setError(err.message || "Failed to add itemId");
        }
      }
      if (mediaType === "tv") {
        const prev = [...tvWatchlist];
        setTvWatchlist((prev) => [...prev, itemId]);
        try {
          await removeFromList("tvWatchlist", itemId);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setTvWatchlist(prev);
          setError(err.message || "Failed to add itemId");
        }
      }
    } else if (listType === "favorites") {
      if (mediaType === "movie") {
        const prev = [...movieFavoriteList];
        setMovieFavoriteList((prev) => [...prev, itemId]);
        try {
          await removeFromList("movieFavoriteList", itemId);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setMovieFavoriteList(prev);
          setError(err.message || "Failed to add itemId");
        }
      }
      if (mediaType === "tv") {
        const prev = [...tvFavoriteList];
        setTvFavoriteList((prev) => [...prev, itemId]);
        try {
          await removeFromList("tvFavoriteList", itemId);
        } catch (err) {
          console.error(`Failed to add to ${listType}:`, err);
          setTvFavoriteList(prev);
          setError(err.message || "Failed to add itemId");
        }
      }
    }

    // if (listType === "watchlist") {
    //   const prev = [...watchlist];
    //   setWatchlist((prev) => prev.filter((i) => i.id !== itemId));
    //   try {
    //     await removeFromList(listType, itemId);
    //   } catch (err) {
    //     console.error(`Failed to remove from ${listType}:`, err);
    //     setWatchlist(prev);
    //     setError(err.message || "Failed to remove item");
    //   }
    // } else if (listType === "favorites") {
    //   const prev = [...favorites];
    //   setFavorites((prev) => prev.filter((i) => i.id !== itemId));
    //   try {
    //     await removeFromList(listType, itemId);
    //   } catch (err) {
    //     console.error(`Failed to remove from ${listType}:`, err);
    //     setFavorites(prev);
    //     setError(err.message || "Failed to remove item");
    //   }
    // }
  };

  const value = {
    movieWishlist,
    tvWishlist,
    movieWatchlist,
    tvWatchlist,
    movieFavoriteList,
    tvFavoriteList,
    isLoading,
    error,
    refreshLists: loadLists,
    addItem,
    removeItem,
  };

  return <ListContext value={value}>{children}</ListContext>;
};
