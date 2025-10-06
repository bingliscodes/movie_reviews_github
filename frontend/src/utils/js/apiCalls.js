import axios from "axios";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchData = async () => {
  try {
    const popularMovieRes = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      headers,
    });

    if (popularMovieRes.status !== 200)
      throw new Error("Failed to fetch popular movies");

    const trendingMovieRes = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/movie/day",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (trendingMovieRes.status !== 200)
      throw new Error("Failed to fetch trending movies");

    const popularShowRes = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/popular",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (popularShowRes.status !== 200)
      throw new Error("Failed to fetch popular shows");

    const trendingShowRes = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/tv/day",
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

export const fetchMediaDetails = async (mediaType, mediaId) => {
  try {
    // Top level details
    const mediaRes = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${mediaId}`,
      headers,
    });

    if (mediaRes.status !== 200)
      throw new Error("Failed to fetch media details");

    // Trailers
    const trailerRes = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos`,
      headers,
    });

    if (trailerRes.status !== 200)
      throw new Error("Failed to fetch media trailers");

    // Credits
    const creditsRes = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits`,
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

// Search movies will be {baseUrl/search/movie} and shows {baseUrl/search/tv}
// Search all 3 is {baseUrl/search/multi}
export const fetchSearchResults = async (searchStr) => {
  try {
    const searchRes = await axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/multi?query=${searchStr}`,
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

export const signUp = async (formData) => {
  const { name, email, password, passwordConfirm } = formData;
  try {
    const newUserRes = await axios({
      method: "POST",
      url: `http://127.0.0.1:3000/api/v1/users/signup`,
      headers: { "Content-Type": "application/json" },
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    console.log(newUserRes);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
