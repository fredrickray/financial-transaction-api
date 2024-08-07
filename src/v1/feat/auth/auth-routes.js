import { Router } from "express";
import { AuthController } from "./auth-controller.js";

const authRouter = Router();
const authController = new AuthController();

authRouter
  .route("/signin")
  .post(signinValidator, authController.signin.bind(authController));

export default authRouter;
