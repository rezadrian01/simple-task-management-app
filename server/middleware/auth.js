const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();
exports.isAuth = async (req, res, next) => {
  try {
    const header = req.get("authorization")?.split(" ")[1];
    if (!header) {
      throw new Error();
    }
    let decodedToken;
    decodedToken = jwt.verify(header, process.env.SECRET_KEY);
    if (!decodedToken) {
      throw new Error();
    }
    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
  } catch (err) {
    req.isAuth = false;
    next();
  }
};
