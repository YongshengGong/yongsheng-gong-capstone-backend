/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
    return knex.schema.createTable('projects', (project) => {
      project.increments('id').primary();
      project
        .integer('team_id')
        .unsigned()
        .references('teams.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      project.string('project_name').notNullable();
      project.string('project_description').notNullable();
      project.timestamp('created_at').defaultTo(knex.fn.now());
      project.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  export const down = function (knex) {
    return knex.schema.dropTable('projects');
  };