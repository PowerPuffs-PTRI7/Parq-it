const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

cookieController = {};

// cookieController.setCookie = (req, res, next) => {
//   const { username } = req.body;
//   const token = generateAuthToken(username);
//   res.cookie("access_token", token, {
//     httpOnly: true,
//   });
//   return next();
// };

cookieController.setCookie = (req, res, next) => {
  const { username } = req.body;
  const token = generateAuthToken(username);
  res.locals.access_token = token;
  return next();
};

//authorization:
//for FRONTEND: send token in Authorization header: `authorization: Bearer: ${accessToken}`

cookieController.verifyCookie = (req, res, next) => {
  if (typeof req.headers.authorization !== "string") {
    return res.status(400).send("auth header is not a string");
  }
  const token = req.headers.authorization.split(" ")[1];
  // if (token === null) {
  //   console.log("no token found!");
  //   return res.status(403).send("Cannot verify user");
  // }
  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    if (err) {
      return next({
        log: "error in verify login",
        status: 403,
        message: err,
      });
    }
    res.locals.username = decoded.username;
    return next();
  });
};

cookieController.verifyCookie2 = (req, res, next) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    if (err) {
      return next({
        log: "error in verify login",
        status: 403,
        message: err,
      });
    }
    res.locals.username = decoded.username;
    return next();
  });
};

//clear cookie on logout:
// cookieController.logout = (req, res, next) => {
//   console.log("Hit cookie controller");
//   sessionStorage.removeItem("access_token");
//   return next();
// };

function generateAuthToken(username) {
  const token = jwt.sign({ username: username }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
}

module.exports = cookieController;
