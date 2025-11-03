import { Text, Center } from "@chakra-ui/react";
import { fetchMediaDetails } from "../../utils/js/apiCalls";
import { useState, useEffect } from "react";

import ListCarouselCard from "./ListCarouselCard";
import ChakraCarousel from "../../chakra-ui/ChakraCarousel";

export default function ListCarousel({ title, type, mediaList }) {
  const [mediaData, setMediaData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMediaDetailsAsync() {
      setLoading(true);
      try {
        const mediaDataRes = await Promise.all(
          mediaList.map(
            async (mediaId) => await fetchMediaDetails(type, mediaId, true)
          )
        );
        setMediaData(mediaDataRes);
      } catch (err) {
        setError(err);
        console.error(err);
      }

      setLoading(false);
    }
    fetchMediaDetailsAsync();
  }, [type, mediaList]);

  if (loading) return <Center>Loading...</Center>;
  if (error) return <Center>Error loading data!</Center>;

  if (!mediaData) return <Center> No {type} data available. </Center>;

  const carouselData = mediaData.map((el) => ({
    title: type === "movie" ? el.title : el.name,
    rating: el.vote_average,
    voteCount: el.vote_count,
    releaseDate: type === "movie" ? el.release_date : el.first_air_date,
    img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
    id: el.id,
  }));

  return (
    <ChakraCarousel title={title} type={type} carouselData={carouselData} />
  );
}
