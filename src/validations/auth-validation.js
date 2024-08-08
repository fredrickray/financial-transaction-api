import Joi from "joi";
import { InvalidInput } from "../middlewares/errorHandler.js";

const SignUPValidationSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().trim().min(8).max(64).required(),
});
const SigninValidationSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().trim(false).min(8).required(),
});

const signUpValidator = (req, res, next) => {
  const { error } = SignUPValidationSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new InvalidInput(errorMessages);
  }

  next();
};

const signinValidator = (req, res, next) => {
  const { error } = SigninValidationSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new InvalidInput(errorMessages);
  }

  next();
};

export { signinValidator, signUpValidator };
