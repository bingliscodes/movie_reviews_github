import { Routes, Route } from "react-router";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetailsPage";
import { demoMovie } from "./demo_data/movies";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/movie/:movieId"
          element={<MovieDetails movieData={demoMovie} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
