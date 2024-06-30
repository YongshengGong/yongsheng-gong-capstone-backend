import initKnex from "knex";
import configuration from "./knexfile.js";
const knex = initKnex(configuration);

const readCompanies = async() => {
      const data = await knex
        .from("warehouses")
        .select(
          "companies.id",
          "companies.company_name"
        );
      return data;
  };

const readTeams = async() => {
      const data = await knex
        .from("teams")
        .select(
          "teams.id",
          "teams.company_id",
          "teams.company_name"
        );
      return data;
  };

const readMembers = async() => {
      const data = await knex
        .from("members")
        .select(
          "members.id",
          "members.company_id",
          "members.team_id",
          "members.username",
          "members.password",
          "members.member_name",
          "members.member_title",
          "members.member_email",
          "members.member_phone",
          "members.member_address",
          "members.isBossOrNot",
          "members.isManagerOrNot",
          "members.isTeamLeadOrNot",
          "members.created_at"
        );
      return data;
  };

  export { readCompanies, readTeams, readMembers };