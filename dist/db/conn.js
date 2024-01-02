"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongodb = require("mongodb");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var uri = process.env.STRING_URI || process.env.KEY || "mongodb+srv://florianchatelot:SK6H61sTcdIMWflr@cluster2.hht7nrq.mongodb.net/?retryWrites=true&w=majority";
var client = new _mongodb.MongoClient(uri, {
  serverApi: {
    version: _mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
var conn;
try {
  conn = await client.connect();
  console.log("db connectée");
} catch (e) {
  console.error(e);
}
var db = conn.db("Blog");
var _default = exports["default"] = db;