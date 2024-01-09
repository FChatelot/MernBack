"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authUser = void 0;
//@desc Auth user/set token
//route POST /api/users/auth
//@acces Public
var authUser = exports.authUser = function authUser(req, res) {
  res.status(200).json({
    message: "Authe User"
  });
};