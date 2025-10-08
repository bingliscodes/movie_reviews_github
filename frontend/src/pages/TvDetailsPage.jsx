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
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  fetchMediaDetails,
  addToList,
  removeFromList,
} from "../utils/js/apiCalls";
import { UserContext } from "../store/userContext";
import CastCarousel from "../components/CastCarousel";

export default function TvDetails() {
  const { mediaId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const { userData } = useContext(UserContext);

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.400");
  const badgeBg = useColorModeValue("gray.50", "gray.800");

  useEffect(() => {
    if (userData?.data) {
      setWishList(userData.data.movieWishList || []);
      setWatchList(userData.data.movieWatchList || []);
      setFavoriteList(userData.data.movieFavoriteList || []);
    }
  }, [userData]);

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

              <Text color={textColor}>{mediaDetails.overview}</Text>

              {/* Genres */}
              <Stack
                direction="row"
                align="center"
                wrap="wrap"
                justify="center"
              >
                <Text color={textColor}>Genres:</Text>
                {mediaDetails.genres?.map((genre) => (
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
                  onClick={async () => {
                    console.log();
                    const updatedList = wishList.includes(mediaDetails.id)
                      ? await removeFromList("tvWishList", mediaDetails.id)
                      : await addToList("tvWishList", mediaDetails.id);
                    setWishList(updatedList.data.tvWishList);
                  }}
                >
                  {wishList.includes(mediaDetails.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
                </Button>
                <Button
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  _focus={{ bg: "blue.500" }}
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={async () => {
                    const updatedList = watchList.includes(mediaDetails.id)
                      ? await removeFromList("tvWatchList", mediaDetails.id)
                      : await addToList("tvWatchList", mediaDetails.id);
                    setWatchList(updatedList.data.tvWatchList);
                  }}
                >
                  {watchList.includes(mediaDetails.id)
                    ? "Remove from watched"
                    : "Add to watched"}
                </Button>
                <Button
                  variant="solid"
                  rounded="full"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  onClick={async () => {
                    const updatedList = favoriteList.includes(mediaDetails.id)
                      ? await removeFromList("tvFavoriteList", mediaDetails.id)
                      : await addToList("tvFavoriteList", mediaDetails.id);
                    setFavoriteList(updatedList.data.tvFavoriteList);
                  }}
                >
                  {favoriteList.includes(mediaDetails.id)
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </Button>
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
