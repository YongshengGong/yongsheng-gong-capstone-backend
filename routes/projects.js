import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { readProjects } from "../controllers.js";

const knex = initKnex(configuration);
const projectsRouter = express.Router();

projectsRouter.route("/")
    .get(async (_req, res) => {
        try {
            const projects = await readProjects();
            res.status(200).json(projects);
        }
        catch (error) {
            res.status(500).json({ message: "Error reading projects" });
        }
    })
    .post(async (req, res) => {
        try {
            const [insertId] = await knex("projects").insert(req.body);
            const newlyAddedProject = await knex("projects").where({ id: insertId }).first();
            res.status(201).json(newlyAddedProject);
        } catch (error) {
            res.status(500).json({ message: "Error adding a new project" });
        }
    })

projectsRouter.route("/:id")
    .get(async (req, res) => {
        try {
            const projects = await readProjects();
            const selectedProject = projects.find(project => {
                return project.id == req.params.id;
            });
            if (!selectedProject) {
                return res
                    .status(404)
                    .json({ message: "Project with this ID not found" });
            }
            else {
                res.status(200).json(selectedProject);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error reading a project" });
        }
    })
    .put(async (req, res) => {
        const projects = await readProjects();
        const selectedProject = projects.find(project => {
            return project.id == req.params.id;
        });
        if (!selectedProject) {
            return res
                .status(404)
                .json({ message: "Project with this ID not found" });
        }
        else {
            try {
                await knex("projects")
                    .where("id", req.params.id)
                    .update(req.body);
                res.status(200).json(req.body);
            }
            catch (e) {
                res.status(500).json({ message: "Error editing a project" });
            }
        }
    })
    .delete(async (req, res) => {
        const projects = await readProjects();
        const selectedProject = projects.find(project => {
            return project.id == req.params.id;
        });
        if (!selectedProject) {
            return res
                .status(404)
                .json({ message: "Project with this ID not found" });
        }
        else {
            try {
                await knex("projects").where("id", req.params.id).del();
                res.status(204).json({ message: "The project has been deleted" });
            }
            catch (e) {
                res.status(500).json({ message: "Error deleting a project" });
            }
        }
    })



export default projectsRouter;
