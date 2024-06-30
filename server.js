import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memberRouter from "./routes/members.js";
import companyRouter from "./routes/companies.js";
import teamRouter from "./routes/teams.js";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT;
app.use(cors({ origin: process.env.FRONT_END }));
console.log(process.env.FRONT_END)

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to my Capstone backend</h1>`);
});


app.use("/members",memberRouter);
app.use("/companies",companyRouter);
app.use("/teams",teamRouter);


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
