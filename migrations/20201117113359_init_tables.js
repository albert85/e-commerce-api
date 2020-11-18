const knex = require('../src/db');

exports.up = function (Knex) {
  return knex.schema
    .hasTable("user")
    .then((exist) => {
      if (!exist) {
        return knex.schema.createTable("user", function (table) {
          table.increments("id").primary();
          table.string("name", 255).notNullable();
          table.string("password", 255).notNullable();
          table.string("email", 255).notNullable().unique();
          table.string("role", 255).notNullable();
          table.date("createdAt");
          table.date("updatedAt");
        });
      }
    })
    .then(() => {
      return knex.schema
        .hasTable("product")
        .then((exist) => {
          if (!exist) {
            return knex.schema.createTable("product", function (table) {
              table.increments("id").primary();
              table.string("name").notNullable();
              table.string("photoUrl").notNullable();
              table.integer("price").notNullable();
              table.integer("vendorId").unsigned().references("id").inTable("user").index();
              table.string("description", 255).notNullable();
              table.date("createdAt");
              table.date("updatedAt");
            });
          }
        })
        .then(() => {
          return knex.schema.hasTable("cart").then((exist) => {
            if (!exist) {
              return knex.schema.createTable("cart", function (table) {
                table.increments("id").primary();
                table.integer("quantity").notNullable();
                table.integer("userId").unsigned().references("id").inTable("user").index();
                table.integer("productId").unsigned().references("id").inTable("product").index();
                table.date("createdAt");
                table.date("updatedAt");
              });
            }
          });
        });
    });
};

exports.down = function (Knex) {
  return knex.schema
    .dropTableIfExists("cart")
    .dropTableIfExists("product")
    .dropTableIfExists("user");
};
