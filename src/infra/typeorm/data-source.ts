import { DataSource } from "typeorm";
import { TransactionEntity } from "./entities/transaction-entity";

export const typeormDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [TransactionEntity],
});
