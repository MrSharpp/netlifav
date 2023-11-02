import { User } from "@models";
import { TCreateUser } from "@models/dtos/auth.schema";

export async function userExsist(email: string): Promise<boolean> {
  const count = await User.count({
    where: {
      email,
    },
  });

  return count > 0;
}

export async function findUserBy(whereQuery: object) {
  return User.findOne({
    where: whereQuery,
  });
}

export function createUser(body: TCreateUser & { refreshToken?: string }) {
  return User.create({
    email: body.email,
    password: body.password,
  });
}

export function updateRefreshToken(rt: string, newRt: string) {
  return User.update({ refreshToken: newRt }, { where: { refreshToken: rt } });
}
