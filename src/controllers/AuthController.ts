import { Profile, User } from "@models";
import { UserService, sequelize } from "@services";
import { Request, Response } from "express";

export function loginPage(req: Request, res: Response) {
  return res.render("Auth/login");
}

export function registerPage(req: Request, res: Response) {
  return res.render("Auth/register");
}

export function loginUser(req: Request, res: Response) {}

export async function registerUser(req: Request, res: Response) {
  const resp = UserService.createUser();
  try {
    await User.create(
      {
        email: "amiralam@sofyrus.com",
        password: "lol",
        Profile: {
          firstName: "amir",
          lastName: "alam",
        },
      },
      {
        include: Profile,
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "user/sign-up-error",
    });
  }
  return res.send(resp);
}
