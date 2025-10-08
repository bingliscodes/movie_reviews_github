import { useState, useEffect, useContext } from "react";

import { fetchData } from "../utils/js/apiCalls";

import { UserContext } from "../store/userContext";
import SearchBar from "../components/SearchBar";
import ChakraCarousel from "../chakra-ui/ChakraCarousel";

export default function HomePage() {
  const { userData, isLoggedIn } = useContext(UserContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(isLoggedIn);
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
  }, []);

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
  } = data;

  if (popularMovieData) {
    popularMovieCarouselData = popularMovieData.map((el) => ({
      title: el.title,
      rating: el.vote_average,
      releaseDate: el.release_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }

  if (trendingMovieData) {
    trendingMovieCarouselData = trendingMovieData.map((el) => ({
      title: el.title,
      rating: el.vote_average,
      releaseDate: el.release_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }

  if (popularShowData) {
    popularShowCarouselData = popularShowData.map((el) => ({
      title: el.title,
      rating: el.vote_average,
      releaseDate: el.first_air_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }

  if (trendingShowData) {
    trendingShowCarouselData = trendingShowData.map((el) => ({
      title: el.title,
      rating: el.vote_average,
      releaseDate: el.first_air_date,
      img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      id: el.id,
    }));
  }
  return (
    <>
      <SearchBar />
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
