import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT||8080;
app.use(cors({ origin: process.env.FRONT_END }));

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to my Capstone backend</h1>`);
});

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
  });
  