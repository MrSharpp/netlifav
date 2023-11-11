import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthenticatedLayout from "./components/AuthenticatedLayout/AuthenticatedLayout";
import Movies from "./pages/Movies";
import CreateMovie from "./pages/CreateMovie";
import Genre from "./pages/Genre";
import Actors from "./pages/Actors";
import CreateActorOrGenre from "./pages/CreateActor";
import UpdateMovie from "./pages/UpdateMovie";

function App() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/" element={<AuthenticatedLayout />}>
        <Route index element={<Navigate to="/movies" />} />

        <Route path="movies" element={<Movies />} />
        <Route path="movies/edit/:movieId" element={<UpdateMovie />} />
        <Route path="create-movie" element={<CreateMovie />} />

        <Route path="genres" element={<Genre />} />
        <Route
          path="create-genre"
          element={<CreateActorOrGenre type="genre" />}
        />

        <Route path="actors" element={<Actors />} />
        <Route
          path="create-actor"
          element={<CreateActorOrGenre type="actor" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
