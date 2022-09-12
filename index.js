import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.route.js";
import "./database/connectdb.js";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
