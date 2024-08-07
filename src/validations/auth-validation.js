import Joi from "joi";
import { InvalidInput } from "../middlewares/errorHandler.js";

const SigninValidationSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().trim(false).min(8).max(64).required(),
});

const signinValidator = (req, res, next) => {
  const { error } = SigninValidationSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new InvalidInput(errorMessages);
  }

  next();
};

export { signinValidator };
