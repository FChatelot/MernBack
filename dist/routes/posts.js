"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ratelimit = _interopRequireDefault(require("../middlewares/ratelimit.mjs"));
var _express = _interopRequireDefault(require("express"));
var _postController = require("../controllers/postController.mjs");
var _authMiddleware = require("../middlewares/authMiddleware.mjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//Configuration des routes de mon blog.
var postRouter = _express["default"].Router();
postRouter.route("/").get(_authMiddleware.protect, _postController.getPosts).post(_authMiddleware.protect, _ratelimit["default"], _postController.createPost);
postRouter.route("/:id").get(_authMiddleware.protect, _postController.singlePost).patch(_authMiddleware.protect, _postController.updatePost)["delete"](_authMiddleware.protect, _postController.deletePost);
var _default = exports["default"] = postRouter;