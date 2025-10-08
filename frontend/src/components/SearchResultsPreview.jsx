import SearchResultsPreviewCard from "./SearchResultsPreviewCard";
import { movies } from "../demo_data/movies";

export default function SearchResultsPreview({ searchResults }) {
  // Filter results to movies for now, then we can addd functionality for people and tv

  if (!searchResults) return;

  // const filteredResults = searchResults.filter(
  //   (res) => res.media_type === "movie"
  // );
  const filteredResults = movies;

  return (
    filteredResults &&
    filteredResults.map((res) => (
      <SearchResultsPreviewCard
        key={res.id}
        title={res.title}
        img={res.poster_path}
        year={res.release_date.substring(0, 4)}
        //TODO: Figure out how to get the actors
        actors={["Bookie", "Cannoli"]}
      />
    ))
  );
}
