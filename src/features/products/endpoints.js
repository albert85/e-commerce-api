const express = require("express");
const {
  getAllProductsItem,
  addProductItem,
  updateProductItem,
  getAProductItem,
  removeProductItem
} = require("./service");
const { checkAuthStatus, checkToken } = require("../../helpers/auth");
const { validateBody, validate } = require("./productValidator");

productRouters = express.Router();

productRouters.get("/", checkAuthStatus, checkToken, getAllProductsItem);

productRouters.post(
  "/",
  checkAuthStatus,
  checkToken,
  validateBody.createProduct,
  validate,
  addProductItem
);

productRouters.put(
  "/:productId",
  checkAuthStatus,
  checkToken,
  validate,
  updateProductItem
);

productRouters.get("/:productId", checkAuthStatus, checkToken, getAProductItem);
productRouters.delete("/:productId", checkAuthStatus, checkToken, removeProductItem);

module.exports = { productRouters };
