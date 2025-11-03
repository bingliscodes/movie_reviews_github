import { useState, useEffect, useContext } from "react";

import { fetchData, fetchMediaDetails } from "../utils/js/apiCalls";

import { UserContext } from "../store/UserContext";
import SearchBar from "../components/SearchBar";
import ChakraCarousel from "../chakra-ui/ChakraCarousel";
import MovieRecommender from "../components/MovieReccomendations/MovieRecommender";
import MovieDetailsModal from "../components/MovieReccomendations/MovieDetailsModal";

export default function HomePage() {
  const { userData, isLoggedIn } = useContext(UserContext);

  const [data, setData] = useState(null);
  const [tvWishlistData, setTvWishlistData] = useState([]);
  const [movieWishlistData, setMovieWishlistData] = useState([]);
  const [movieRecsData, setMovieRecsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [userData]);

  useEffect(() => {
    async function fetchMediaDetailsAsync() {
      try {
        setLoading(true);
        const { movieWishList = [], tvWishList = [] } = userData?.data || {};

        if (Array.isArray(movieWishList) && movieWishList.length > 0) {
          const movieDataRes = await Promise.all(
            movieWishList.map(
              async (mediaId) => await fetchMediaDetails("movie", mediaId, true)
            )
          );
          const movieWishlistCarouselData = movieDataRes.map((el) => ({
            title: el.title,
            rating: el.vote_average,
            releaseDate: el.release_date,
            img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
            id: el.id,
          }));
          setMovieWishlistData(movieWishlistCarouselData);
        }

        if (Array.isArray(tvWishList) && tvWishList.length > 0) {
          const tvDataRes = await Promise.all(
            tvWishList.map(
              async (mediaId) => await fetchMediaDetails("tv", mediaId, true)
            )
          );
          const tvWishlistCarouselData = tvDataRes.map((el) => ({
            title: el.title,
            rating: el.vote_average,
            releaseDate: el.first_air_date,
            img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
            id: el.id,
          }));
          setTvWishlistData(tvWishlistCarouselData);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    }

    if (
      userData &&
      ((Array.isArray(userData?.data?.movieWishList) &&
        userData.data.movieWishList.length > 0) ||
        (Array.isArray(userData?.data?.tvWishList) &&
          userData.data.tvWishList.length > 0))
    ) {
      fetchMediaDetailsAsync();
    }
  }, [userData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  let popularMovieCarouselData;
  let trendingMovieCarouselData;
  let popularShowCarouselData;
  let trendingShowCarouselData;

  const {
    popularMovieData,
    trendingMovieData,
    popularShowData,
    trendingShowData,
  } = data || {};

  // if the user is logged in, we populate the watchlist with the data

  if (popularMovieData) {
    popularMovieCarouselData = popularMovieData.map((el) => ({
      title: el.title,
      rating: el.vote_average,
      voteCount: el.vote_count,
      releaseDate: el.release_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }

  if (trendingMovieData) {
    trendingMovieCarouselData = trendingMovieData.map((el) => ({
      title: el.title,
      rating: el.vote_average,
      voteCount: el.vote_count,
      releaseDate: el.release_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }

  if (popularShowData) {
    popularShowCarouselData = popularShowData.map((el) => ({
      title: el.name,
      rating: el.vote_average,
      voteCount: el.vote_count,
      releaseDate: el.first_air_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }

  if (trendingShowData) {
    trendingShowCarouselData = trendingShowData.map((el) => ({
      title: el.name,
      rating: el.vote_average,
      voteCount: el.vote_count,
      releaseDate: el.first_air_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }

  return (
    <>
      <MovieDetailsModal />
      <SearchBar />
      <MovieRecommender setMovieRecsData={setMovieRecsData} />

      {movieRecsData?.length > 0 && (
        <ChakraCarousel
          carouselData={movieRecsData}
          title="Personalized Movie Recommendations"
          type="movie"
          isRec={true}
        />
      )}

      {movieWishlistData?.length > 0 && (
        <ChakraCarousel
          carouselData={movieWishlistData}
          title="Your Movie Wishlist"
          type="movie"
        />
      )}
      <ChakraCarousel
        carouselData={popularMovieCarouselData}
        title="Popular Movies"
        type="movie"
      />
      <ChakraCarousel
        carouselData={trendingMovieCarouselData}
        title="Trending Movies"
        type="movie"
      />
      {tvWishlistData?.length > 0 && (
        <ChakraCarousel
          carouselData={tvWishlistData}
          title="Your TV Wishlist"
          type="tv"
        />
      )}
      <ChakraCarousel
        carouselData={popularShowCarouselData}
        title="Popular Shows"
        type="tv"
      />
      <ChakraCarousel
        carouselData={trendingShowCarouselData}
        title="Trending Shows"
        type="tv"
      />
    </>
  );
}
