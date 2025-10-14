import SearchResultsPreviewCard from "./SearchResultsPreviewCard";
import { Center, Container } from "@chakra-ui/react";

export default function SearchResultsPreview({ searchResults }) {
  // Filter results to movies for now, then we can addd functionality for people and tv
  if (!searchResults) return;

  // const filteredResults = searchResults.filter(
  //   (res) => res.media_type === "movie"
  // );
  const filteredResults = searchResults;

  return (
    filteredResults &&
    filteredResults.map((res) => (
      <SearchResultsPreviewCard
        key={res.id}
        mediaId={res.id}
        title={res.title}
        img={res.poster_path}
        year={res.release_date.substring(0, 4)}
      />
    ))
  );
}
