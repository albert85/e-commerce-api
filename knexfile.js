// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "e_commerce_db",
      user: "root",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "e_commerce_db",
      user: "root",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "e_commerce_db",
      user: "root",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  seeds: {
    directory: "./seeds",
  },
};
