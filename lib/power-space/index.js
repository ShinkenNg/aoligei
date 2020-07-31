"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/divider/style");

var _divider = _interopRequireDefault(require("antd/lib/divider"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _configProvider = require("antd/es/config-provider");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};

var PowerSpace = function PowerSpace(props) {
  var _classNames;

  var _React$useContext = React.useContext(_configProvider.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      space = _React$useContext.space,
      directionConfig = _React$useContext.direction;

  var _props$size = props.size,
      size = _props$size === void 0 ? (space === null || space === void 0 ? void 0 : space.size) || 'small' : _props$size,
      align = props.align,
      className = props.className,
      children = props.children,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'horizontal' : _props$direction,
      customizePrefixCls = props.prefixCls,
      _props$divider = props.divider,
      divider = _props$divider === void 0 ? false : _props$divider,
      _props$accessible = props.accessible,
      accessible = _props$accessible === void 0 ? false : _props$accessible,
      otherProps = _objectWithoutProperties(props, ["size", "align", "className", "children", "direction", "prefixCls", "divider", "accessible"]);

  var items = (0, _toArray.default)(children);

  if (accessible || _lodash.default.get(accessible, 'accessible')) {
    items = items.filter(function (n) {
      var key = _lodash.default.get(accessible, 'key', 'accessible');

      var value = _lodash.default.get(n, "props.".concat(key));

      if (value === undefined) {
        // 未定义的可能未被授权组件包裹
        return true;
      }

      return value;
    });
  }

  var len = items.length;

  if (len === 0) {
    return null;
  }

  var mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  var prefixCls = getPrefixCls('space', customizePrefixCls);
  var cn = (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(direction), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), directionConfig === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-align-").concat(mergedAlign), mergedAlign), _classNames), className);
  var itemClassName = "".concat(prefixCls, "-item");
  var marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';
  var end = len - 1;
  return React.createElement("div", Object.assign({
    className: cn
  }, otherProps), items.map(function (child, i) {
    return React.createElement("div", {
      className: itemClassName,
      // eslint-disable-next-line react/no-array-index-key
      key: "".concat(itemClassName, "-").concat(i),
      style: i === end || divider ? {} : _defineProperty({}, direction === 'vertical' ? 'marginBottom' : marginDirection, typeof size === 'string' ? spaceSize[size] : size)
    }, child, i !== end && divider && React.createElement(_divider.default, {
      type: direction === 'vertical' ? 'horizontal' : 'vertical'
    }));
  }));
};

var _default = PowerSpace;
exports.default = _default;