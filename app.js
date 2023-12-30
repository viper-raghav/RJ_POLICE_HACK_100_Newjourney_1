import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectdb from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/user/", userRoutes);

const port = process.env.PORT;
const uri = process.env.URI;

connectdb(uri);

app.listen(port, () => {
  console.log("app is running...");
});
