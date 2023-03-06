import express from "express";
import { router } from "./rest/router";

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
