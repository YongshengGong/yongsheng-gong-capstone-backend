import initKnex from "knex";
import configuration from "./knexfile.js";
const knex = initKnex(configuration);

const readCompanies = async() => {
      const data = await knex
        .from("companies")
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
          "teams.team_name"
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
          "members.isTeamLeadOrNot",
          "members.created_at"
        );
      return data;
  };

  const readProjects = async() => {
    const data = await knex
      .from("projects")
      .select(
        "projects.id",
        "projects.team_id",
        "projects.project_name",
        "projects.project_description"
      );
    return data;
};

  const readStatus = async() => {
    const data = await knex
      .from("project_status")
      .select(
        "project_status.id",
        "project_status.project_id",
        "project_status.status_name",
      );
    return data;
};

  const readTasks = async() => {
    const data = await knex
      .from("project_status_tasks")
      .select(
        "project_status_tasks.id",
        "project_status_tasks.status_id",
        "project_status_tasks.task_name",
        "project_status_tasks.task_content",
      );
    return data;
};

  export { readCompanies, readTeams, readMembers, readProjects, readStatus, readTasks };