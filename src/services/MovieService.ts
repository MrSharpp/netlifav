import { Movie } from "@models";

export async function movieExsist(
  movieName: string,
  UserId: string
): Promise<boolean> {
  const count = await Movie.count({
    where: {
      name: movieName.toLocaleLowerCase(),
      UserId,
    },
  });

  return count > 0;
}

type TMovie = {
  name: string;
  ratings: number;
  genre: string;
  cast: string;
  releaseDate: string;
};

export async function findAllMovies(UserId: string) {
  return Movie.findAll({
    where: {
      UserId,
    },
    order: [["ratings", "DESC"]],
  });
}

export async function findMovieById(movieId: string) {
  return Movie.findOne({
    where: {
      id: movieId,
    },
  });
}

export async function createMovie(movie: TMovie, UserId: string) {
  return Movie.create({
    ...movie,
    UserId,
  });
}

export async function updateMovie(movie: TMovie, id: string) {
  return Movie.update(
    {
      ...movie,
    },
    { where: { id } }
  );
}

export async function deleteMovie(movieId: string) {
  return Movie.destroy({
    where: {
      id: movieId,
    },
  });
}
