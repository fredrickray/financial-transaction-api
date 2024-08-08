import { UserModel } from "./auth-model.js";
import {
  ResourceNotFound,
  BadRequest,
  InvalidInput,
  Unauthorized,
  Conflict,
} from "../../../middlewares/errorHandler.js";
import { createToken } from "../../../middlewares/authMiddleware.js";

class AuthService {
  static async signup(req, res, next) {
    try {
      const reqBody = req.body;
      const { email } = reqBody;
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new Conflict("User already exists");
      }

      const newUser = new UserModel(reqBody);

      await newUser.save();

      const resPayload = {
        success: true,
        message: `User created successfully`,
      };

      res.status(201).json(resPayload);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new ResourceNotFound("Invalid credentials");
      }

      const isPasswordMatch = await user.isPasswordMatch(password);
      if (!isPasswordMatch) {
        throw new Unauthorized("Invalid credentials");
      }

      const token = createToken(user.id);

      const resPayload = {
        success: true,
        message: "Login successful!",
        user: user.toJSON(),
      };
      res.status(200).set("Authorization", `Bearer ${token}`).json(resPayload);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default AuthService;
