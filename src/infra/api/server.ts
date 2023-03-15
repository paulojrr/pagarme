import express from "express";
import "reflect-metadata";
import { typeormDataSource } from "../typeorm/data-source";
import { transactionRoutes } from "./rest/transaction.routes";

const app = express();
app.use(express.json());
app.use(transactionRoutes);

typeormDataSource
  .initialize()
  .then(() =>
    app.listen(3000, () => console.log("Server is running at port 3000"))
  )
  .catch((error: Error) => console.log(error));

export { app };
