import { TransactionPayables } from "../../domain/usecases/transaction-dto"
import { FeeEnum } from "../enums/fee-enum"

export function checkPaymentStatus(paymentMethod: string): string {
  return paymentMethod === 'debit_card' ? 'paid' : 'waiting_funds'
}

export function calculateFee(paymentMethod: string, value: number): number {
  if (paymentMethod === 'debit_card') {
    const fee = (value / 100) * FeeEnum.DEBIT_CARD
    return value - fee
  }

  const fee = (value / 100) * FeeEnum.CREDIT_CARD
  return value - fee
}

export function calculatePaymentDate(paymentMethod: string): Date {
  const date = new Date()
  return paymentMethod === 'debit_card' ? date : new Date(date.setDate(date.getDate() + 30))
}

export function calculateTotalPayables(transactions: TransactionPayables[]): number {
  return transactions.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.payables.value
  }, 0)
}
