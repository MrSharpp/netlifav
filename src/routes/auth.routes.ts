import { validate } from "@middlewares/validator";
import { AuthController } from "@controllers";
import expres from "express";
import { signupSchema } from "@models/dtos/auth.schema";

const authRouter = expres.Router();

// render pages
authRouter.get("/login", AuthController.loginPage);
authRouter.get("/register", AuthController.registerPage);

// methods
authRouter.post("/login", AuthController.loginUser);
authRouter.post("/register", AuthController.registerUser);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
