import { Button, Portal, useCheckboxGroup, Menu } from "@chakra-ui/react";
import { getGenresFromMoods } from "../utils/js/movieRecommender";
import { recommendMoviesByGenre } from "../utils/js/apiCalls";

export default function MovieRecommender({ setMovieRecsData }) {
  // This stores the checked items in an array called "value"
  const group = useCheckboxGroup();

  // 1. Map mood to genres
  const handleClick = async () => {
    if (group.value.length === 0) {
      setMovieRecsData([]);
      return;
    }

    const genresFromMoods = getGenresFromMoods(group.value);

    try {
      const res = await recommendMoviesByGenre(genresFromMoods);

      // Filter to top 10
      const filteredRes = res.slice(0, 10);
      const movieRecs = filteredRes.map((el) => ({
        title: el.title,
        rating: el.vote_average,
        releaseDate: el.release_date,
        img: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
        id: el.id,
      }));
      setMovieRecsData(movieRecs);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleHideResults = () => {
    setMovieRecsData([]);
    return;
  };

  return (
    <>
      <Menu.Root closeOnSelect={false}>
        <Menu.Trigger asChild>
          <Button mt={4} bg="bg.primaryBtn" variant="outline" size="sm">
            What is your current mood?
          </Button>
        </Menu.Trigger>
        <Button
          mt={4}
          ml={4}
          bg="bg.primaryBtn"
          variant="outline"
          size="sm"
          onClick={handleClick}
        >
          Go
        </Button>
        <Button
          mt={4}
          ml={4}
          bg="bg.stack"
          variant="outline"
          size="sm"
          onClick={handleHideResults}
        >
          Hide Results
        </Button>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Select one or more:</Menu.ItemGroupLabel>
                {moods.map(({ title, value }) => (
                  <Menu.CheckboxItem
                    key={value}
                    value={value}
                    checked={group.isChecked(value)}
                    onCheckedChange={() => {
                      group.toggleValue(value);
                    }}
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
