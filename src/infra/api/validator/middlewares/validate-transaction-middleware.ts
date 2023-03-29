import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
  value: Joi.number().positive().required(),
  cpf: Joi.string().length(14).required(),
  description: Joi.string().required(),
  paymentMethod: Joi.string().valid("credit_card", "debit_card").required(),
  cardNumber: Joi.string().creditCard().required(),
  cardHolderName: Joi.string().required(),
  validFrom: Joi.date().iso().required(),
  verificationNumber: Joi.string().length(3).required(),
});

export function validateTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(400).json({ message: error.details[0].message });
  }
  return next();
}
