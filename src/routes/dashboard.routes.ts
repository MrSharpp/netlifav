import { DashboardController } from "@controllers";
import express from "express";
import { checkAuthentication } from "@middlewares/checkAuthentication";

const router = express.Router();

router.use(checkAuthentication);

router.get("/", DashboardController.dashboardPage);

export default router;
