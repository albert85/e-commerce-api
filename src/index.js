const express = require("express");
const mysql = require("mysql");
const swaggerUi = require("swagger-ui-express");
const { allRoutes } = require("./features/route");
const swaggerDocument = require('./swagger.json');

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "e_commerce_db",
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(allRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Port Running on port: ${port}`));
