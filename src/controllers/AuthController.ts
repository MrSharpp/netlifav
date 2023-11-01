import { UserService } from "@services";
import { Request, Response } from "express";

export function loginPage(req: Request, res: Response) {
  return res.render("Auth/login");
}

export function registerPage(req: Request, res: Response) {
  return res.render("Auth/register");
}

export function loginUser(req: Request, res: Response) {}

export function registerUser(req: Request, res: Response) {
  const resp = UserService.createUser();
  return res.send(resp);
}
