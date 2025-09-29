import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieTrailers } from "../utils/js/apiCalls";

export default function MovieTrailer() {
  const [filteredVideos, setFilteredVideos] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let { movieId } = useParams();

  useEffect(() => {
    setLoading(true);

    fetchMovieTrailers(movieId)
      .then((data) => {
        setFilteredVideos(
          data.filter((el) => el.type === "Trailer" || el.type === "Teaser")
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

  return (
    filteredVideos && (
      <iframe
        width="50%"
        height="620"
        title="YouTube Video Player"
        src={`https://www.youtube.com/embed/${filteredVideos[0].key}`}
        allowFullScreen
      />
    )
  );
}
