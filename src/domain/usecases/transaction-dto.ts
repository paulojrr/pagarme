export interface CreateTransaction {
  id?: string;
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
  value: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolderName: string;
  validFrom: Date;
  verificationNumber: string;
  payablesId: string,
}
