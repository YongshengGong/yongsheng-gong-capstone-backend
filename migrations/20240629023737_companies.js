/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable('companies', (cohort) => {
      cohort.increments('id').primary();
      cohort.string('company_name').notNullable();
      cohort.timestamp('created_at').defaultTo(knex.fn.now());
      cohort.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
  };

  
  export const down = function (knex) {
    return knex.schema.dropTable('companies');
  };
  