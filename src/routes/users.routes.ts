import { Router } from "express";
import { jwtvalidate } from "../middlewares/jwtValidate.middleware.js";
import { UsersController } from "../controllers/users.controllers.js";

const router = Router();
const usersController = new UsersController();

router.get("/me", jwtvalidate, usersController.show_profile);

export default router;
