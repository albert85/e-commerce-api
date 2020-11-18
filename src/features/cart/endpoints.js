const express = require("express");
const { checkAuthStatus, checkToken } = require("../../helpers/auth");
const { validateBody, validate } = require("./cartValidator");
const { addToCart, removeItemFromCart, getCartDetails } = require("./service");

const cartRouter = express.Router();

cartRouter.post(
  "/",
  checkAuthStatus,
  checkToken,
  validateBody.addCart,
  validate,
  addToCart
);

cartRouter.delete("/:cartId", checkAuthStatus, checkToken, removeItemFromCart);

cartRouter.get("/", checkAuthStatus, checkToken, getCartDetails);

module.exports = {
  cartRouter,
};
