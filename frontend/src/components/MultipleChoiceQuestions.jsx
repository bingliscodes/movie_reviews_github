import { Select, createListCollection } from "@chakra-ui/react";

import { movieRecommendationData } from "../utils/js/movieRecommender";

const questionsData = movieRecommendationData;

export default function MultipleChoiceQuestions({
  questionNumber,
  handleSetAnswer,
}) {
  const answerData = createListCollection({
    items: questionsData[questionNumber].answers,
  });

  const questionText = questionsData[questionNumber].question;

  return (
    <Select.Root
      collection={answerData}
      size="sm"
      positioning={{ sameWidth: true, placement: "bottom" }}
      onSelect={(selection) =>
        handleSetAnswer((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[questionNumber] = selection.value;
          return updatedAnswers;
        })
      }
      key={questionNumber}
    >
      <Select.HiddenSelect />
      <Select.Label>{questionText}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select an option" color="black" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content width="full">
          {answerData.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
