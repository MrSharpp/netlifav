import { config } from "@configs/config";
import jsonwebtokens from "jsonwebtoken";
import crypto from "crypto";
import { updateRefreshToken } from "./UserService";

export async function generateAccessToken(sub: string) {
  const token = await jsonwebtokens.sign(
    {
      sub,
      issuer: "https://fav-movies.db.com",
      audience: "https://fav-movies.db.com",
      iat: Date.now(),
    },
    config.JWT_SEVRET,
    { expiresIn: "1h" }
  );

  return token;
}
