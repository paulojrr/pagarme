import { describe, expect, it } from "vitest"
import { formatCpf } from './format-helper'

describe('format helper', () => {
  const cpf = '07943001036'

  it('should format the CPF correctly', () => {
    expect(formatCpf(cpf)).toEqual('079.430.010-36')
  })
})

