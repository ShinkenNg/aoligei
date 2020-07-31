import "antd/es/divider/style";
import _Divider from "antd/es/divider";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import toArray from "rc-util/es/Children/toArray";
import { ConfigContext } from 'antd/es/config-provider';
var spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};

var PowerSpace = function PowerSpace(props) {
  var _classNames;

  var _React$useContext = React.useContext(ConfigContext),
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

  var items = toArray(children);

  if (accessible || _.get(accessible, 'accessible')) {
    items = items.filter(function (n) {
      var key = _.get(accessible, 'key', 'accessible');

      var value = _.get(n, "props.".concat(key));

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
  var cn = classNames(prefixCls, "".concat(prefixCls, "-").concat(direction), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), directionConfig === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-align-").concat(mergedAlign), mergedAlign), _classNames), className);
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
    }, child, i !== end && divider && React.createElement(_Divider, {
      type: direction === 'vertical' ? 'horizontal' : 'vertical'
    }));
  }));
};

export default PowerSpace;