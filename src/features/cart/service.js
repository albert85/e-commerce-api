const knex = require("../../db");
const { decodeToken, Response } = require("../../helpers/util");

async function addToCart(req, res) {
  try {
    const decodedToken = decodeToken(req.token);
    const {items} = req.body;

    items.map(async (eachCartItem) => {
      const cartTtems = {
        ...eachCartItem,
        userId: decodedToken.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      await knex("cart").insert(cartTtems);

    })

    const response = await getItemHelper(decodedToken.id);

    return Response(
      res,
      201,
      true,
      "Item was added to the cart successfully",
      response
    );
  } catch (error) {
    return Response(
      res,
      400,
      false,
      "Item was not added to the cart successfully",
      error
    );
  }
}

async function getItemHelper(userId) {
  const allItem = await knex("cart as c")
  .where('c.userId', userId)
  .leftJoin('product as p', 'p.id', 'c.productId')
  .leftJoin('user as u', 'u.id', 'c.userId')
  .select(['c.id', 'c.quantity', 'p.name', 'p.createdAt', 'p.updatedAt']);

  return allItem;
}

async function getCartDetails(req, res) {
  try {
    const decodedToken = decodeToken(req.token);

    const response = await getItemHelper(decodedToken.id);

    return Response(res, 200, true, "Card details successfully retrieved", response);
  } catch (error) {
    return Response(res, 400, false, "Card details was not successfully retrieved", error);

  }
}

async function removeItemFromCart(req,res) {
  try {
    const decodedToken = decodeToken(req.token);

    const {cartId} = req.params;

    const cartItem = await knex('cart').where({
      id: cartId
    }).first();

    if(!cartItem){
      return Response(res, 404, false, "Item was not found");
    }

    await knex('cart').where({
      id: cartId
    }).del();

    const allItems = await getItemHelper(decodedToken.id);

    return Response(
      res,
      200,
      true,
      "Item was successfully remove from cart",
      allItems
    );

  } catch (error) {
    return Response(
      res,
      400,
      false,
      "Item was not successfully remove from cart",
      error
    );
  }
}

module.exports = {
  addToCart,
  removeItemFromCart,
  getCartDetails
};
