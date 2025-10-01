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
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieDetails } from "../utils/js/apiCalls";
import MovieTrailer from "../components/MovieTrailer";
import { useColorModeValue } from "@/components/ui/color-mode"; // Chakra v3 workaround

export default function MovieDetails() {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.400");
  const badgeBg = useColorModeValue("gray.50", "gray.800");

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then((data) => {
        const { movieDetails } = data;
        setMovieData(movieDetails);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <Center>Loading...</Center>;
  if (error) return <Center>Error loading data!</Center>;

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
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`,
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
                src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                alt={`Poster image for ${movieData.title}`}
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
                {movieData.title} ({movieData.release_date.slice(0, 4)})
              </Heading>

              <Text color={textColor}>{movieData.overview}</Text>

              {/* Genres */}
              <Stack
                direction="row"
                align="center"
                wrap="wrap"
                justify="center"
              >
                <Text color={textColor}>Genres:</Text>
                {movieData.genres?.map((genre) => (
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
                <Button variant="outline" rounded="full">
                  Button1
                </Button>
                <Button
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  _focus={{ bg: "blue.500" }}
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                >
                  Button2
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Center>

        {/* Movie Trailer Embed */}
        <MovieTrailer />
      </>
    )
  );
}
