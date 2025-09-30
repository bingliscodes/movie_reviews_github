import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../utils/js/apiCalls";

export default function MovieTrailer() {
  const [filteredVideos, setFilteredVideos] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let { movieId } = useParams();

  useEffect(() => {
    setLoading(true);

    fetchMovieDetails(movieId)
      .then((data) => {
        const { movieTrailers } = data;
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
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  if (!filteredVideos) return <p>No Trailer Found</p>;

  // TODO: Handle events where there are no trailers or the embed link is invalid
  return (
    filteredVideos && (
      <iframe
        width="50%"
        height="545"
        title="YouTube Video Player"
        src={`https://www.youtube.com/embed/${filteredVideos[0]?.key}`}
        allowFullScreen
      />
    )
  );
}
