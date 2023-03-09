export interface Transaction {
  id?: string;
  value: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolderName: string;
  validFrom: Date;
  verificationNumber: string;
}
