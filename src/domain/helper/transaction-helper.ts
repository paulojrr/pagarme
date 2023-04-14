import { TransactionPayables } from "../../domain/usecases/transaction-dto"
import { FeeEnum } from "../enums/fee-enum"

const DEBIT_CARD = 'debit_card'

export function checkPaymentStatus(paymentMethod: string): string {
  return paymentMethod === DEBIT_CARD ? 'paid' : 'waiting_funds'
}

export function calculatePayablesWithFee(paymentMethod: string, value: number): number {
  const fee = (value / 100) * (paymentMethod === DEBIT_CARD ? FeeEnum.DEBIT_CARD : FeeEnum.CREDIT_CARD)
  return value - fee
}

export function calculatePaymentDate(paymentMethod: string): Date {
  const date = new Date()
  return paymentMethod === DEBIT_CARD ? date : new Date(date.setDate(date.getDate() + 30))
}

export function calculateTotalPayables(transactions: TransactionPayables[]): number {
  return transactions.reduce((accumulator, currentValue) => accumulator + currentValue.payables.value, 0)
}

