/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
    return knex.schema.createTable('members', (member) => {
      member.increments('id').primary();
      member
        .integer('company_id')
        .unsigned()
        .references('companies.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      member
        .integer('team_id')
        .unsigned()
        .references('teams.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      member.string('member_name').notNullable();
      member.string('member_title').notNullable();
      member.string('member_email').notNullable();
      member.string('member_phone').notNullable();
      member.string('member_address').notNullable();
      member.string('isManagerOrNot').notNullable();
      member.timestamp('created_at').defaultTo(knex.fn.now());
      member.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  export const down = function (knex) {
    return knex.schema.dropTable('members');
  };
  