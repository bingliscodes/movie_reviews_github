"use client";
import {
  Container,
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// TODO: Make sure cover image is correct
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { fetchMovieDetails } from "../utils/js/apiCalls";
import MovieTrailer from "../components/MovieTrailer";

export default function MovieDetails() {
  // Used this video to achieve the background opacity effect: https://www.youtube.com/watch?v=LQsjNmkqUOc

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.400");
  const badgeBg = useColorModeValue("gray.50", "gray.800");

  let { movieId } = useParams();

  useEffect(() => {
    setLoading(true);

    fetchMovieDetails(movieId)
      .then((data) => {
        setMovieData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    // TODO: Figure out how to organize the elements within the container so they look how they look better and are easier to work with, or figure out alternative
    movieData && (
      <>
        <Center py={6} height="50rem">
          <Stack
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            w={{ sm: "100%", md: "100%" }}
            height={{ sm: "15rem", md: "40rem" }}
            direction={{ base: "column", md: "row" }}
            bg={bgColor}
            boxShadow={"2xl"}
            padding={4}
            _before={{
              content: "''",
              position: "absolute",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
              bgAttachment: "fixed",
              bgImage: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`,
              opacity: "30%",
            }}
          >
            <Flex>
              <Image
                objectFit="cover"
                boxSize="auto"
                src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                alt={`Cover image for ${movieData.title}`}
                position="relative"
              />
            </Flex>
            <Stack
              flex={1}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={1}
              pt={2}
              maxW="50rem"
            >
              <Heading fontSize={"2xl"} fontFamily={"body"} position="relative">
                {movieData.title} ({movieData.release_date.substring(0, 4)})
              </Heading>
              <Text
                textAlign={"center"}
                position="relative"
                color={textColor}
                px={3}
              >
                {movieData.overview}
              </Text>
              <Stack
                align={"center"}
                justify={"center"}
                direction={"row"}
                mt={6}
                position="relative"
              >
                {/* //TODO: Replace these Badges with the genres by looking up the id */}
                <Text textAlign={"center"} color={textColor} px={3}>
                  Genres:
                </Text>
                {movieData.genres?.map((genre) => (
                  <Badge
                    key={genre.id}
                    position="relative"
                    px={2}
                    py={1}
                    bg={badgeBg}
                    fontWeight={"400"}
                  >
                    {genre.id}
                  </Badge>
                ))}
              </Stack>

              <Stack
                width={"100%"}
                mt={"2rem"}
                direction={"row"}
                padding={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  Button1
                </Button>
                <Button
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                >
                  Button2
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Center>
        <MovieTrailer />
      </>
    )
  );
}
