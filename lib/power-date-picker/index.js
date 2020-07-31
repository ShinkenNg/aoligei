"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function PowerDatePicker(props) {
  var value = props.value,
      onChange = props.onChange,
      other = _objectWithoutProperties(props, ["value", "onChange"]);

  var time = value ? (0, _moment.default)(value) : undefined;

  var triggerChange = function triggerChange(_value, dateStr) {
    if (_lodash.default.isFunction(onChange)) {
      // 将参数反转， 忽略掉这个提示
      // @ts-ignore
      onChange(dateStr, _value);
    }
  };

  return _react.default.createElement(_datePicker.default, Object.assign({
    defaultValue: time,
    onChange: triggerChange
  }, other));
}

var _default = PowerDatePicker;
exports.default = _default;