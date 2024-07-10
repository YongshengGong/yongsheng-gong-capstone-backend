import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memberRouter from "./routes/members.js";
import companyRouter from "./routes/companies.js";
import teamRouter from "./routes/teams.js";
import projectsRouter from "./routes/projects.js";
import statusRouter from "./routes/project_status.js";
import tasksRouter from "./routes/project_status_tasks.js";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT||8080;
app.use(cors({ origin: process.env.FRONT_END||"https://ems-yg.com" }));
console.log(process.env.FRONT_END)

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to my Capstone backend</h1>`);
  console.log(6);
});


app.use("/members",memberRouter);
app.use("/companies",companyRouter);
app.use("/teams",teamRouter);
app.use("/projects",projectsRouter);
app.use("/project_status",statusRouter);
app.use("/project_status_tasks",tasksRouter);


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
