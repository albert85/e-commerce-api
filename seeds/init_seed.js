const faker = require("faker");
const bcrypt = require('bcryptjs');

exports.seed = function (knex)  {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(async function () {
      return knex("user").insert([
        {
          id: 1,
          name: faker.name.firstName(),
          email: 'user@domain.com',
          role: "customer",
          password: await bcrypt.hash('Test123?', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: faker.name.firstName(),
          email: 'user1@domain.com',
          password: await bcrypt.hash('Test123?', 10),
          role: "vendor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: faker.name.firstName(),
          email: 'user2@domain.com',
          password: await bcrypt.hash('Test123?', 10),
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: faker.name.firstName(),
          email: 'user3@domain.com',
          password: await bcrypt.hash('Test123?', 10),
          role: "vendor",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    });
};


