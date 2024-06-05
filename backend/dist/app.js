"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _index = _interopRequireDefault(require("./routes/index.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/", _index["default"]);
var _default = exports["default"] = app;