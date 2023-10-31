import { UserService } from "@services";
import { Request, Response } from "express";

export function loginUser(req: Request, res: Response) {}

export function registerUser(req: Request, res: Response) {
  const resp = UserService.createUser();
  return res.send(resp);
}
