import { UserModel } from "../v1/feat/auth/auth-model.js";
import {
  Unauthorized,
  InvalidInput,
  ResourceNotFound,
} from "./errorHandler.js";
import bcrypt from "bcryptjs";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 10 * 60 * 100,
  });
};

const verifyToken = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    if (!token || !secretKey) {
      throw new InvalidInput("Token or secretKey is missing");
    }

    const decodedUser = jwt.verify(token, secretKey);

    return decodedUser;
  } catch (error) {
    throw new InvalidInput("Invalid token");
  }
};

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Unauthorized("Authorization token required");
    }

    const token = authorization.split(" ")[1];
    const { id } = verifyToken(token);
    const user = await UserModel.findById({ _id: id });

    if (!user) {
      throw new ResourceNotFound("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};

export { createToken, verifyToken, requireAuth, hashData };
