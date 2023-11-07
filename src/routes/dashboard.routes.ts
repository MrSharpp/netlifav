import { DashboardController } from "@controllers";
import express from "express";
import { checkAuthentication } from "@middlewares/checkAuthentication";

const router = express.Router();

router.get("/", DashboardController.dashboardPage);
router.get("/edit-movie/:movieId", DashboardController.editMoviePage);

router.post("/movies", DashboardController.addMovie);
router.patch("/movies/:movieId");
router.delete("/movies/:movieId");

export default router;
