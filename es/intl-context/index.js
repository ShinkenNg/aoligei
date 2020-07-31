function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { useContext } from 'react';
import zhCN from '../locale/zh_CN';
import enUS from '../locale/en_US';
import viVN from '../locale/vi_VN';
import itIT from '../locale/it_IT';
import jaJP from '../locale/ja_JP';
import esES from '../locale/es_ES';
import ruRU from '../locale/ru_RU';
import msMY from '../locale/ms_MY';
import zhTW from '../locale/zh_TW';
import { getLang } from '../power-list/component/util';

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

var zhCNIntl = createIntl('zh_CN', zhCN);
var enUSIntl = createIntl('en_US', enUS);
var viVNIntl = createIntl('vi_VN', viVN);
var itITIntl = createIntl('it_IT', itIT);
var jaJPIntl = createIntl('ja_JP', jaJP);
var esESIntl = createIntl('es_ES', esES);
var ruRUIntl = createIntl('ru_RU', ruRU);
var msMYIntl = createIntl('ms_MY', msMY);
var zhTWIntl = createIntl('zh_TW', zhTW);
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
export { enUSIntl, zhCNIntl, viVNIntl, itITIntl, jaJPIntl, esESIntl, ruRUIntl, msMYIntl, zhTWIntl };
var IntlContext = React.createContext(intlMap[getLang() || ''] || zhCNIntl);
var IntlConsumer = IntlContext.Consumer,
    IntlProvider = IntlContext.Provider;
export { IntlConsumer, IntlProvider, createIntl };
export function useIntl() {
  var intl = useContext(IntlContext);
  return intl;
}
export default IntlContext;