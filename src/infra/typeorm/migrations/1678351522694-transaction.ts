import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class transaction1678351522694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transaction",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "paymentMethod",
            type: "varchar",
          },
          {
            name: "cardNumber",
            type: "varchar",
          },
          {
            name: "cardHolderName",
            type: "varchar",
          },
          {
            name: "validFrom",
            type: "timestamp",
          },
          {
            name: "verificationNumber",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transaction");
  }
}
