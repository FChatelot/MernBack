"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.errorHandler = void 0;
//pour les routes qui n'existent pas
var notFound = exports.notFound = function notFound(req, res, next) {
  var error = new Error("Not Found = ".concat(req.originalUrl));
  res.status(404);
  next(error);
};
var errorHandler = exports.errorHandler = function errorHandler(err, req, res, next) {
  var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  var message = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    //erreur pour mongoose mais je sais pas si je vais encore l'utiliser.
    statusCode = 404;
    message = "Ressource not found";
  }
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};