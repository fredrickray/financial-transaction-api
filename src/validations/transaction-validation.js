import Joi from "joi";
import { InvalidInput } from "../middlewares/errorHandler.js";

const newTransactionSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().required().valid("credit", "debit"),
  description: Joi.string().required(),
});

const newTransactionValidator = (req, res, next) => {
  const { error } = newTransactionSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new InvalidInput(errorMessages);
  }

  next();
};

export default newTransactionValidator;
