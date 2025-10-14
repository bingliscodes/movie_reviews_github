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
  const inputRef = useRef();

  const debounceOnChange = debounce(async (e) => {
    const searchRes = await fetchSearchResults(e.target.value);
    setSearchResults(searchRes.slice(10));
    setMenuIsOpen(searchRes.length === 0 ? false : true);
  }, 500);

  // TODO: Use first_air_date field for media_type = tv
  // TODO: Group menu items by type
  // TODO: Determine if there is a way to get actors without making 10 api calls each time a search is made
  // Currently we have to Get actors by making call to the movie/movie_id/credits endpoint, then take the first 2 and list them

  const getAnchorRect = () => inputRef.current.getBoundingClientRect();

  return (
    <Center flexDirection="column" w="full" mt={12}>
      <Box width={{ base: "90%", md: "50vw" }} textAlign="left">
        <Box position="relative">
          <Input
            placeholder="🎬 Search for a Movie or Show"
            variant="outline"
            size="lg"
            ref={inputRef}
            onChange={debounceOnChange}
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px blue.400",
            }}
            _hover={{ borderColor: "gray.400" }}
          />

          <Menu.Root
            open={menuIsOpen}
            positioning={{ getAnchorRect }}
            onOpenChange={(change) => setMenuIsOpen(change.open)}
            onInteractOutside={() => setMenuIsOpen(false)}
            onEscapeKeyDown={() => setMenuIsOpen(false)}
          >
            <Portal>
              <Menu.Positioner width="50%">
                <Menu.Content bg="bg.menu" boxShadow="xl" borderRadius="md">
                  {searchResults &&
                    searchResults.map((res) => (
                      <Menu.Item
                        key={res.id}
                        value={res.id}
                        onClick={(e) => {
                          if (e.target.closest("button")) {
                            e.preventDefault();
                            return;
                          }
                          navigate(`/movie/${res.id}`);
                          setMenuIsOpen(false);
                        }}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <SearchResultsPreviewCard
                          key={res.id}
                          mediaId={res.id}
                          title={res.title}
                          img={`https://image.tmdb.org/t/p/w500/${res.poster_path}`}
                          mediaType={res.media_type}
                          year={res.release_date?.substring(0, 4)}
                        />
                      </Menu.Item>
                    ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </Box>
    </Center>
  );
}
