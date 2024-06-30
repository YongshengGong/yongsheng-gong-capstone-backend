import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import { readCompanies } from "../controllers.js";

const knex = initKnex(configuration);
const companyRouter = express.Router();

companyRouter.route("/")
    .get(async (_req, res) => {
        try {
            const companies = await readCompanies();
            res.status(200).json(companies);
        }
        catch (error) {
            res.status(500).json({ message: "Error reading companies" });
        }
    })
    .post(async (req, res) => {
        try {
            await knex("companies").insert(req.body);
            res.status(201).json(req.body);
        }
        catch (error) {
            res.status(500).json({ message: "Error adding a new company" });
        }
    })

companyRouter.route("/:id")
    .get(async (req, res) => {
        try {
            const companies = await readCompanies();
            const selectedCompany = companies.find(company => {
                return company.id == req.params.id;
            });
            if (!selectedCompany) {
                return res
                    .status(404)
                    .json({ message: "Company with this ID not found" });
            }
            else {
                res.status(200).json(selectedCompany);
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error reading a company" });
        }
    })
    .put(async (req, res) => {
        const companies = await readCompanies();
        const selectedCompany = companies.find(company => {
            return company.id == req.params.id;
        });
        if (!selectedCompany) {
            return res
                .status(404)
                .json({ message: "Company with this ID not found" });
        }
        else {
            try {
                await knex("companies")
                    .where("id", req.params.id)
                    .update(req.body);
                res.status(200).json(req.body);
            }
            catch (e) {
                res.status(500).json({ message: "Error editing a company" });
            }
        }
    })
    .delete(async (req, res) => {
        const companies = await readCompanies();
        const selectedCompany = companies.find(company => {
            return company.id == req.params.id;
        });
        if (!selectedCompany) {
            return res
                .status(404)
                .json({ message: "Company with this ID not found" });
        }
        else {
            try {
                await knex("companies").where("id", req.params.id).del();
                await knex("teams").where("company_id", req.params.id).del();
                await knex("members").where("company_id", req.params.id).del();
                res.status(204).json({ message: "The company has been deleted" });
            }
            catch (e) {
                res.status(500).json({ message: "Error deleting a company" });
            }
        }
    })



export default companyRouter;
