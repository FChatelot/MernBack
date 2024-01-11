"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ratelimit = _interopRequireDefault(require("../middlewares/ratelimit.mjs"));
var _express = _interopRequireDefault(require("express"));
var _postController = require("../controllers/postController.mjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var postRouter = _express["default"].Router();
postRouter.route("/").get(_postController.getPosts).post(_ratelimit["default"], _postController.createPost);
postRouter.route("/:id").get(_postController.singlePost).patch(_postController.updatePost)["delete"](_postController.deletePost);
var _default = exports["default"] = postRouter;