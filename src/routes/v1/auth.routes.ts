import { AuthController } from "@controllers";
import expres from "express";

const authRouter = expres.Router();

authRouter.get("/register", AuthController.loginPage);

export default authRouter;
