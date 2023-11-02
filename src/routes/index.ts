import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import expres from "express";

const router = expres.Router();

router.use("/", dashboardRoutes);
router.use("/auth", authRoutes);

export { router };
