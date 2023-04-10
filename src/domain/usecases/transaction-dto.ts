export interface CreateTransaction {
  id?: string;
  cpf: string;
  value: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolderName: string;
  validFrom: Date;
  verificationNumber: string;
  payables: {
    value: number,
    status: string,
    paymentDate: Date
  }
}

export interface ResponseTransaction {
  id: string;
  cpf: string;
  value: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolderName: string;
  validFrom: Date;
  verificationNumber: string;
  payablesId: string,
}

export interface TransactionPayables {
  payables: {
    value: number
  }
}
