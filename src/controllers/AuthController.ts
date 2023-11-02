import { Profile, User } from "@models";
import { UserService, sequelize } from "@services";
import { Request, Response } from "express";

export function loginPage(req: Request, res: Response) {
  return res.render("Auth/login");
}

export function registerPage(req: Request, res: Response) {
  return res.render("Auth/register");
}

export async function loginUser(req: Request, res: Response) {
  const body = req.body;

  console.log(body);

  const user = await UserService.findUserBy({ email: body.email });

  if (!user) return res.status(401).send("Unauthrozied");

  req.session.userId = user.getDataValue("id");

  return res.redirect("/");
}

export async function registerUser(req: Request, res: Response) {
  const body = req.body;

  const emailExsist = await UserService.userExsist(body.email);

  if (emailExsist)
    return res.status(400).send({
      error: "register-error/email-exsist",
    });

  const user = await UserService.createUser(body);

  req.session.userId = user.getDataValue("id");

  return res.redirect("/");
}

export function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/register");
  });
}
