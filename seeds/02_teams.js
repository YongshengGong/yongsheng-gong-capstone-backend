/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('teams').del();
  await knex('teams').insert([
    {
      id: 1,
      company_id: 1,
      team_name: "Boss (Default)"
    },
    {
      id: 2,
      company_id: 1,
       team_name: "Managers (Default)"
    },
    {
      id: 3,
      company_id: 1,
       team_name: "Pending (Default)"
    },
    {
      id: 4,
      company_id: 1,
       team_name: "Applicants"
    },
    {
      id: 5,
      company_id: 2,
      team_name: "Boss (Default)"
    },
    {
      id: 6,
      company_id: 2,
       team_name: "Managers (Default)"
    },
    {
      id: 7,
      company_id: 2,
       team_name: "Pending (Default)"
    },
    {
      id: 8,
      company_id: 2,
       team_name: "Applicants"
    }
  ]);
};