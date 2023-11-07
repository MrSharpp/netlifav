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
  casts: string;
  release: string;
};

export async function findAllMovies(UserId: string) {
  return Movie.findAll({
    where: {
      UserId,
    },
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
    name: movie.name,
    ratings: movie.ratings,
    cast: movie.casts,
    releaseDate: movie.release,
    genre: movie.genre,
    UserId,
  });
}
