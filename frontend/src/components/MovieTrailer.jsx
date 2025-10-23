import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMediaDetails } from "../utils/js/apiCalls";
import { useBreakpointValue } from "@chakra-ui/react";

export default function MovieTrailer() {
  const [filteredVideos, setFilteredVideos] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const iframeHeight = useBreakpointValue({
    base: "200px", // phones
    sm: "300px", // small tablets
    md: "400px", // tablets
    lg: "500px", // desktops
    xl: "545px", // large screens
  });

  let { mediaId } = useParams();

  useEffect(() => {
    setLoading(true);

    fetchMediaDetails("movie", mediaId)
      .then((data) => {
        const { mediaTrailers: movieTrailers } = data;
        setFilteredVideos(
          movieTrailers.filter(
            (el) => el.type === "Trailer" || el.type === "Teaser"
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [mediaId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  if (!filteredVideos) return <p>No Trailer Found</p>;

  // TODO: Handle events where there are no trailers or the embed link is invalid
  return (
    filteredVideos && (
      <iframe
        width="50%"
        height={iframeHeight}
        title="YouTube Video Player"
        src={`https://www.youtube.com/embed/${filteredVideos[0]?.key}`}
        allowFullScreen
      />
    )
  );
}
