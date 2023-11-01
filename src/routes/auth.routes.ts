import { AuthController } from "@controllers";
import expres from "express";

const authRouter = expres.Router();

authRouter.get("/register", AuthController.loginPage);

authRouter.get("/register", AuthController.registerPage);

export default authRouter;
