import { movieSchema } from "@models/dtos/movie.schema";
import { MovieService } from "@services";
import { Request, Response, request } from "express";
import { ZodError, z } from "zod";

export async function dashboardPage(req: Request, res: Response) {
  const movies = await MovieService.findAllMovies(req.session.userId);
  return res.render("index", { movies, error: req.error || "" });
}

export async function editMoviePage(req: Request, res: Response) {
  if (
    !(await z
      .string()
      .uuid()
      .parseAsync(req.params.movieId)
      .catch(() => false))
  )
    return res.redirect("back");

  const movie = await MovieService.findMovieById(req.params.movieId);

  if (!movie) res.redirect("back");

  return res.render("edit-movie", { movie, error: req.error || "" });
}

export async function addMovie(req: Request, res: Response) {
  const body = req.body;

  const errs: ZodError = await movieSchema.parseAsync(body).catch((err) => err);
  if (Array.isArray(errs.errors)) {
    console.log(JSON.stringify(errs));
    req.error = errs.errors.pop()?.message;
    return dashboardPage(req, res);
  }

  const isExsist = await MovieService.movieExsist(
    body.name,
    req.session.userId
  );

  if (isExsist) {
    req.error = "Movie with this name already exsist";
    return dashboardPage(req, res);
  }

  try {
    await MovieService.createMovie(
      {
        name: body.name,
        cast: body.casts,
        genre: body.genre,
        ratings: body.ratings,
        releaseDate: body.release,
      },
      req.session.userId
    );
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("index", {
      error: "Something went wrong while adding movie",
      movies: [],
    });
  }
}

export async function updateMovie(req: Request, res: Response) {
  const body = req.body;
  const errs: ZodError = await movieSchema.parseAsync(body).catch((err) => err);
  if (Array.isArray(errs.errors)) {
    console.log(JSON.stringify(errs));
    req.error = errs.errors.pop()?.message;
    return editMoviePage(req, res);
  }

  try {
    await MovieService.updateMovie(
      {
        name: body.name,
        cast: body.casts,
        genre: body.genre,
        ratings: body.ratings,
        releaseDate: body.release,
      },
      req.params.movieId
    );
  } catch (err) {
    console.log(err);
    req.error = "Something went wrong while updating movie";
    return editMoviePage(req, res);
  }

  return res.redirect("/");
}

export async function deleteController(req: Request, res: Response) {
  try {
    await MovieService.deleteMovie(req.params.movieId);
    return res.redirect("/");
  } catch (err) {
    req.error = "Something went wrong while deleting this movie";
    return dashboardPage(req, res);
  }
}
