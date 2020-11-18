const faker = require("faker");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('product').del()
    .then(function () {
      // Inserts seed entries
      return knex("product")
      .del()
      .then(function () {
        return knex("product").insert([
          {
            id: 1,
            name: faker.commerce.product(),
            photoUrl: faker.image.image(),
            price: faker.commerce.price(),
            vendorId: 1,
            description: faker.commerce.productDescription(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: faker.commerce.product(),
            photoUrl: faker.image.image(),
            price: faker.commerce.price(),
            vendorId: 2,
            description: faker.commerce.productDescription(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: faker.commerce.product(),
            photoUrl: faker.image.image(),
            price: faker.commerce.price(),
            vendorId: 3,
            description: faker.commerce.productDescription(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 4,
            name: faker.commerce.product(),
            photoUrl: faker.image.image(),
            price: faker.commerce.price(),
            vendorId: 4,
            description: faker.commerce.productDescription(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
      })
    });
};
