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
import { useColorModeValue } from "@/components/ui/color-mode";

import {
  fetchMediaDetails,
  addToList,
  removeFromList,
} from "../utils/js/apiCalls";
import CastCarousel from "../components/CastCarousel";

export default function TvDetails() {
  const [tvData, setTvData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { tvId } = useParams();

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.400");
  const badgeBg = useColorModeValue("gray.50", "gray.800");

  useEffect(() => {
    async function fetchMediaDetailsAsync() {
      setLoading(true);
      try {
        const tvDataRes = await fetchMediaDetails("tv", tvId);
        setTvData(tvDataRes);
      } catch (err) {
        setError(err);
        console.error(err);
      }

      setLoading(false);
    }
    fetchMediaDetailsAsync();
  }, [tvId]);

  if (loading) return <Center>Loading...</Center>;
  if (error) return <Center>Error loading data!</Center>;

  if (!tvData || !tvData.mediaDetails)
    return <Center> No tv data available. </Center>;

  const {
    mediaDetails: tvDetails,
    mediaTrailers: tvTrailers,
    mediaCredits: tvCredits,
  } = tvData;

  let writers;
  let directors;

  if (tvCredits.crew) {
    directors = tvCredits.crew.filter((res) => res.job === "Director");
    writers = tvCredits.crew.filter((res) => res.job === "Writer");
  }

  return (
    tvData && (
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
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvDetails.backdrop_path})`,
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
                src={`https://image.tmdb.org/t/p/w500/${tvDetails.poster_path}`}
                alt={`Poster image for ${tvDetails.name}`}
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
                {tvDetails.name} ({tvDetails.first_air_date.slice(0, 4)})
              </Heading>

              <Text color={textColor}>{tvDetails.overview}</Text>

              {/* Genres */}
              <Stack
                direction="row"
                align="center"
                wrap="wrap"
                justify="center"
              >
                <Text color={textColor}>Genres:</Text>
                {tvDetails.genres?.map((genre) => (
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
                  onClick={() => addToList("tvWishList", tvDetails.id)}
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
                  onClick={() => addToList("tvWatchList", tvDetails.id)}
                >
                  Add to watched
                </Button>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() => addToList("tvFavoriteList", tvDetails.id)}
                >
                  Add to favorites
                </Button>
              </Stack>
              <Stack direction="row" mt={4}>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() => removeFromList("tvWishList", tvDetails.id)}
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
                  onClick={() => removeFromList("tvWatchList", tvDetails.id)}
                >
                  Remove from watched
                </Button>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={() => removeFromList("tvFavoriteList", tvDetails.id)}
                >
                  Remove from favorites
                </Button>
              </Stack>
              {tvDetails.created_by &&
                tvDetails.created_by.map((el) => (
                  <Text key={el.id}>Created By: {el.name}</Text>
                ))}
            </Stack>
          </Stack>
        </Center>

        {/* Cast Carousel*/}
        <CastCarousel credits={tvCredits} />
      </>
    )
  );
}
