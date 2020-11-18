const { Response, decodeToken } = require('../helpers/util');

const checkAuthStatus = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return next();
  }
  return Response(
    res,
    403,
    false,
    "Unauthorized Action, Please register or login",
  );
}

const checkToken = (req, res, next) => {
  const decodedToken = decodeToken(req.token);

  if (!decodedToken) {
    return Response(res, 401, false, "Token Expired, please re-login");
  }

  return next();
}

module.exports = {
  checkAuthStatus,
  checkToken
}

