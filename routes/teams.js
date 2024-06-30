import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { readTeams } from "../controllers.js";

const knex = initKnex(configuration);
const teamRouter = express.Router();

teamRouter.route("/")
    .get(async (_req, res) => {
        try {
            const teams = await readTeams();
            res.status(200).json(teams);
        }
        catch (error) {
            res.status(500).json({ message: "Error reading teams" });
        }
    })
    .post(async (req, res) => {
        try {
            await knex("teams").insert(req.body);
            res.status(201).json(req.body);
        }
        catch (error) {
            res.status(500).json({ message: "Error adding a new team" });
        }
    })

teamRouter.route("/:id")
    .get(async (req, res) => {
        try {
            const teams = await readTeams();
            const selectedTeam = teams.find(team => {
                return team.id == req.params.id;
            });
            if (!selectedTeam) {
                return res
                    .status(404)
                    .json({ message: "Team with this ID not found" });
            }
            else {
                res.status(200).json(selectedTeam);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error reading a team" });
        }
    })
    .put(async (req, res) => {
        const teams = await readTeams();
        const selectedTeam = teams.find(team => {
            return team.id == req.params.id;
        });
        if (!selectedTeam) {
            return res
                .status(404)
                .json({ message: "Team with this ID not found" });
        }
        else {
            try {
                await knex("teams")
                    .where("id", req.params.id)
                    .update(req.body);
                res.status(200).json(req.body);
            }
            catch (e) {
                res.status(500).json({ message: "Error editing a team" });
            }
        }
    })
    .delete(async (req, res) => {
        const teams = await readTeams();
        const selectedTeam = teams.find(team => {
            return team.id == req.params.id;
        });
        if (!selectedTeam) {
            return res
                .status(404)
                .json({ message: "Team with this ID not found" });
        }
        else {
            try {
                await knex("teams").where("id", req.params.id).del();
                res.status(204).json({ message: "The team has been deleted" });
            }
            catch (e) {
                res.status(500).json({ message: "Error deleting a team" });
            }
        }
    })



export default teamRouter;
