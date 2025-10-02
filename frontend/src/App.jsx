import { Routes, Route } from "react-router";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetailsPage";
import TvDetails from "./pages/TvDetailsPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/tv/:tvId" element={<TvDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
