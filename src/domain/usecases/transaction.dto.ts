export interface Transaction {
  id?: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolderName: string;
  validFrom: Date;
  verificationNumber: number;
}
