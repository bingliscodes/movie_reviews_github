"use client";

import { Input, Center, Box, Button, Menu, Portal } from "@chakra-ui/react";
import { useRef } from "react";

import { useState } from "react";
import { fetchSearchResults } from "../utils/js/apiCalls";
import { debounce } from "lodash";

import SearchResultsPreview from "./SearchResultsPreview";
import SearchResultsPreviewCard from "./SearchResultsPreviewCard";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState();

  const debounceOnChange = debounce(async (e) => {
    const searchRes = await fetchSearchResults(e.target.value);
    setSearchResults(searchRes);
  }, 500);

  const ref = useRef();
  const getAnchorRect = () => ref.current.getBoundingClientRect();
  //console.log(searchResults);
  return (
    <>
      <Center flexDirection="column">
        <Input
          placeholder={"Search a movie or show to get started"}
          marginTop={12}
          w="calc(50vw)"
          onChange={debounceOnChange}
          ref={ref}
        />
        <SearchResultsPreview searchResults={searchResults} />
        <Menu.Root positioning={{ getAnchorRect }}>
          <Menu.Trigger asChild>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </Menu.Trigger>
          {/* // TODO: Populate the menu items with the preview cards */}
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="new-txt">
                  <SearchResultsPreviewCard
                    title="demo movie"
                    img={`https://image.tmdb.org/t/p/w500/48KYBYnHmt7ykX57zGuv6SXVZOO.jpg`}
                    year={2024}
                    actors={["Bookie", "Cannoli"]}
                  />
                </Menu.Item>
                <Menu.Item value="new-file">New File...</Menu.Item>
                <Menu.Item value="new-win">New Window</Menu.Item>
                <Menu.Item value="open-file">Open File...</Menu.Item>
                <Menu.Item value="export">Export</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Center>
    </>
  );
}
