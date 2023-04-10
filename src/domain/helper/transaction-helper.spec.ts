import { describe, expect, it } from "vitest"
import { TransactionPayables } from "../usecases/transaction-dto"
import { calculateFee, calculatePaymentDate, calculateTotalPayables, checkPaymentStatus } from './transaction-helper'

describe('transaction helper', () => {
  const debitCard = 'debit_card'
  const creditCard = 'credit_card'

  it('should return paid if receive debit_card', () => {
    expect(checkPaymentStatus(debitCard)).toEqual('paid')
  })

  it('should return waiting_founds if receiving credit_card', () => {
    expect(checkPaymentStatus(creditCard)).toEqual('waiting_funds')
  })

  it('should return the correct fee using a debit_card', () => {
    const value = 100
    expect(calculateFee(debitCard, value)).toEqual(97)
  })

  it('should return the correct fee using a credit_card', () => {
    const value = 100
    expect(calculateFee(creditCard, value)).toEqual(95)
  })

  it('should return date D+0 if receiving debit_card', () => {
    const date = new Date()
    expect(calculatePaymentDate(debitCard)).toEqual(date)
  })

  it('should return date D+30 if receiving credit_card', () => {
    const date = new Date()
    const finalDate = new Date(date.setDate(date.getDate() + 30))

    expect(calculatePaymentDate(creditCard)).toEqual(finalDate)
  })

  it("returns the correct sum of payables values", () => {
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

  it("returns 0 if transactions array is empty", () => {
    const transactions: TransactionPayables[] = [];

    const result = calculateTotalPayables(transactions);

    expect(result).toEqual(0);
  });
})
