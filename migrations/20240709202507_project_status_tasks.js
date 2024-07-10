/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
    return knex.schema.createTable('project_status_tasks', (task) => {
      task.increments('id').primary();
      task
        .integer('status_id')
        .unsigned()
        .references('project_status.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      task.string('task_name').notNullable();
      task.string('task_content').notNullable();
      task.timestamp('created_at').defaultTo(knex.fn.now());
      task.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  export const down = function (knex) {
    return knex.schema.dropTable('project_status_tasks');
  };