import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { readStatus } from "../controllers.js";

const knex = initKnex(configuration);
const statusRouter = express.Router();

statusRouter.route("/")
    .get(async (_req, res) => {
        try {
            const project_status = await readStatus();
            res.status(200).json(project_status);
        }
        catch (error) {
            res.status(500).json({ message: "Error reading project_status" });
        }
    })
    .post(async (req, res) => {
        try {
            await knex("project_status").insert(req.body);
            res.status(201).json(req.body);
        }
        catch (error) {
            res.status(500).json({ message: "Error adding a new project_status" });
        }
    })

statusRouter.route("/:id")
    .get(async (req, res) => {
        try {
            const project_status = await readStatus();
            const selectedStatus = project_status.find(status => {
                return status.id == req.params.id;
            });
            if (!selectedStatus) {
                return res
                    .status(404)
                    .json({ message: "Status with this ID not found" });
            }
            else {
                res.status(200).json(selectedStatus);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error reading a status" });
        }
    })
    .delete(async (req, res) => {
        const project_status = await readStatus();
        const selectedStatus = project_status.find(status => {
            return status.id == req.params.id;
        });
        if (!selectedStatus) {
            return res
                .status(404)
                .json({ message: "Status with this ID not found" });
        }
        else {
            try {
                await knex("project_status").where("id", req.params.id).del();
                res.status(204).json({ message: "The status has been deleted" });
            }
            catch (e) {
                res.status(500).json({ message: "Error deleting a status" });
            }
        }
    })



export default statusRouter;
