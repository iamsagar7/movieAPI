module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Forbidden to to perform this action")
  next();
};