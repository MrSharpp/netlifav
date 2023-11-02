import { Request, Response, request } from "express";

export function dashboardPage(req: Request, res: Response) {
  return res.send("LOGGED IN");
}
