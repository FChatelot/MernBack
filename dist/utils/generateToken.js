"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateToken = function generateToken(res, userId) {
  var token = _jsonwebtoken["default"].sign({
    userId: userId
  }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    //process.env.NODE_ENV !== "developpement"
    sameSite: "none",
    //"strict",
    maxAge: 1 * 24 * 60 * 60 * 1000 //en gros 1 journée
  });
};
var _default = exports["default"] = generateToken;