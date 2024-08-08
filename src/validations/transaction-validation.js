import Joi from "joi";
import { InvalidInput } from "../middlewares/errorHandler.js";

const newTransactionSchema = Joi.object({
  amount: Joi.number().greater(0).required().messages({
    "any.required": "Amount is required",
    "number.base": "Amount must be a number",
    "number.greater": "Amount must be greater than zero",
  }),
  type: Joi.string().required().valid("credit", "debit").messages({
    "any.required": "Type is required",
    "any.only": 'Type must be either "credit" or "debit"',
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.base": "Description must be a string",
  }),
});

const newTransactionValidator = (req, res, next) => {
  const { error } = newTransactionSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new InvalidInput("Invalid input", errorMessages);
  }

  next();
};

export default newTransactionValidator;
