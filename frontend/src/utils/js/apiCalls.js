import axios from "axios";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchData = async () => {
  try {
    const popularMovieRes = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_TMDB_API_BASE_URL}movie/popular`,
      headers,
    });

    if (popularMovieRes.status !== 200)
      throw new Error("Failed to fetch popular movies");

    const trendingMovieRes = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_TMDB_API_BASE_URL}trending/movie/day`,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (trendingMovieRes.status !== 200)
      throw new Error("Failed to fetch trending movies");

    const popularShowRes = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_TMDB_API_BASE_URL}tv/popular`,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (popularShowRes.status !== 200)
      throw new Error("Failed to fetch popular shows");

    const trendingShowRes = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_TMDB_API_BASE_URL}trending/tv/day`,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (trendingShowRes.status !== 200)
      throw new Error("Failed to fetch trending shows");

    return {
      popularMovieData: popularMovieRes.data.results,
      trendingMovieData: trendingMovieRes.data.results,
      popularShowData: popularShowRes.data.results,
      trendingShowData: trendingShowRes.data.results,
    };
  } catch (err) {
    console.error("Error fetching data: ", err);
    // Handle errors here or throw them to be handled where the function is called
    throw err;
  }
};

export const fetchMediaDetails = async (
  mediaType,
  mediaId,
  summary = false
) => {
  try {
    // Top level details
    const mediaRes = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_TMDB_API_BASE_URL}${mediaType}/${mediaId}`,
      headers,
    });

    if (mediaRes.status !== 200)
      throw new Error("Failed to fetch media details");

    if (summary) return mediaRes.data;

    // Trailers
    const trailerRes = await axios({
      method: "GET",
      url: `${
        import.meta.env.VITE_TMDB_API_BASE_URL
      }${mediaType}/${mediaId}/videos`,
      headers,
    });

    if (trailerRes.status !== 200)
      throw new Error("Failed to fetch media trailers");

    // Credits
    const creditsRes = await axios({
      method: "GET",
      url: `${
        import.meta.env.VITE_TMDB_API_BASE_URL
      }${mediaType}/${mediaId}/credits`,
      headers,
    });

    if (creditsRes.status !== 200)
      throw new Error("Failed to fetch media credits");

    return {
      mediaDetails: mediaRes.data,
      mediaTrailers: trailerRes.data.results,
      mediaCredits: creditsRes.data,
    };
  } catch (err) {
    console.error(err);
  }
};

export const fetchSearchResults = async (searchStr) => {
  try {
    const searchRes = await axios({
      method: "GET",
      url: `${
        import.meta.env.VITE_TMDB_API_BASE_URL
      }search/multi?query=${searchStr}`,
      headers,
    });

    if (searchRes.status !== 200)
      throw new Error("Failed to fetch search results");

    return searchRes.data.results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getWatched = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_DEV_API_BASE_URL}api/v1/users/me/watched`,
      {
        withCredentials: true,
      }
    );

    if (res.status !== 200) throw new Error("Failed to fetch user details");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchUserData = async () => {
  try {
    const userData = await axios.get(
      `${import.meta.env.VITE_DEV_API_BASE_URL}api/v1/users/me`,
      {
        withCredentials: true,
      }
    );

    if (userData.status !== 200)
      throw new Error("Failed to fetch user details");

    return userData.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchAllLists = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_DEV_API_BASE_URL}api/v1/users/me/all-lists`,
      {
        withCredentials: true,
      }
    );

    if (data.status !== 200) throw new Error("Failed to fetch lists");

    return data.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addToList = async (listName, mediaId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_DEV_API_BASE_URL}api/v1/users/me/watched`,
      {
        listName,
        mediaId,
      },
      { withCredentials: true }
    );

    if (res.status !== 200) throw new Error("Failed to add to list");

    return res.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeFromList = async (listName, mediaId) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_DEV_API_BASE_URL}api/v1/users/me/watched`,
      {
        data: {
          listName,
          mediaId,
        },
        withCredentials: true,
      }
    );

    if (res.status !== 200) throw new Error("Failed to remove from list");

    return res.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
