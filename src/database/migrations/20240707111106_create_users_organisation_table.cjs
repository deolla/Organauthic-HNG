
exports.up = function(knex) {
    return knex.schema.createTable('users_organisation', table => {
        table.uuid('userId').notNullable().references('userId').inTable('users').onDelete('CASCADE');
        table.uuid('orgId').notNullable().references('orgId').inTable('organisations').onDelete('CASCADE');
        table.primary(['userId', 'orgId']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users_organisation');
};
