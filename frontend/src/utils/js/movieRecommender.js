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
