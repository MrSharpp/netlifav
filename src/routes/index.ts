import { checkAuthentication } from "@middlewares/checkAuthentication";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import expres from "express";

const router = expres.Router();

router.use(checkAuthentication);

router.use("/", dashboardRoutes);
router.use("/auth", authRoutes);

export { router };
