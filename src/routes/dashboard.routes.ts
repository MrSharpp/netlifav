import { DashboardController } from "@controllers";
import express from "express";
import { checkAuthentication } from "@middlewares/checkAuthentication";

const router = express.Router();

router.get("/", DashboardController.dashboardPage);
router.get("/movies/edit/:movieId", DashboardController.editMoviePage);

router.post("/movies", DashboardController.addMovie);
router.post("/movies/:movieId", DashboardController.updateMovie);
router.post("/movies/delete/:movieId");

export default router;
