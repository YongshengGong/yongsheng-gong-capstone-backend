import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { readMembers, readTeams } from "../controllers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const knex = initKnex(configuration);
const memberRouter = express.Router();
dotenv.config();


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
            const teams = await readTeams();
            let user = null;
            if (teams.find(team => team.id == req.body.team_id).team_name == "Applicants") {
                user = req.body;
                await knex("members").insert(user);
                res.status(201).json(user);
            }
            else {
                let hashedPassword = bcrypt.hashSync(req.body.password, 6);
                user = { ...req.body, password: hashedPassword };
                await knex("members").insert(user);
                res.status(201).json(user);
            }
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
                let user = { ...req.body, password: bcrypt.hashSync(req.body.password, 6) };
                await knex("members")
                    .where("id", req.params.id)
                    .update(user);
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

memberRouter.route("/login")
    .post(async (req, res) => {
        const members = await readMembers();
        const selectedMember = members.find(member => {
            return (member.username == req.body.username) && (bcrypt.compareSync(req.body.password, member.password));
        });
        if (!selectedMember) {
            return res
                .status(404)
                .json({ message: "Invalid username or password" });
        }
        else {
            let token = jwt.sign(selectedMember, process.env.JWT_SECRET, { expiresIn: "12h" });
            res.status(200).json({ token: token });
        }
    })




export default memberRouter;

