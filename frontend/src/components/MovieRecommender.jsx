import {
  Button,
  Portal,
  useCheckboxGroup,
  CloseButton,
  Dialog,
} from "@chakra-ui/react";
import { useState } from "react";

import { getGenresFromMoods } from "../utils/js/movieRecommender";
import { recommendMoviesByGenre } from "../utils/js/apiCalls";
import MultipleChoiceQuestions from "./MultipleChoiceQuestions";

export default function MovieRecommender({ setMovieRecsData }) {
  // This stores the checked items in an array called "value"
  const group = useCheckboxGroup();
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswer] = useState([0, 0, 0, 0, 0]);

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

  const handleIncrementQuestion = () => {
    setQuestionIdx((prevIdx) => {
      if (prevIdx === 4) return prevIdx;
      return prevIdx + 1;
    });
  };
  const handleDecrementQuestion = () => {
    setQuestionIdx((prevIdx) => {
      if (prevIdx === 0) return prevIdx;

      return prevIdx - 1;
    });
  };

  const handleSubmit = () => {
    console.log("submitting data!");
  };

  const handleClearAnswers = () => {
    setAnswer([0, 0, 0, 0, 0]);
    setQuestionIdx(0);
  };
  console.log("answers are...", answers);

  return (
    <>
      <Dialog.Root onExitComplete={handleClearAnswers}>
        <Dialog.Trigger margin={4}>
          <Button variant="solid">Get movie recommendations</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  Please answer the following questions:
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <MultipleChoiceQuestions
                  questionNumber={questionIdx}
                  handleSetAnswer={setAnswer}
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Button onClick={handleDecrementQuestion}>Previous</Button>

                {questionIdx === 4 ? (
                  <Button onClick={handleSubmit}>Go!</Button>
                ) : (
                  <Button onClick={handleIncrementQuestion}>Next</Button>
                )}
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
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
