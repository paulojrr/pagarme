import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "../../../docs/swagger";
import logger from "../helper/logger";
import { transactionRoutes } from "./rest/transaction.routes";

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(transactionRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => logger.info("Server is running at port 3000"));
}

export { app };
