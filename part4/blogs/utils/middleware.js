const logger = require("./logger");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  next(error);
};

module.exports = { errorHandler, tokenExtractor };
