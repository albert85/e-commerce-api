const { check, validationResult } = require("express-validator");

const validateBody = {
  createProduct: [
    check("name").isLength({ min:2, max: 255}).withMessage("name is required"),
    check("photoUrl").isLength({ min: 2, max: 255}).withMessage("photourl is required"),
    check("description").isLength({ min: 2, max: 255}).withMessage("product description is required"),
    check("price").isInt().withMessage("price is required"),
  ],
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateBody,
  validate,
};
