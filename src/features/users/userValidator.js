const { check, validationResult } = require("express-validator");

const validateBody = {
  signIn: [
    check("email").isEmail().normalizeEmail().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password is required"),
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
