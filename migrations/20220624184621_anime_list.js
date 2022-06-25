/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists("anime_list", (table)=> {
    table.increments();
    table.foreign("user_id").references("users.id");
    table.foreign("title_id").references("anime.id");
    table.integer("score");
    table.enum("progress", ["completed", "in_progress", "droped", "plan_to_watch"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable("anime_list");
};
