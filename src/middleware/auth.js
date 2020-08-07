import jwt from "jsonwebtoken";
import config from "config";

const auth = (req, res, next) => {
  if (!req.get("Authorization") && !req.header("x-auth-token")) {
    return res
      .status(401)
      .json({ errorMessage: "Access denied. No token provided" });
  }

  const token =
    req.header("x-auth-token") || req.get("Authorization").split(" ")[1];
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, config.get("jwt_secret"));
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!verifiedToken) {
    return res.status(400).json({ errorMessage: "Invalid token provided" });
  }
  req.user = verifiedToken;
  next();
};
export default auth;
