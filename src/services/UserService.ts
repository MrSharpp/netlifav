import { Profile, User } from "@models";
import { TCreateUser } from "@models/dtos/auth.schema";

export async function userExsist(email: string): Promise<boolean> {
  const count = await User.count({
    where: {
      email,
    },
  });

  return count > 0;
}

export function createUser(body: TCreateUser) {
  return User.create(
    {
      email: body.email,
      password: body.password,
      Profile: {
        firstName: body.firstName,
        lastName: body.lastName,
      },
    },
    {
      include: Profile,
    }
  );
}
