import { Button, Portal, useCheckboxGroup, Menu } from "@chakra-ui/react";

export default function MovieRecommender() {
  // This stores the checked items in an array called "value"
  const group = useCheckboxGroup();
  // Now we need to pass in the moods and translate them to a list of movies
  // Will map each mood to a genre, then make a query to get popular movies that fit the genres
  return (
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
  );
}

const moods = [
  { title: "Excited", value: "excited" },
  { title: "Sad", value: "sad" },
  { title: "Goofy", value: "goofy" },
  { title: "Happy", value: "happy" },
  { title: "Scared", value: "scared" },
  { title: "Angry", value: "angry" },
];
