import { validate } from "@configs/validator";
import { AuthController } from "@controllers";
import expres from "express";
import { signupSchema } from "./dtos/auth.schema";

const authRouter = expres.Router();

// render pages
authRouter.get("/login", AuthController.loginPage);
authRouter.get("/register", AuthController.registerPage);

// methods
authRouter.post("/login", AuthController.loginUser);
authRouter.post(
  "/register",
  validate(signupSchema),
  AuthController.registerUser
);

export default authRouter;
