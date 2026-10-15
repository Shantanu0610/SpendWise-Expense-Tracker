
const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is required."
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.sub) {
      return res.status(401).json({
        message: "Invalid authentication token."
      });
    }

    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication token."
    });
  }
};
