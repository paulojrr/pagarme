import "reflect-metadata";
import { DataSource } from "typeorm";
import { TransactionEntity } from "../../../domain/entities/Transaction";

export const Connection = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "public",
  entities: [TransactionEntity],
  synchronize: true,
  logging: false,
});

Connection.initialize()
  .then(() => {})
  .catch((error) => console.log(error));
