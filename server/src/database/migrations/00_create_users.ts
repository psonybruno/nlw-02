import Knex from 'knex';

export async function up(knex:Knex)
{
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').nullable();
        table.string('avatar').nullable();
        table.string('whastapp').nullable();
        table.string('bio').nullable();
    });
}

export async function down(knex:Knex)
{
    return knex.schema.dropTable('users');
}