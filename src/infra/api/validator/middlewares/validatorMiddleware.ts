import { validationPipeSchema } from "../schemas/validationPipeSchema";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware: any =
  (validationSchema: any) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const result: any = await validationPipeSchema(validationSchema, {
      ...request.body,
      ...request.params,
    });
    if (result) {
      console.log(result);
      return response.status(400).json({
        success: false,
        ...result,
      });
    }

    next();
    return true;
  };
