"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController.mjs");
var _authMiddleware = require("../middlewares/authMiddleware.mjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
//configuration des routes de mon User
userRouter.post("/", _userController.registerUser);
userRouter.post("/auth", _userController.authUser);
userRouter.post("/logout", _userController.logoutUser);
userRouter.route("/profile").get(_authMiddleware.protect, _userController.getUserProfile).put(_authMiddleware.protect, _userController.updateUserProfile); //je connaissais pas cette methode pour chainer mais tres pratique
var _default = exports["default"] = userRouter;