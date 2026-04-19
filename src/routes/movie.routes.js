import { Router } from "express";
import * as movieController from "../controllers/movieController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

// Toutes les routes protégées
router.use(authenticate);

router.get("/", movieController.getAllMovies);
router.get("/search", movieController.searchMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

export default router;