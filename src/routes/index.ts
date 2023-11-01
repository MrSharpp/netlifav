import authRoutes from "./auth.routes";
import expres from "express";

const router = expres.Router();

router.use("/auth", authRoutes);

export { router };
