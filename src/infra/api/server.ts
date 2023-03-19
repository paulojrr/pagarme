import express from "express";
import { transactionRoutes } from "./rest/transaction.routes";

const app = express();
app.use(express.json());
app.use(transactionRoutes);

app.listen(3000, () => console.log("Server is running at port 3000"));

export { app };
