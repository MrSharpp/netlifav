import { axios } from "../global";
import { CreateActorOrGenreSchema } from "../schema/create-actor-genre.schema";
import { CreateMovieSchema } from "../schema/create-movie.schema";

export function getMovies() {
  return axios.get("/movies").then((res) => res.data);
}

export function getGenres() {
  return axios.get("/genre").then((res) => res.data);
}

export function getActors() {
  return axios.get("/actors").then((res) => res.data);
}

export function createActor(body: Zod.infer<typeof CreateActorOrGenreSchema>) {
  return axios.post("/actors", body).then((res) => res.data);
}

export function createGenre(body: Zod.infer<typeof CreateActorOrGenreSchema>) {
  return axios.post("/genre", body).then((res) => res.data);
}

export function createMovie(body: Zod.infer<typeof CreateMovieSchema>) {
  return axios.post("/movies", body).then((res) => res.data);
}

export function deleteMovieApiCall(id: string) {
  return axios.delete(`/movies/${id}`).then((res) => res.data);
}

export function updateMovie(payload: {
  movieId: string;
  body: Zod.infer<typeof CreateMovieSchema>;
}) {
  return axios
    .patch(`/movies/${payload.movieId}`, payload.body)
    .then((res) => res.data);
}
