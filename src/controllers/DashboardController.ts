import { Movie } from "@models";
import { MovieService } from "@services";
import { Request, Response, request } from "express";

export async function dashboardPage(req: Request, res: Response) {
  const movies = await Movie.findAll();
  return res.render("index", { movies, error: "" });
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
    return res.render("index", { error: "" });
  } catch (err) {
    console.log(err);
    return res.render("index", {
      error: "Something went wrong while adding movie",
    });
  }
}
