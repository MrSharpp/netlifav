import { User } from "@models";
import { loginSchema, signupSchema } from "@models/dtos/auth.schema";
import { UserService, sequelize } from "@services";
import { hashPassword } from "@utils/hashPassword";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { ZodError } from "zod";

export function loginPage(req: Request, res: Response) {
  return res.render("Auth/login", { error: req.error });
}

export function registerPage(req: Request, res: Response) {
  return res.render("Auth/register", { error: req.error });
}

export async function loginUser(req: Request, res: Response) {
  const body = req.body;

  const errs: ZodError = await loginSchema.parseAsync(body).catch((err) => err);
  if (Array.isArray(errs.errors)) {
    console.log(JSON.stringify(errs));
    req.error = errs.errors.pop()?.message;
    return loginPage(req, res);
  }

  const user = await UserService.findUserBy({ email: body.email });

  if (!user)
    return res.render("Auth/login", {
      error: "Email doesnt exsist",
      email: "",
    });

  const isValid = await bcrypt.compare(
    body.password,
    user.getDataValue("password")
  );

  if (!isValid)
    return res.render("Auth/login", {
      email: "",
      password: "Incorrect password",
      error: "",
    });

  req.session.userId = user.getDataValue("id");

  return res.redirect("/");
}

export async function registerUser(req: Request, res: Response) {
  const body = req.body;

  const errs: ZodError = await signupSchema
    .parseAsync(body)
    .catch((err) => err);
  if (Array.isArray(errs.errors)) {
    console.log(JSON.stringify(errs));
    req.error = errs.errors.pop()?.message;
    return registerPage(req, res);
  }

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
  console.log("aa");
  req.session.userId = null;
  return req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    return res.redirect("/register");
  });
}
