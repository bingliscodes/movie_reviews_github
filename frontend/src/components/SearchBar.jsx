import { Input, Center } from "@chakra-ui/react";
import { useState } from "react";
import { fetchSearchResults } from "../utils/js/apiCalls";
import { debounce } from "lodash";
import SearchResultsPreview from "./SearchResultsPreview";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState();

  const debounceOnChange = debounce(async (e) => {
    const searchRes = await fetchSearchResults(e.target.value);
    setSearchResults(searchRes);
    //TODO: finish implementing once we have a search card
  }, 500);

  //console.log(searchResults);
  return (
    <>
      <Center flexDirection="column">
        <Input
          placeholder={"Search a movie or show to get started"}
          marginTop={12}
          w="calc(50vw)"
          onChange={debounceOnChange}
        />
        <SearchResultsPreview searchResults={searchResults} />
      </Center>
    </>
  );
}
