/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
    return knex.schema.createTable('teams', (team) => {
      team.increments('id').primary();
      team
        .integer('company_id')
        .unsigned()
        .references('companies.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      team.string('team_name').notNullable();
      team.timestamp('created_at').defaultTo(knex.fn.now());
      team.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  export const down = function (knex) {
    return knex.schema.dropTable('teams');
  };
  