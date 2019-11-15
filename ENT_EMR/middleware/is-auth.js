const jwt = require('jsonwebtoken');
const { pocketVariables } = require('../helpers/pocketVars');
// const util = require('util')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log("isAuth.authHeader:   ", authHeader);
  if (!authHeader) {
    req.isAuth = false;
    // console.log("is auth...???", req.isAuth);
    return next();
  }
  const token = authHeader.split(' ')[1];
  // console.log("isAuth token:   ", token);
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'MsBarbri');
    // console.log("isAuth.decodedToken:   ", decodedToken);
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

  pocketVariables.isAuth = req.isAuth;

  next();
};
