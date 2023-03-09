import { IsDateString, IsString, Length, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../../../domain/entities/transaction";
import { PaymentMethodEnum } from "../../enum/paymentMethodEnum";

@Entity()
export class TransactionEntity implements Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Min(0)
  @Column()
  value: number;

  @IsString()
  @Column()
  description: string;

  @IsString()
  @Column({
    type: "enum",
    enum: PaymentMethodEnum,
  })
  paymentMethod: string;

  @IsString()
  @Column()
  cardNumber: string;

  @IsString()
  @Column()
  cardHolderName: string;

  @IsDateString()
  @Column()
  validFrom: Date;

  @Length(3, 3)
  @Column()
  verificationNumber: string;
}
