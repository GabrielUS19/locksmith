import { Router } from "express";
import AuthController from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/zod.validate.js";
import { createRegisterSchema } from "../utils/auth.schemas.js";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  validate(createRegisterSchema),
  authController.register,
);

router.post("/login", authController.login);

export default router;
