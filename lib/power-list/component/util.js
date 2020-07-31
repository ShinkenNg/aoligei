"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeepCompareEffect = useDeepCompareEffect;
exports.getProgressStatus = getProgressStatus;
exports.default = get;
exports.useDebounceFn = useDebounceFn;
exports.reduceWidth = exports.ObjToMap = exports.removeObjectNull = exports.getLang = exports.usePrevious = exports.genColumnKey = exports.checkUndefinedOrNull = exports.parsingValueEnumToArray = exports.parsingText = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireWildcard(require("lodash"));

var _status = _interopRequireDefault(require("./status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 转化 text 和 valueEnum
 * 通过 type 来添加 ProjectStatusBadge
 * @param text
 * @param valueEnum
 * @param prue 纯净模式，不增加 status
 */
var parsingText = function parsingText(text, valueEnum, pure) {
  if (!valueEnum) {
    return text;
  }

  if (!valueEnum.has(text) && !valueEnum.has("".concat(text))) {
    return text;
  }

  var domText = valueEnum.get(text) || valueEnum.get("".concat(text));

  if (domText.status) {
    if (pure) {
      return domText.text;
    }

    var status = domText.status;
    var Status = _status.default[status || 'Init'];

    if (Status) {
      return _react.default.createElement(Status, null, domText.text);
    }
  }

  return domText.text || domText;
};
/**
 * 把 value 的枚举转化为数组
 * @param valueEnum
 */


exports.parsingText = parsingText;

var parsingValueEnumToArray = function parsingValueEnumToArray() {
  var valueEnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var enumArray = [];
  valueEnum.forEach(function (val, key) {
    if (!valueEnum.has(key) && !valueEnum.has("".concat(key))) {
      return;
    }

    var value = valueEnum.get(key) || valueEnum.get("".concat(key));

    if (!value) {
      return;
    }

    if (_typeof(value) === 'object' && _lodash.default.get(value, 'text')) {
      enumArray.push({
        text: _lodash.default.get(value, 'text'),
        value: key
      });
      return;
    }

    enumArray.push({
      text: value || '',
      value: key
    });
  });
  return enumArray;
};
/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */


exports.parsingValueEnumToArray = parsingValueEnumToArray;

var checkUndefinedOrNull = function checkUndefinedOrNull(value) {
  return value !== undefined && value !== null;
};

exports.checkUndefinedOrNull = checkUndefinedOrNull;

function deepCompareEquals(a, b) {
  return (0, _lodash.isEqual)(a, b);
}

function useDeepCompareMemoize(value) {
  var ref = (0, _react.useRef)(); // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(effect, dependencies) {
  (0, _react.useEffect)(effect, useDeepCompareMemoize(dependencies));
}

function getProgressStatus(text) {
  if (typeof text !== 'number') {
    return 'exception';
  }

  if (text === 100) {
    return 'success';
  }

  if (text < 100) {
    return 'active';
  } // magic


  if (text < 0) {
    return 'exception';
  }

  return 'normal';
}
/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */


var genColumnKey = function genColumnKey(key, dataIndex, index) {
  if (key) {
    return key;
  }

  if (!key && dataIndex) {
    if (Array.isArray(dataIndex)) {
      return dataIndex.join('-');
    }

    return dataIndex;
  }

  return "".concat(index);
};

exports.genColumnKey = genColumnKey;

function get(entity, path) {
  var tempPath = [''];

  if (typeof path === 'string') {
    if (path.includes('.')) {
      tempPath = path.split('.');
    } else {
      tempPath = [path];
    }
  }

  if (Array.isArray(path)) {
    tempPath = path;
  }

  var current = entity;

  for (var i = 0; i < tempPath.length; i += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = current[tempPath[i]];
  }

  return current;
}

var usePrevious = function usePrevious(state) {
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    ref.current = state;
  });
  return ref.current;
};

exports.usePrevious = usePrevious;

var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isMounted = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }

    return function () {
      return undefined;
    };
  }, deps);
};

function useDebounceFn(fn, deps, wait) {
  // eslint-disable-next-line no-underscore-dangle
  var _deps = Array.isArray(deps) ? deps : []; // eslint-disable-next-line no-underscore-dangle


  var _wait = typeof deps === 'number' ? deps : wait || 0;

  var timer = (0, _react.useRef)();
  var fnRef = (0, _react.useRef)(fn);
  fnRef.current = fn;
  var cancel = (0, _react.useCallback)(function () {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);
  var run = (0, _react.useCallback)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    cancel();
    timer.current = setTimeout(function () {
      fnRef.current.apply(fnRef, args);
    }, _wait);
  }, [_wait, cancel]);
  useUpdateEffect(function () {
    run();
    return cancel;
  }, [].concat(_toConsumableArray(_deps), [run]));
  (0, _react.useEffect)(function () {
    return cancel;
  }, []);
  return {
    run: run,
    cancel: cancel
  };
}

var getLang = function getLang() {
  var isNavigatorLanguageValid = typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  var browserLang = isNavigatorLanguageValid ? navigator.language.split('-').join('{{BaseSeparator}}') : '';
  var lang = typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_locale') : '';
  return lang || browserLang || '';
};
/**
 * 删除对象中所有的空值
 * @param obj
 */


exports.getLang = getLang;

var removeObjectNull = function removeObjectNull(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
/**
 * 获取类型的 type
 * @param obj
 */


exports.removeObjectNull = removeObjectNull;

function getType(obj) {
  // @ts-ignore
  var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
  if (type === 'string' && _typeof(obj) === 'object') return 'object'; // Let "new String('')" return 'object'

  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null

  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined

  return type;
}

var ObjToMap = function ObjToMap(value) {
  if (!value) {
    return value;
  }

  if (getType(value) === 'map') {
    return value;
  }

  return new Map(Object.entries(value));
};
/**
 * 减少 width，支持 string 和 number
 */


exports.ObjToMap = ObjToMap;

var reduceWidth = function reduceWidth(width) {
  if (width === undefined) {
    return width;
  }

  if (typeof width === 'string') {
    if (!width.includes('calc')) {
      return "calc(100% - ".concat(width, ")");
    }

    return width;
  }

  if (typeof width === 'number') {
    return width - 32;
  }

  return width;
};

exports.reduceWidth = reduceWidth;