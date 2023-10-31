import AuthRoutes from "./auth.routes";
import express from "express";

const router = express.Router();

router.use("/auth", AuthRoutes);

export default router;
