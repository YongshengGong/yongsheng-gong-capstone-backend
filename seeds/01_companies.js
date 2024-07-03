/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('companies').del();
  await knex('companies').insert([
    {
      id: 1,
      company_name: `Peter's company`,
    },
    {
      id: 2,
      company_name: `Justin's company`,
    }
  ]);
};