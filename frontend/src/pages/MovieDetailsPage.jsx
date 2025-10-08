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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMediaDetails,
  addToList,
  removeFromList,
} from "../utils/js/apiCalls";
import { useColorModeValue } from "@/components/ui/color-mode";

import MovieTrailer from "../components/MovieTrailer";
import CastCarousel from "../components/CastCarousel";

export default function MovieDetails() {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.400");
  const badgeBg = useColorModeValue("gray.50", "gray.800");

  useEffect(() => {
    async function fetchMediaDetailsAsync() {
      setLoading(true);
      try {
        const movieDataRes = await fetchMediaDetails("movie", movieId);
        setMovieData(movieDataRes);
      } catch (err) {
        setError(err);
        console.error(err);
      }

      setLoading(false);
    }
    fetchMediaDetailsAsync();
  }, [movieId]);

  if (loading) return <Center>Loading...</Center>;
  if (error) return <Center>Error loading data!</Center>;

  if (!movieData || !movieData.mediaDetails)
    return <Center> No movie data available. </Center>;

  const {
    mediaDetails: movieDetails,
    mediaTrailers: movieTrailers,
    mediaCredits: movieCredits,
  } = movieData;

  let writers;
  let directors;

  if (movieCredits.crew) {
    directors = movieCredits.crew.filter((res) => res.job === "Director");
    writers = movieCredits.crew.filter((res) => res.job === "Writer");
  }

  return (
    movieData && (
      <>
        <Center py={6} minHeight="50rem">
          <Stack
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
            maxW="7xl"
            height={{ sm: "auto", md: "40rem" }}
            direction={{ base: "column", md: "row" }}
            bg={bgColor}
            boxShadow="2xl"
            padding={6}
            overflow="hidden"
            _before={{
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.25,
              zIndex: 0,
            }}
          >
            {/* Movie Poster */}
            <Flex zIndex={1} justify="center">
              <Image
                objectFit="cover"
                maxW="300px"
                borderRadius="md"
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={`Poster image for ${movieDetails.title}`}
              />
            </Flex>

            {/* Movie Content */}
            <Stack
              flex={1}
              spacing={4}
              justify="center"
              align="center"
              textAlign="center"
              zIndex={1}
            >
              <Heading fontSize="2xl">
                {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
              </Heading>

              <Text color={textColor}>{movieDetails.overview}</Text>

              {/* Genres */}
              <Stack
                direction="row"
                align="center"
                wrap="wrap"
                justify="center"
              >
                <Text color={textColor}>Genres:</Text>
                {movieDetails.genres?.map((genre) => (
                  <Badge
                    key={genre.id}
                    px={2}
                    py={1}
                    bg={badgeBg}
                    rounded="full"
                    fontWeight="400"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </Stack>

              {/* Buttons */}
              <Stack direction="row" mt={4}>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() => addToList("movieWishList", movieDetails.id)}
                >
                  Add to wishlist
                </Button>
                <Button
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  _focus={{ bg: "blue.500" }}
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() => addToList("movieWatchList", movieDetails.id)}
                >
                  Add to watched
                </Button>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() =>
                    addToList("movieFavoriteList", movieDetails.id)
                  }
                >
                  Add to favorites
                </Button>
              </Stack>
              <Stack direction="row" mt={4}>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() =>
                    removeFromList("movieWishList", movieDetails.id)
                  }
                >
                  Remove from wishlist
                </Button>
                <Button
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  _focus={{ bg: "blue.500" }}
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() =>
                    removeFromList("movieWatchList", movieDetails.id)
                  }
                >
                  Remove from watched
                </Button>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() =>
                    removeFromList("movieFavoriteList", movieDetails.id)
                  }
                >
                  Remove from favorites
                </Button>
              </Stack>
              {directors &&
                directors.map((dir) => (
                  <Text key={dir.id}>Director: {dir.name}</Text>
                ))}
              {writers &&
                writers.map((writer) => (
                  <Text key={writer.id}>Writer: {writer.name}</Text>
                ))}
            </Stack>
          </Stack>
        </Center>

        {/* Cast Carousel*/}
        <CastCarousel credits={movieCredits} />

        {/* Movie Trailer Embed */}
        <MovieTrailer />
      </>
    )
  );
}
