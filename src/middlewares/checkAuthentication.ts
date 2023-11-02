import { NextFunction, Request, Response } from "express";

export function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId && !req.path.includes("/auth")) {
    return res.redirect("/auth/login");
  } else if (req.session.userId && req.path.includes("/auth")) {
    return res.redirect("/");
  }
  next();
}
