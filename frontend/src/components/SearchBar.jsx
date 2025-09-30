"use client";

import { Input, Center, Box, Button, Menu, Portal } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../utils/js/apiCalls";
import { debounce } from "lodash";

import SearchResultsPreviewCard from "./SearchResultsPreviewCard";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  console.log(searchResults);
  const debounceOnChange = debounce(async (e) => {
    const searchRes = await fetchSearchResults(e.target.value);
    setSearchResults(searchRes.slice(10));
    setMenuIsOpen(searchRes.length === 0 ? false : true);
  }, 500);

  // TODO: Get the search previews to close when the user clicks outside of the Input or menu component
  // TODO: Use first_air_date field for media_type = tv
  // TODO: Group menu items by type
  // TODO: Determine if there is a way to get actors without making 10 api calls each time a search is made
  // Currently we have to Get actors by making call to the movie/movie_id/credits endpoint, then take the first 2 and list them
  const ref = useRef();
  const getAnchorRect = () => ref.current.getBoundingClientRect();
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
        <Menu.Root open={menuIsOpen} positioning={{ getAnchorRect }}>
          <Portal>
            <Menu.Positioner width="50%">
              <Menu.Content>
                {searchResults &&
                  searchResults.map((res) => (
                    <Menu.Item
                      key={res.id}
                      value={res.id}
                      onClick={() => navigate(`/movie/${res.id}`)}
                    >
                      <SearchResultsPreviewCard
                        key={res.id}
                        title={res.title}
                        img={`https://image.tmdb.org/t/p/w500/${res.poster_path}`}
                        year={res.release_date?.substring(0, 4)}
                        actors={["Bookie", "Cannoli"]}
                      />
                    </Menu.Item>
                  ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Center>
    </>
  );
}
