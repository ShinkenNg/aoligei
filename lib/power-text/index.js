"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PowerText(props) {
  return _react.default.createElement("span", {
    className: 'powerText'
  }, props.buildValue || props.value || '');
}

var _default = PowerText;
exports.default = _default;