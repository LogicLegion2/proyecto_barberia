"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;
var _promise = require("mysql2/promise.js");
var pool = exports.pool = (0, _promise.createPool)({
  host: process.env.MYSQL_HOST || "",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || "",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || ""
});