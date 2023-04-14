import { describe, expect, it } from "vitest"
import { TransactionPayables } from "../usecases/transaction-dto"
import {
  calculatePayablesWithFee,
  calculatePaymentDate,
  calculateTotalPayables,
  checkPaymentStatus
} from './transaction-helper'

describe('TransactionHelper', () => {
  const debitCard = 'debit_card'
  const creditCard = 'credit_card'
  const DEBIT_CARD_FEE = 0.03
  const CREDIT_CARD_FEE = 0.05
  const DAYS_TO_WAIT_FOR_FUNDS = 30

  it('should return "paid" when payment is made with a debit card', () => {
    expect(checkPaymentStatus(debitCard)).toEqual('paid')
  })

  it('should return "waiting_funds" when payment is made with a credit card', () => {
    expect(checkPaymentStatus(creditCard)).toEqual('waiting_funds')
  })

  it('should calculate the correct fee when payment is made with a debit card', () => {
    const transactionValue = 100
    const fee = transactionValue * DEBIT_CARD_FEE
    const expectedPayableValueWithFee = transactionValue - fee

    expect(calculatePayablesWithFee(debitCard, transactionValue)).toEqual(expectedPayableValueWithFee)
    expect(calculateTotalPayables([{ payables: { value: expectedPayableValueWithFee } }])).toEqual(expectedPayableValueWithFee)
  })

  it('should calculate the correct fee when payment is made with a credit card', () => {
    const transactionValue = 100
    const fee = transactionValue * CREDIT_CARD_FEE
    const expectedPayableValueWithFee = transactionValue - fee

    expect(calculatePayablesWithFee(creditCard, transactionValue)).toEqual(expectedPayableValueWithFee)
    expect(calculateTotalPayables([{ payables: { value: expectedPayableValueWithFee } }])).toEqual(expectedPayableValueWithFee)
  })

  it('should calculate the payment date as D+0 when payment is made with a debit card', () => {
    const expectedPaymentDate = new Date()

    expect(calculatePaymentDate(debitCard)).toEqual(expectedPaymentDate)
  })

  it('should calculate the payment date as D+30 when payment is made with a credit card', () => {
    const today = new Date()
    const expectedPaymentDate = new Date(today.setDate(today.getDate() + DAYS_TO_WAIT_FOR_FUNDS))

    expect(calculatePaymentDate(creditCard)).toEqual(expectedPaymentDate)
  })

  it("should return the correct sum of payables values when there are multiple transactions", () => {
    const transactions: TransactionPayables[] = [
      {
        payables: {
          value: 100,
        },
      },
      {
        payables: {
          value: 100,
        },
      },
      {
        payables: {
          value: 100,
        },
      },
    ];

    const result = calculateTotalPayables(transactions);

    expect(result).toEqual(300);
  });

  it("returns the correct sum of payables values when there is only one transaction", () => {
    const transactions: TransactionPayables[] = [
      {
        payables: {
          value: 100,
        },
      },
    ];

    const result = calculateTotalPayables(transactions);

    expect(result).toEqual(100);
  });
})
