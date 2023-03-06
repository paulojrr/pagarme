import { CreateTransaction } from "../../../domain/usecases/createTransaction";
import { HttpRequest, HttpResponse } from "../../api/rest/interfaces/http";
import { badRequest, ok, serverError } from "../errors/helpers/http-helper";
import { MissingParamError } from "../errors/missing-param-error";

export class TransactionController {
  constructor(private readonly createTransaction: CreateTransaction) { }

  async create(request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        "description",
        "paymentMethod",
        "cardNumber",
        "cardHolderName",
        "validFrom",
        "verificationNumber",
      ];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const transaction = await this.createTransaction.create(request.body);

      return ok(transaction);
    } catch (error) {
      return serverError();
    }
  }
}
