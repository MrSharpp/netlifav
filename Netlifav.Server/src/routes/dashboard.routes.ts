import { AuthController, DashboardController } from "@controllers";
import express from "express";
import { checkAuthentication } from "@middlewares/checkAuthentication";

const router = express.Router();

router.get("/", DashboardController.dashboardPage);
router.get("/movies/edit/:movieId", DashboardController.editMoviePage);

router.post("/movies", DashboardController.addMovie);
// supposed to be PATCH method
router.post("/movies/:movieId", DashboardController.updateMovie);
// supposed to DELETE method
router.get("/movies/delete/:movieId", DashboardController.deleteController);
router.post("/logout", AuthController.logout);

export default router;
