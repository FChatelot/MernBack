"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
require("express-async-errors");
var _url = require("url");
var _posts = _interopRequireDefault(require("./routes/posts.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// j'ai utilisé babel pour pouvoir se passer de commonjs et utiliser ecs6

var _filename = (0, _url.fileURLToPath)(import.meta.url);
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