import { Routes, Route } from "react-router";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetailsPage";
import TvDetails from "./pages/TvDetailsPage";
import UserDetails from "./components/User/UserDetails";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

import "./App.css";

import { demoUser } from "./demo_data/user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/tv/:tvId" element={<TvDetails />} />
        <Route path="me" element={<UserDetails userData={demoUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
