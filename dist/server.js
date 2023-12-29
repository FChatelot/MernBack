"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _url = _interopRequireWildcard(require("url"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
require("express-async-errors");
var _posts = _interopRequireDefault(require("./routes/posts.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// j'ai utilisé babel pour pouvoir se passer de commonjs et utiliser ecs6

var _filename = (0, _url.fileURLToPath)(_url["default"].pathToFileURL(_filename).toString());
var _dirname = _path["default"].dirname(_filename);
var app = (0, _express["default"])(); //application qui s'appuie sur node et sur express pour son déploiement backend.
var port = process.env.PORT || 4000; // port du serveur

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use("/post", _posts["default"]);
app.use(function (err, _req, res, next) {
  res.status(500).send("Uh oh! An unexpected error occured.");
});
var public_path = _path["default"].join(_dirname, '../build'); //j'utilise path et express static pour communiquer avec le build de production et les fichiers statiques.
app.use(_express["default"]["static"](public_path));
app.get("*", function (_, res) {
  res.sendFile(_path["default"].join(public_path, "index.html"));
});
//Serveur déployé
app.listen(port, function () {
  console.log("Server d\xE9marr\xE9 avec succes sur le port: ".concat(port));
});