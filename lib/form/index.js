"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BuildForm: true
};
Object.defineProperty(exports, "BuildForm", {
  enumerable: true,
  get: function get() {
    return _buildForm.BuildForm;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _buildForm.BuildForm;
  }
});

var _buildForm = require("./build-form");

Object.keys(_buildForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _buildForm[key];
    }
  });
});