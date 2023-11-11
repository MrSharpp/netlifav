import axios from "axios";
import { CONSTANTS } from "../../global";
import { LoginSchema, SignupSchema } from "../../schema/auth.schema";

export async function loginApiCall(data: Zod.infer<typeof LoginSchema>) {
  return axios
    .post(CONSTANTS.ApiBaseURL + "/auth/login", data)
    .then((res) => res.data);
}

export async function signupApiCall(data: Zod.infer<typeof SignupSchema>) {
  return axios
    .post(CONSTANTS.ApiBaseURL + "/auth/register", data)
    .then((res) => res.data);
}
