import { Text, Center } from "@chakra-ui/react";
import { fetchMediaDetails } from "../../utils/js/apiCalls";
import { useState, useEffect } from "react";

import ListCarouselCard from "./ListCarouselCard";

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
  return (
    <>
      <Text py={2}>{title}</Text>
      {mediaData.map((media) => (
        <ListCarouselCard
          key={media.id}
          title={type === "movie" ? media.title : media.name}
          img={media.poster_path}
        />
      ))}
    </>
  );
}
