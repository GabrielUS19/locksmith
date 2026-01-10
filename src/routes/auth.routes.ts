import { Router } from "express";
import AuthController from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/zod.validate.js";
import { loginSchema, registerSchema } from "../utils/auth.schemas.js";

const router = Router();
const authController = new AuthController();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/refresh-token", authController.refreshToken);

export default router;
