import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { readMembers } from "../controllers.js";

const knex = initKnex(configuration);
const memberRouter = express.Router();

memberRouter.route("/")
    .get(async (_req, res) => {
        try {
            const members = await readMembers();
            res.status(200).json(members);
        }
        catch (error) {
            res.status(500).json({ message: "Error reading members" });
        }
    })
    .post(async (req, res) => {
        try {
            await knex("members").insert(req.body);
            res.status(201).json(req.body);
        }
        catch (error) {
            res.status(500).json({ message: "Error adding a new member" });
        }
    })

memberRouter.route("/:id")
    .get(async (req, res) => {
        try {
            const members = await readMembers();
            const selectedMember = members.find(member => {
                return member.id == req.params.id;
            });
            if (!selectedMember) {
                return res
                    .status(404)
                    .json({ message: "Member with this ID not found" });
            }
            else {
                res.status(200).json(selectedMember);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error reading a member" });
        }
    })
    .put(async (req, res) => {
        const members = await readMembers();
        const selectedMember = members.find(member => {
            return member.id == req.params.id;
        });
        if (!selectedMember) {
            return res
                .status(404)
                .json({ message: "Member with this ID not found" });
        }
        else {
            try {
                await knex("members")
                    .where("id", req.params.id)
                    .update(req.body);
                res.status(200).json(req.body);
            }
            catch (e) {
                res.status(500).json({ message: "Error editing a member" });
            }
        }
    })
    .delete(async (req, res) => {
        const members = await readMembers();
        const selectedMember = members.find(member => {
            return member.id == req.params.id;
        });
        if (!selectedMember) {
            return res
                .status(404)
                .json({ message: "Member with this ID not found" });
        }
        else {
            try {
                await knex("members").where("id", req.params.id).del();
                res.status(204).json({ message: "The member has been deleted" });
            }
            catch (e) {
                res.status(500).json({ message: "Error deleting a member" });
            }
        }
    })



export default memberRouter;

