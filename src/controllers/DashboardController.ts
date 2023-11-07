import { MovieService } from "@services";
import { Request, Response, request } from "express";
import { z } from "zod";

export async function dashboardPage(req: Request, res: Response) {
  const movies = await MovieService.findAllMovies(req.session.userId);
  return res.render("index", { movies, error: "" });
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

  return res.render("edit-movie", { ...movie, error: "" });
}

export async function addMovie(req: Request, res: Response) {
  const body = req.body;

  if (body.name.length < 3)
    return res.render("index", {
      error: "Movie name must be longer then 3 characters",
    });

  const isExsist = await MovieService.movieExsist(
    body.name,
    req.session.userId
  );

  if (isExsist)
    return res.render("index", {
      error: "Movie already exsist",
    });

  try {
    await MovieService.createMovie(body, req.session.userId);
    return dashboardPage(req, res);
  } catch (err) {
    console.log(err);
    return res.render("index", {
      error: "Something went wrong while adding movie",
    });
  }
}
