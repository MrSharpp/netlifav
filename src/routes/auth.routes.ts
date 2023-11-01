import { AuthController } from "@controllers";
import expres from "express";

const authRouter = expres.Router();

// render pages
authRouter.get("/login", AuthController.loginPage);
authRouter.get("/register", AuthController.registerPage);

// methods
authRouter.post("/login", AuthController.loginUser);
authRouter.post("/register", AuthController.registerPage);

export default authRouter;
