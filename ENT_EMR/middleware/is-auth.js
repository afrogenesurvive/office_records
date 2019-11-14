const jwt = require('jsonwebtoken');
// const util = require('util')

module.exports = (req, res, next) => {
  // console.log("here.....req object...", util.inspect(req));
  const authHeader = req.get('Authorization');
  console.log("authHeader.....", authHeader);
  if (!authHeader) {
    req.isAuth = false;
    console.log("is auth...???", req.isAuth);
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'MsBarbri');
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;

  next();
};
