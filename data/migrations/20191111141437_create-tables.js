
exports.up = function(knex) {
    return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("name", 128).notNullable();
      table.text("password").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("users")
};
