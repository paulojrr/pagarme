import express from "express";
import logger from "../helper/logger";
import { transactionRoutes } from "./rest/transaction.routes";

const app = express();
app.use(express.json());
app.use(transactionRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => logger.info("Server is running at port 3000"));
}

export { app };
