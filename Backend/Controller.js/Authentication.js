require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModels");
const authentication = async (req, res, next) => {
  try {
    console.log("1");
    const header = req.headers["authorization"];
    console.log("1");
    const token = header.split(" ")[1];
    console.log("1");
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "No Token Found,Authoriztion Denied",
      });
    }
    console.log("1");
    //so basically we get the decoded id
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    console.log("1");
    const findUser = await User.findById(decoded.id);
    console.log("1");
    if (!findUser) {
      return res.status(400).json({
        error: true,
        message: "No User found,Authoriztion Denied",
      });
    }
    req.user = findUser;
    next();
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports = authentication;
