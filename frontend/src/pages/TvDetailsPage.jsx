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
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchMediaDetails } from "../utils/js/apiCalls";
import { UserContext } from "../store/userContext";
import CastCarousel from "../components/CastCarousel";
import { ModifyListButton } from "../components/ModifyListButtons";

export default function TvDetails() {
  const { mediaId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { userData } = useContext(UserContext);
  const watchList = userData?.data?.tvWatchList || [];

  useEffect(() => {
    async function fetchMediaDetailsAsync() {
      setLoading(true);
      try {
        const tvDataRes = await fetchMediaDetails("tv", mediaId);
        setData(tvDataRes);
      } catch (err) {
        setError(err);
        console.error(err);
      }

      setLoading(false);
    }
    fetchMediaDetailsAsync();
  }, [mediaId]);

  if (loading) return <Center>Loading...</Center>;
  if (error) return <Center>Error loading data!</Center>;

  if (!data || !data.mediaDetails)
    return <Center> No tv data available. </Center>;

  const { mediaDetails, mediaTrailers, mediaCredits } = data;

  let writers;
  let directors;

  if (mediaCredits.crew) {
    directors = mediaCredits.crew.filter((res) => res.job === "Director");
    writers = mediaCredits.crew.filter((res) => res.job === "Writer");
  }

  return (
    data && (
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
            bg="bg.stack"
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
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${mediaDetails.backdrop_path})`,
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
                src={`https://image.tmdb.org/t/p/w500/${mediaDetails.poster_path}`}
                alt={`Poster image for ${mediaDetails.name}`}
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
                {mediaDetails.name} ({mediaDetails.first_air_date.slice(0, 4)})
              </Heading>

              <Text color={"text"}>{mediaDetails.overview}</Text>

              {/* Genres */}
              <Stack
                direction="row"
                align="center"
                wrap="wrap"
                justify="center"
              >
                <Text color={"text"}>Genres:</Text>
                {mediaDetails.genres?.map((genre) => (
                  <Badge
                    key={genre.id}
                    px={2}
                    py={1}
                    bg="bg.badge"
                    rounded="full"
                    fontWeight="400"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </Stack>

              {/* Buttons */}
              <Stack direction="row" mt={4}>
                <ModifyListButton
                  mediaType="tv"
                  type="wish"
                  mediaId={mediaDetails.id}
                />
                <ModifyListButton
                  mediaType="tv"
                  type="watch"
                  mediaId={mediaDetails.id}
                />

                {watchList.includes(mediaDetails.id) && (
                  <ModifyListButton
                    mediaType="tv"
                    type="favorite"
                    mediaId={mediaDetails.id}
                  />
                )}
              </Stack>

              {mediaDetails.created_by &&
                mediaDetails.created_by.map((el) => (
                  <Text key={el.id}>Created By: {el.name}</Text>
                ))}
            </Stack>
          </Stack>
        </Center>

        {/* Cast Carousel*/}
        <CastCarousel credits={mediaCredits} />
      </>
    )
  );
}
