const { check, validationResult } = require("express-validator");

const validateBody = {
  addCart: [
    check("items").isArray({ min: 1 }),
    check("items.*.quantity").isInt(),
    check("items.*.productId").isInt(),
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
