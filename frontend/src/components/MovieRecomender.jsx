import { useEffect, useState } from "react";
import {
  Center,
  Button,
  Portal,
  useCheckboxGroup,
  Menu,
} from "@chakra-ui/react";
import { getGenresFromMoods } from "../utils/js/movieRecommender";
import { recommendMoviesByGenre } from "../utils/js/apiCalls";

export default function MovieRecommender() {
  const [recommendations, setRecommendations] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  // This stores the checked items in an array called "value"
  const group = useCheckboxGroup();
  // Now we need to pass in the moods and translate them to a list of movies
  // Will map each mood to a genre, then make a query to get popular movies that fit the genres

  // 1. Map mood to genres

  const handleClick = async () => {
    const genres = getGenresFromMoods(group.value);
    console.log(genres);
    try {
      const res = await recommendMoviesByGenre(genres);
      setRecommendations(res);
      console.log(res);
    } catch (err) {
      setError(err);
      console.error(err);
    }

    setLoading(false);
  };
  // useEffect(() => {
  //   async function fetchRecommendationsAsync() {
  //     setLoading(true);
  //     try {
  //       const movieDataRes = await recommendMoviesByGenre(group.value);
  //       setRecommendations(movieDataRes);
  //       console.log(recommendations);
  //     } catch (err) {
  //       setError(err);
  //       console.error(err);
  //     }

  //     setLoading(false);
  //   }
  //   fetchRecommendationsAsync();
  // }, [group.value]);

  // 2. Make API call to get recommendations with those genres

  return (
    <>
      <Button onClick={handleClick}>Go!</Button>
      <Menu.Root closeOnSelect={false}>
        <Menu.Trigger asChild>
          <Button mt={4} bg="bg.primaryBtn" variant="outline" size="sm">
            Recommend a movie!
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>
                  What is your current mood?
                </Menu.ItemGroupLabel>
                {moods.map(({ title, value }) => (
                  <Menu.CheckboxItem
                    key={value}
                    value={value}
                    checked={group.isChecked(value)}
                    onCheckedChange={() => group.toggleValue(value)}
                  >
                    {title}
                    <Menu.ItemIndicator />
                  </Menu.CheckboxItem>
                ))}
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}

const moods = [
  { title: "Excited", value: "excited" },
  { title: "Sad", value: "sad" },
  { title: "Goofy", value: "goofy" },
  { title: "Happy", value: "happy" },
  { title: "Scared", value: "scared" },
  { title: "Angry", value: "angry" },
  { title: "Cheesy", value: "cheesy" },
  { title: "Creative", value: "creative" },
  { title: "Artsy", value: "artsy" },
];
