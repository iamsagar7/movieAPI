const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send("No token Provided");
  try {
    const decode = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decode;
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
  next();
}
module.exports = auth;