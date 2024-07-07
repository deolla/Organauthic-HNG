
exports.up = function(knex) {
    return knex.schema.createTable('organisations', (table) => {
        table.uuid('orgId').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.string('description');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('organisations');
};
