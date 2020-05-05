
exports.up = function(knex) {
  return knex.schema.createTable("Usuarios", function (table) {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 100).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Usuarios");
};
