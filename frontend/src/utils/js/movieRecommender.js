// Mapping of genres to TMDB genre ids that are needed for making the API call
export const genresMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export const movieRecommendationData = [
  {
    question:
      "If you could be dropped into any movie world, which would you pick?",
    answers: [
      { label: "A high-stakes action adventure", value: "a" },
      { label: "A fantasy or sci-fi universe", value: "b" },
      { label: "A dramatic love story", value: "c" },
      { label: "A musical or feel-good story", value: "d" },
      { label: "A documentary or historical world", value: "e" },
    ],
  },
  {
    question:
      "When you rewatch your favorite movies, what do they usually have in common?",
    answers: [
      { label: "Big action scenes", value: "a" },
      { label: "Strong emotional stories", value: "b" },
      { label: "Great humor and fun characters", value: "c" },
      { label: "Unique ideas or creative visuals", value: "d" },
      { label: "Suspense and mystery", value: "e" },
    ],
  },
  {
    question: "Pick a movie night snack:",
    answers: [
      { label: "Popcorn and soda", value: "a" },
      { label: "Chocolate and wine", value: "b" },
      { label: "Pizza and soda", value: "c" },
      { label: "Coffee or tea", value: "d" },
      { label: "Hot wings", value: "e" },
    ],
  },
  {
    question:
      "You've had a long day – what kind of movie sounds best right now?",
    answers: [
      { label: "Something fast-paced and thrilling", value: "a" },
      { label: "Something emotional or romantic", value: "b" },
      { label: "Something spooky or intense", value: "c" },
      { label: "Something artistic or thought-provoking", value: "d" },
      { label: "Something funny or lighthearted", value: "e" },
    ],
  },
  {
    question: "What time period do you enjoy?",
    answers: [
      { label: "Fresh out of the theatres! (within last 2 years)", value: "a" },
      { label: "Something current (2010 - current year)", value: "b" },
      { label: "Late 90's / early 2000's vibes", value: "c" },
      { label: "Old-ish ('1970 - 1990')", value: "d" },
      { label: "Pre-disco (< 1970)", value: "e" },
    ],
  },
];

export const updateGenreScores = (answers) => {
  /* Takes in an array of answers, then applies the genre scores based on each */
  const genreScores = {
    Action: 0,
    Adventure: 0,
    Animation: 0,
    Comedy: 0,
    Crime: 0,
    Documentary: 0,
    Drama: 0,
    Family: 0,
    Fantasy: 0,
    History: 0,
    Horror: 0,
    Music: 0,
    Mystery: 0,
    Romance: 0,
    "Science Fiction": 0,
    "TV Movie": 0,
    Thriller: 0,
    War: 0,
    Western: 0,
  };

  answers.forEach((ans, idx) => {
    if (idx === 0) {
      if (ans === "a") {
        genreScores.Action += 3;
        genreScores.Thriller += 1;
        genreScores.Crime += 1;
        genreScores.Adventure += 2;
      }
      if (ans === "b") {
        genreScores.Fantasy += 2;
        genreScores["Science Fiction"] += 2;
        genreScores.Adventure += 1;
      }
      if (ans === "c") {
        genreScores.Drama += 3;
        genreScores.Romance += 3;
      }
      if (ans === "d") {
        genreScores.Music += 2;
        genreScores.Comedy += 2;
        genreScores["TV Movie"] += 2;
        genreScores.Family += 1;
      }
      if (ans === "e") {
        genreScores.History += 3;
        genreScores.Documentary += 2;
        genreScores.Western += 1;
      }
    }
    if (idx === 1) {
      if (ans === "a") {
        genreScores.Action += 2;
        genreScores.Thriller += 1;
        genreScores.Crime += 1;
        genreScores.War += 1;
        genreScores.Adventure += 1;
      }
      if (ans === "b") {
        genreScores.Drama += 3;
        genreScores.Romance += 2;
      }
      if (ans === "c") {
        genreScores.Comedy += 3;
        genreScores.Family += 1;
        genreScores.Animation += 2;
      }
      if (ans === "d") {
        genreScores.Music += 2;
        genreScores.Comedy += 2;
        genreScores.Fantasy += 1;
        genreScores["Science Fiction"] += 1;
      }
      if (ans === "e") {
        genreScores.Crime += 2;
        genreScores.Mystery += 2;
        genreScores.Thriller += 3;
        genreScores.Horror += 2;
      }
    }

    if (idx === 2) {
      if (ans === "a") {
        genreScores.Action += 1;
        genreScores.War += 1;
        genreScores.Western += 1;
        genreScores.Adventure += 2;
        genreScores.Drama += 1;
        genreScores.Fantasy += 1;
      }
      if (ans === "b") {
        genreScores.Drama += 2;
        genreScores.Romance += 2;
        genreScores.Music += 1;
      }
      if (ans === "c") {
        genreScores.Comedy += 2;
        genreScores.Action += 2;
        genreScores.Family += 1;
        genreScores.Adventure += 1;
      }
      if (ans === "d") {
        genreScores.Documentary += 2;
        genreScores.Animation += 1;
        genreScores.History += 1;
        genreScores.Music += 1;
      }
      if (ans === "e") {
        genreScores.Crime += 2;
        genreScores.Mystery += 2;
        genreScores.Thriller += 2;
        genreScores.Horror += 2;
      }
    }

    if (idx === 3) {
      if (ans === "a") {
        genreScores.Action += 2;
        genreScores.Thriller += 2;
        genreScores.Crime += 2;
        genreScores.Adventure += 2;
        genreScores.War += 1;
      }
      if (ans === "b") {
        genreScores.Romance += 3;
        genreScores.Drama += 3;
      }
      if (ans === "c") {
        genreScores.Thriller += 2;
        genreScores.Mystery += 2;
        genreScores.Horror += 3;
      }
      if (ans === "d") {
        genreScores.Music += 2;
        genreScores["Science Fiction"] += 2;
        genreScores.Documentary += 1;
        genreScores.History += 1;
        genreScores.Animation += 1;
      }
      if (ans === "e") {
        genreScores.Comedy += 2;
        genreScores["TV Movie"] += 2;
        genreScores.Animation += 1;
        genreScores.Family += 1;
      }
    }
  });

  return genreScores;
};

export const getTimePeriod = (answers) => {
  let minYear = "1800";
  let maxYear = "3000";
  const ans = answers[4];

  if (ans === "a") minYear = new Date().getFullYear().toString();
  if (ans === "b") {
    minYear = "2010";
  }
  if (ans === "c") {
    minYear = "1990";
    maxYear = "2010";
  }
  if (ans === "d") {
    minYear = "1970";
    maxYear = "1990";
  }
  if (ans === "e") maxYear = "1970";

  return { minYear, maxYear };
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const introduceRandomness = (genreScores) => {
  /* Takes in an object of genre scores, then randomly adds 0-2 points to each genre */
  const updatedScores = { ...genreScores };

  Object.keys(updatedScores).forEach((genre) => {
    updatedScores[genre] += getRandomInt(0, 2);
  });

  return updatedScores;
};

export const getTopNGenres = (genres, n = 3) => {
  /* Takes in an array of genres, with scores and a number (n) of top genres, returns an array of the top n genres. */

  const requiredObj = {};
  if (n > Object.keys(genres).length) return false;

  Object.keys(genres)
    .sort((a, b) => genres[b] - genres[a])
    .forEach((key, ind) => {
      if (ind < n) {
        requiredObj[key] = genres[key];
      }
    });

  return Object.keys(requiredObj);
};

const sortDiscoverBy = [
  "original_title.asc",
  "original_title.desc",
  // "popularity.asc",
  "popularity.desc",
  // "revenue.asc",
  "revenue.desc",
  "primary_release_date.asc",
  "title.asc",
  "title.desc",
  "primary_release_date.desc",
  // "vote_average.asc",
  // "vote_average.desc",
  // "vote_count.asc",
  "vote_count.desc",
];

// Basically we want to pick a random element from the sortDiscoverBy array to apply to the query
const getRandomArrayValue = (arr) => arr[getRandomInt(0, arr.length - 1)];

export const introduceRandomSort = () => getRandomArrayValue(sortDiscoverBy);

// TODO: Exclude movies without cover images
