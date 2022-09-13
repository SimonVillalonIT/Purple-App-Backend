import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.route.js";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
