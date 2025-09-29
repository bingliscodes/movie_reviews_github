import SearchResultsPreviewCard from "./SearchResultsPreviewCard";

export default function SearchResultsPreview({ searchResults }) {
  // TODO: For each element in search results, generate a preview card
  // Filter results to movies for now, then we can addd functionality for people and tv

  if (!searchResults) return;

  const filteredResults = searchResults.filter(
    (res) => res.media_type === "movie"
  );

  return (
    filteredResults &&
    filteredResults.map((res) => (
      <SearchResultsPreviewCard
        key={res.id}
        title={res.title}
        img={`https://image.tmdb.org/t/p/w500/${res.poster_path}`}
        year={res.release_date.substring(0, 4)}
        //TODO: Figure out how to get the actors
        actors={["Bookie", "Cannoli"]}
      />
    ))
  );
}
// This component will render the list of preview cards by iterating through the search results
