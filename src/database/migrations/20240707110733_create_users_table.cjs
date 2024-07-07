
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('userId').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('phone');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
}