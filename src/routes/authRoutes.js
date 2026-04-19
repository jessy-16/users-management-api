import {Router} from "express";
import * as authController from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/me", authenticate, authController.getMe);
router.post("/register", authController.register);


router.post("/login", authController.login);

export default router;