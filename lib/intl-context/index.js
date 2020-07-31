"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIntl = useIntl;
exports.default = exports.createIntl = exports.IntlProvider = exports.IntlConsumer = exports.zhTWIntl = exports.msMYIntl = exports.ruRUIntl = exports.esESIntl = exports.jaJPIntl = exports.itITIntl = exports.viVNIntl = exports.zhCNIntl = exports.enUSIntl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _zh_CN = _interopRequireDefault(require("../locale/zh_CN"));

var _en_US = _interopRequireDefault(require("../locale/en_US"));

var _vi_VN = _interopRequireDefault(require("../locale/vi_VN"));

var _it_IT = _interopRequireDefault(require("../locale/it_IT"));

var _ja_JP = _interopRequireDefault(require("../locale/ja_JP"));

var _es_ES = _interopRequireDefault(require("../locale/es_ES"));

var _ru_RU = _interopRequireDefault(require("../locale/ru_RU"));

var _ms_MY = _interopRequireDefault(require("../locale/ms_MY"));

var _zh_TW = _interopRequireDefault(require("../locale/zh_TW"));

var _util = require("../power-list/component/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function get(source, path, defaultValue) {
  // a[3].b -> a.3.b
  var paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var result = source;
  var message = defaultValue; // eslint-disable-next-line no-restricted-syntax

  var _iterator = _createForOfIteratorHelper(paths),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var p = _step.value;
      message = Object(result)[p];
      result = Object(result)[p];

      if (message === undefined) {
        return defaultValue;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return message;
}
/**
 * 创建一个操作函数
 * @param locale
 * @param localeMap
 */


var createIntl = function createIntl(locale, localeMap) {
  return {
    getMessage: function getMessage(id, defaultMessage) {
      return get(localeMap, id, defaultMessage) || defaultMessage;
    },
    locale: locale,
    formatMessage: function formatMessage(id, valueMap, defaultMessage) {
      // 实现简单的可插入值的格式化语法
      var intlMsg = get(localeMap, id);
      var keys = Object.keys(valueMap);

      if (intlMsg && intlMsg.length > 0 && valueMap && Object.keys(valueMap).length > 0) {
        // 尝试进行变量变换
        var msg = intlMsg;
        keys.forEach(function (keyName) {
          var value = valueMap[keyName];
          var keyReg = new RegExp("{".concat(keyName, "}"), 'g');
          msg = intlMsg.replace(keyReg, value);
        });
        return msg;
      }

      return defaultMessage;
    }
  };
};

exports.createIntl = createIntl;
var zhCNIntl = createIntl('zh_CN', _zh_CN.default);
exports.zhCNIntl = zhCNIntl;
var enUSIntl = createIntl('en_US', _en_US.default);
exports.enUSIntl = enUSIntl;
var viVNIntl = createIntl('vi_VN', _vi_VN.default);
exports.viVNIntl = viVNIntl;
var itITIntl = createIntl('it_IT', _it_IT.default);
exports.itITIntl = itITIntl;
var jaJPIntl = createIntl('ja_JP', _ja_JP.default);
exports.jaJPIntl = jaJPIntl;
var esESIntl = createIntl('es_ES', _es_ES.default);
exports.esESIntl = esESIntl;
var ruRUIntl = createIntl('ru_RU', _ru_RU.default);
exports.ruRUIntl = ruRUIntl;
var msMYIntl = createIntl('ms_MY', _ms_MY.default);
exports.msMYIntl = msMYIntl;
var zhTWIntl = createIntl('zh_TW', _zh_TW.default);
exports.zhTWIntl = zhTWIntl;
var intlMap = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'js-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ru-RU': ruRUIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl
};

var IntlContext = _react.default.createContext(intlMap[(0, _util.getLang)() || ''] || zhCNIntl);

var IntlConsumer = IntlContext.Consumer,
    IntlProvider = IntlContext.Provider;
exports.IntlProvider = IntlProvider;
exports.IntlConsumer = IntlConsumer;

function useIntl() {
  var intl = (0, _react.useContext)(IntlContext);
  return intl;
}

var _default = IntlContext;
exports.default = _default;