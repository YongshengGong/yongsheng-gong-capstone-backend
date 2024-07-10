/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
    return knex.schema.createTable('project_status', (status) => {
      status.increments('id').primary();
      status
        .integer('project_id')
        .unsigned()
        .references('projects.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      status.string('status_name').notNullable();
      status.timestamp('created_at').defaultTo(knex.fn.now());
      status.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  export const down = function (knex) {
    return knex.schema.dropTable('project_status');
  };