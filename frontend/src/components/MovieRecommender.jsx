import { Button, Portal, CloseButton, Dialog } from "@chakra-ui/react";
import { useState } from "react";

import {
  getTopNGenres,
  updateGenreScores,
  genresMap,
  getTimePeriod,
  introduceRandomness,
  introduceRandomSort,
} from "../utils/js/movieRecommender";
import { recommendMoviesByGenre } from "../utils/js/apiCalls";
import MultipleChoiceQuestions from "./MultipleChoiceQuestions";

export default function MovieRecommender({ setMovieRecsData }) {
  // This stores the checked items in an array called "value"
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswer] = useState([0, 0, 0, 0, 0]);

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

  const handleSubmit = async () => {
    const genreScores = updateGenreScores(answers);
    const updatedGenres = introduceRandomness(genreScores);
    const top3Genres = getTopNGenres(updatedGenres);
    const mappedGenres = top3Genres.map((genre) => genresMap[genre]);
    const { minYear, maxYear } = getTimePeriod(answers);
    const randomSort = introduceRandomSort();

    try {
      const data = await recommendMoviesByGenre(
        mappedGenres,
        minYear,
        maxYear,
        randomSort
      );
      console.log("query data:", data);
      // Filter to top 10

      const filteredRes = data.results.slice(0, 10);
      const movieRecs = filteredRes.map((el) => ({
        title: el.title,
        rating: el.vote_average,
        voteCount: el.vote_count,
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

  const handleClearAnswers = () => {
    setAnswer([0, 0, 0, 0, 0]);
    setQuestionIdx(0);
  };

  return (
    <>
      <Dialog.Root onExitComplete={handleClearAnswers}>
        <Dialog.Trigger margin={4} asChild>
          <Button bg="bg.menuItem" color="text.primaryBtn">
            Get movie recommendations
          </Button>
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
              <Dialog.CloseTrigger asChild color="black">
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
