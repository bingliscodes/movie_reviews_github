const moodToGenres = {
  excited: ["Action", "Adventure", "Thriller", "Science Fiction"],
  sad: ["Drama", "Romance"],
  goofy: ["Comedy", "Family", "Animation"],
  happy: ["Comedy", "Adventure", "Music"],
  scared: ["Horror", "Thriller"],
  angry: ["Crime", "War", "Action"],
  cheesy: ["Romance", "TV Movie", "Comedy"],
  creative: ["Documentary", "Science Fiction", "History"],
  artsy: ["Documentary", "History", "Music", "Artsy"],
};

const genresMap = {
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

const moods = [
  "excited",
  "sad",
  "goofy",
  "happy",
  "scared",
  "angry",
  "cheesy",
  "creative",
  "artsy",
];

export const getGenresFromMoods = (moods) => {
  const genres = new Set();
  for (const mood of moods) {
    const mappedGenres = moodToGenres[mood] || [];
    mappedGenres.forEach((genre) => genres.add(genresMap[genre]));
  }

  return Array.from(genres);
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
      { label: "Pizza", value: "c" },
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
      { label: "Modern, last 10 years", value: "a" },
      { label: "2000's", value: "b" },
      { label: "old-ish", value: "c" },
      { label: "oldies", value: "d" },
    ],
  },
];
