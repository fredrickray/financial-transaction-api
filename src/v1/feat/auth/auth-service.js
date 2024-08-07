import { UserModel } from "./auth-model";
import {
  ResourceNotFound,
  BadRequest,
  InvalidInput,
  Unauthorized,
} from "../../../middlewares/errorHandler.js";
import { createToken } from "../../../middlewares/authMiddleware.js";

class AuthService {
  static async signin(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await UserModel.findOne({ username });
      if (!user) {
        throw new ResourceNotFound("Username not found");
      }

      const isPasswordMatch = await existingUser.isPasswordMatch(password);
      if (!isPasswordMatch) {
        throw new Unauthorized("Invalid credentials");
      }

      const token = createToken(user.id);

      const resPayload = {
        success: true,
        message: "Login successful!",
        user: user.toJSON(),
        token,
      };
      res.status(200).set("Authorization", `Bearer ${token}`).json(resPayload);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthService;
