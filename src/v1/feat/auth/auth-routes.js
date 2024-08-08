import { Router } from "express";
import { AuthController } from "./auth-controller.js";
import {
  signinValidator,
  signUpValidator,
} from "../../../validations/auth-validation.js";
const authRouter = Router();
const authController = new AuthController();

authRouter
  .route("/signup")
  .post(signUpValidator, authController.signup.bind(authController));

authRouter
  .route("/signin")
  .post(signinValidator, authController.signin.bind(authController));

export default authRouter;
