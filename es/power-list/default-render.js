import "antd/es/avatar/style";
import _Avatar from "antd/es/avatar";
import "antd/es/progress/style";
import _Progress from "antd/es/progress";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import React from 'react';
import moment from 'moment';
import Percent from './component/percent';
import IndexColumn from './component/index-column';
import { getProgressStatus } from './component/util';
var moneyIntl = new Intl.NumberFormat('zh-Hans-CN', {
  currency: 'CNY',
  style: 'currency',
  minimumFractionDigits: 2
});
var enMoneyIntl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
var ruMoneyIntl = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB'
});
var msMoneyIntl = new Intl.NumberFormat('ms-MY', {
  style: 'currency',
  currency: 'MYR'
});
/**
 * render valueType object
 * @param text string | number
 * @param value PowerColumnsValueObjectType
 */

var defaultRenderTextByObject = function defaultRenderTextByObject(text, value) {
  if (value.type === 'progress') {
    return React.createElement(_Progress, {
      size: "small",
      percent: text,
      status: value.status || getProgressStatus(text)
    });
  }

  if (value.type === 'money') {
    // english
    if (value.locale === 'en_US') {
      return enMoneyIntl.format(text);
    } // russian


    if (value.locale === 'ru_RU') {
      return ruMoneyIntl.format(text);
    } // malay


    if (value.locale === 'ms_MY') {
      return msMoneyIntl.format(text);
    }

    return moneyIntl.format(text);
  }

  if (value.type === 'percent') {
    return React.createElement(Percent, {
      value: text,
      showSymbol: value.showSymbol,
      precision: value.precision
    });
  }

  return text;
};
/**
 * 根据不同的类型来转化数值
 * @param text
 * @param valueType
 */


var defaultRenderText = function defaultRenderText(text, valueType, index, item, columnEmptyText) {
  // when valueType == function
  // item always not null
  if (typeof valueType === 'function' && item) {
    var value = valueType(item);

    if (typeof value === 'string') {
      return defaultRenderText(text, value, index);
    }

    if (_typeof(value) === 'object') {
      return defaultRenderTextByObject(text, value);
    }
  }
  /**
   * 如果是金额的值
   */


  if (valueType === 'money' && (text || text === 0)) {
    /**
     * 这个 api 支持三星和华为的手机
     */
    if (typeof text === 'string') {
      return moneyIntl.format(parseFloat(text));
    }

    return moneyIntl.format(text);
  }
  /**
   *如果是日期的值
   */


  if (valueType === 'date' && text) {
    return moment(text).format('YYYY-MM-DD');
  }
  /**
   *如果是日期范围的值
   */


  if (valueType === 'dateRange' && text && Array.isArray(text) && text.length === 2) {
    // 值不存在的时候显示 "-"
    var _text = _slicedToArray(text, 2),
        startText = _text[0],
        endText = _text[1];

    return React.createElement("div", null, React.createElement("div", null, startText ? moment(startText).format('YYYY-MM-DD') : '-'), React.createElement("div", null, endText ? moment(endText).format('YYYY-MM-DD') : '-'));
  }
  /**
   *如果是日期加时间类型的值
   */


  if (valueType === 'dateTime' && text) {
    return moment(text).format('YYYY-MM-DD HH:mm:ss');
  }
  /**
   *如果是日期加时间类型的值的值
   */


  if (valueType === 'dateTimeRange' && text && Array.isArray(text) && text.length === 2) {
    // 值不存在的时候显示 "-"
    var _text2 = _slicedToArray(text, 2),
        _startText = _text2[0],
        _endText = _text2[1];

    return React.createElement("div", null, React.createElement("div", null, _startText ? moment(_startText).format('YYYY-MM-DD HH:mm:ss') : '-'), React.createElement("div", null, _endText ? moment(_endText).format('YYYY-MM-DD HH:mm:ss') : '-'));
  }
  /**
   *如果是时间类型的值
   */


  if (valueType === 'time' && text) {
    return moment(text).format('HH:mm:ss');
  }

  if (valueType === 'index') {
    return React.createElement(IndexColumn, null, index + 1);
  }

  if (valueType === 'indexBorder') {
    return React.createElement(IndexColumn, {
      border: true
    }, index + 1);
  }

  if (valueType === 'progress') {
    return React.createElement(_Progress, {
      size: "small",
      percent: text,
      status: getProgressStatus(text)
    });
  }
  /** 百分比, 默认展示符号, 不展示小数位 */


  if (valueType === 'percent') {
    return React.createElement(Percent, {
      value: text
    });
  }

  if (valueType === 'avatar' && typeof text === 'string') {
    return React.createElement(_Avatar, {
      src: text,
      size: 22,
      shape: "circle"
    });
  }

  if (valueType === 'code' && text) {
    return React.createElement("pre", {
      style: {
        padding: 16,
        overflow: 'auto',
        fontSize: '85%',
        lineHeight: 1.45,
        backgroundColor: '#f6f8fa',
        borderRadius: 3
      }
    }, React.createElement("code", null, text));
  }

  if (columnEmptyText) {
    if (typeof text !== 'boolean' && typeof text !== 'number' && !text) {
      return typeof columnEmptyText === 'string' ? columnEmptyText : '-';
    }
  }

  return text;
};

export default defaultRenderText;