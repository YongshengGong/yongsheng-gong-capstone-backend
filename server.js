import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT;
console.log(process.env.FRONT_END);
app.use(cors({ origin: process.env.FRONT_END }));


app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
  });
  