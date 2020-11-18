const knex = require("../../db");
const { Pagination, Response, decodeToken } = require("../../helpers/util");

async function getAllProductsItem(req, res) {
  try {
    const { pageNumber = 0, pageSize = 3 } = req.query;

    const itemLength = await knex("product").count("id as itemCount").first();
    const meta = Pagination(pageNumber, pageSize, itemLength.itemCount);

    const AllItems = await knex("product as p")
      .leftJoin("user as u", "u.id", "p.vendorId")
      .select([
        "p.id as id",
        "p.name",
        "p.price",
        "p.photoUrl",
        "p.description",
        "u.name as vendor",
        "p.createdAt",
        "p.updatedAt",
      ])
      .limit(meta.pageSize)
      .offset(meta.offset)
      .orderBy("price");

    return res.status(200).json({
      success: true,
      message: "Retriving was successful",
      data: AllItems,
      meta,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Retrieving all products was not success",
      success: false,
    });
  }
}

async function addProductItem(req, res) {
  try {
    const decodedToken = decodeToken(req.token);
    const payload = req.body;
    const productDetails = {
      ...payload,
      vendorId: decodedToken.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const productItem = await knex("product").insert(productDetails);
    const productAdded = await getProductById(productItem[0]);
    return Response(
      res,
      201,
      true,
      "Product successfully created",
      productAdded
    );
  } catch (error) {
    return Response(res, 400, false, "Product not successfully created", error);
  }
}

async function getProductById(productId) {
  const productAdded = await knex("product as p")
    .leftJoin("user as u", "u.id", "p.vendorId")
    .select([
      "p.id as id",
      "p.name",
      "p.price",
      "p.photoUrl",
      "p.description",
      "u.name as vendor",
      "p.createdAt",
      "p.updatedAt",
    ])
    .where("p.id", productId)
    .first();

  return productAdded;
}

async function updateProductItem(req, res) {
  try {
    const { productId } = req.params;
    const product = await knex("product").where({ id: productId }).first();

    if (!product) {
      return Response(res, 404, false, "No product was found");
    }

    const productDetails = {
      ...product,
      ...req.body,
    };

    await knex("product").update(productDetails).where({
      id: productId,
    });

    const data = await getProductById(productId);
    return Response(res, 200, true, "Product successfully updated", data);
  } catch (error) {
    return Response(res, 400, false, "Product not successfully updated", error);
  }
}

async function removeProductItem(req, res) {
  try {
    const { productId } = req.params;
    const product = await knex("product").where({ id: productId }).first();

    if (!product) {
      return Response(res, 404, false, "No product was found");
    }

    const productDetails = {
      ...product,
      ...req.body,
    };

    await knex("product")
      .where({
        id: productId,
      })
      .del();

    return Response(res, 200, true, "Product successfully deleted",product);
  } catch (error) {
    return Response(res, 400, false, "Product not successfully deleted", error);
  }
}

async function updateProductItem(req, res) {
  try {
    const { productId } = req.params;
    const product = await knex("product").where({ id: productId }).first();

    if (!product) {
      return Response(res, 404, false, "No product was found");
    }

    const productDetails = {
      ...product,
      ...req.body,
    };

    await knex("product").update(productDetails).where({
      id: productId,
    });

    const data = await getProductById(productId);
    return Response(res, 200, true, "Product successfully updated", data);
  } catch (error) {
    return Response(res, 400, false, "Product not successfully updated", error);
  }
}

async function getAProductItem(req, res) {
  try {
    const { productId } = req.params;
    const productItem = await knex("product")
      .where({
        id: productId,
      })
      .first();

    if (!productItem) {
      return Response(res, 404, false, "Item not found");
    }

    return Response(res, 200, true, "Item successfully retrieved", productItem);
  } catch (error) {
    return Response(res, 400, false, "Item not successfully retrieved", error);
  }
}

module.exports = {
  getAllProductsItem,
  addProductItem,
  updateProductItem,
  getAProductItem,
  removeProductItem,
};
