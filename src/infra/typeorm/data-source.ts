import { DataSource } from "typeorm";
import { TransactionEntity } from "./entities/transaction-entity";
import { transaction1678351522694 } from "../typeorm/migrations/1678351522694-transaction"

export const typeormDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: [TransactionEntity],
  migrations: [transaction1678351522694],
});
