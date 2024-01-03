"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  limit: 1,
  message: "Vous avez dépassé le nombre de requete limite par minute",
  headers: true
});
var _default = exports["default"] = limiter;