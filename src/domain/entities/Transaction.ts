import { Column, Entity, PrimaryColumn } from "typeorm";
import { PaymentMethodEnum } from "../../infra/enum/paymentMethodEnum";
import { Transaction } from "../usecases/transaction.dto";
import { randomUUID } from 'crypto'

@Entity()
export class TransactionEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: PaymentMethodEnum,
  })
  paymentMethod: string;

  @Column()
  cardNumber: string;

  @Column()
  cardHolderName: string;

  @Column()
  validFrom: Date;

  @Column()
  verificationNumber: number;

  constructor(data: Transaction) {
  this.id = data.id || randomUUID();
  }
}
