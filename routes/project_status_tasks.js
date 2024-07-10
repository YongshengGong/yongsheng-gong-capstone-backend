import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { readTasks } from "../controllers.js";

const knex = initKnex(configuration);
const tasksRouter = express.Router();

tasksRouter.route("/")
    .get(async (_req, res) => {
        try {
            const project_status_tasks = await readTasks();
            res.status(200).json(project_status_tasks);
        }
        catch (error) {
            res.status(500).json({ message: "Error reading project_status_tasks" });
        }
    })
    .post(async (req, res) => {
        try {
            await knex("project_status_tasks").insert(req.body);
            res.status(201).json(req.body);
        }
        catch (error) {
            res.status(500).json({ message: "Error adding a new project_status_tasks" });
        }
    })

tasksRouter.route("/:id")
    .get(async (req, res) => {
        try {
            const project_status_tasks = await readTasks();
            const selectedTask = project_status_tasks.find(task => {
                return task.id == req.params.id;
            });
            if (!selectedTask) {
                return res
                    .status(404)
                    .json({ message: "Task with this ID not found" });
            }
            else {
                res.status(200).json(selectedTask);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error reading a task" });
        }
    })
    .put(async (req, res) => {
        const tasks = await readTasks();
        const selectedTask = tasks.find(task => {
            return task.id == req.params.id;
        });
        if (!selectedTask) {
            return res
                .status(404)
                .json({ message: "Task with this ID not found" });
        }
        else {
            try {
                await knex("project_status_tasks")
                    .where("id", req.params.id)
                    .update(req.body);
                res.status(200).json(req.body);
            }
            catch (e) {
                res.status(500).json({ message: "Error editing a task" });
            }
        }
    })
    .delete(async (req, res) => {
        const project_status_tasks = await readTasks();
        const selectedTask = project_status_tasks.find(task => {
            return task.id == req.params.id;
        });
        if (!selectedTask) {
            return res
                .status(404)
                .json({ message: "Task with this ID not found" });
        }
        else {
            try {
                await knex("project_status_tasks").where("id", req.params.id).del();
                res.status(204).json({ message: "The task has been deleted" });
            }
            catch (e) {
                res.status(500).json({ message: "Error deleting a task" });
            }
        }
    })



export default tasksRouter;
