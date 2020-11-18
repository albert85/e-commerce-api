
const jwt = require('jsonwebtoken');

const Pagination = (pageNumber, pageSize, total) => {
  const totalPage = Math.ceil(total / pageSize);

  const page = pageNumber > totalPage ? totalPage : pageNumber;

  const offset = pageSize * pageNumber;

  const meta = {
    pageSize,
    page,
    totalPage,
    total,
    offset,
  };
  return meta;
};

const generateToken = (payload) => {
  return jwt.sign(payload,'ecommerce', {expiresIn: "10h"});
};

const decodeToken = token => jwt.verify(token, 'ecommerce');


const Response = (res, statusCode, success, message, data, token) => res.status(statusCode).json({
  success,
  message,
  token,
  data,
});

module.exports = {
  Pagination,
  generateToken,
  Response,
  decodeToken
};
