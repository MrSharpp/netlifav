import { Profile, User } from "@models";
import { loginSchema } from "@models/dtos/auth.schema";
import { UserService, sequelize } from "@services";
import { hashPassword } from "@utils/hashPassword";
import { Request, Response } from "express";

export function loginPage(req: Request, res: Response) {
  return res.render("Auth/login", { error: "" });
}

export function registerPage(req: Request, res: Response) {
  return res.render("Auth/register", { error: "" });
}

export async function loginUser(req: Request, res: Response) {
  const body = req.body;

  const user = await UserService.findUserBy({ email: body.email });

  if (!user)
    return res.render("Auth/login", {
      error: "Email doesnt exsist",
      email: "",
    });

  if (user.getDataValue("password") != hashPassword(body.password))
    return res.render("Auth/login", {
      error: "Incorrect password",
      email: body.email,
    });

  req.session.userId = user.getDataValue("id");

  return res.redirect("/");
}

export async function registerUser(req: Request, res: Response) {
  const body = req.body;

  const emailExsist = await UserService.userExsist(body.email);

  if (emailExsist)
    return res.render("Auth/register", {
      error: "Email already exsist",
      email: "",
    });

  if (body.password != body.cpassword)
    return res.render("Auth/register", {
      error: "Passwords do not match",
      email: body.email,
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
