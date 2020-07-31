"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function SearchInput(props) {
  var method = props.method,
      searchKey = props.searchKey,
      labelKey = props.labelKey,
      valueKey = props.valueKey,
      extraData = props.extraData,
      pageSize = props.pageSize,
      customOptionRender = props.customOptionRender,
      customOptionFilter = props.customOptionFilter,
      placeholder = props.placeholder,
      exclude = props.exclude;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      optionData = _useState2[0],
      setOptionData = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      keyword = _useState4[0],
      setKeyword = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var requestSearch = (0, _react.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var key, searchData, formData, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 默认搜索name
            key = searchKey || 'name';
            searchData = _objectSpread({}, extraData) || {};

            if (!_lodash.default.isEmpty(keyword)) {
              // 不为空设置搜索条件
              _lodash.default.set(searchData, key, keyword);
            } // 设置了分页条件


            if (_lodash.default.isNumber(pageSize) && pageSize > 0) {
              _lodash.default.set(searchData, 'pageSize', _lodash.default.toInteger(pageSize));
            }

            formData = {
              method: method || 'get'
            }; // 除了get传params，其它都传data

            if (formData.method === 'get') {
              _lodash.default.set(formData, 'params', searchData);
            } else {
              _lodash.default.set(formData, 'data', searchData);
            }

            setLoading(true); // const { data } = await request(url || '', formData);

            data = [];
            setLoading(false);
            setOptionData(data);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [keyword]);
  (0, _react.useEffect)(function () {
    requestSearch();
  }, [keyword]);

  var handleSearch = function handleSearch(value) {
    // 设置关键词，触发依赖此state的effect
    setKeyword(value);
  };

  var defaultRenderOptions = function defaultRenderOptions(originData) {
    var data = originData; // 需要过滤数据

    if (_lodash.default.isFunction(customOptionFilter)) {
      data = customOptionFilter(originData);
    } // 需要排除值


    if (exclude) {
      if (_lodash.default.isArray(exclude)) {
        data = _lodash.default.pickBy(data, function (n) {
          return !_lodash.default.includes(exclude, _lodash.default.get(n, _lodash.default.toString(valueKey)));
        });
      } else {
        data = _lodash.default.pickBy(data, function (n) {
          return _lodash.default.get(n, _lodash.default.toString(valueKey)) !== exclude;
        });
      }
    }

    var valuePath = valueKey || 'id';
    var labelPath = labelKey || searchKey || 'name';
    return _lodash.default.map(data, function (item) {
      return _react.default.createElement(_select.default.Option, {
        key: "".concat(_lodash.default.get(props, 'id'), "_").concat(_lodash.default.get(item, valuePath)),
        value: _lodash.default.get(item, valuePath) || props.value
      }, _lodash.default.get(item, labelPath));
    });
  };

  var renderOptions = customOptionRender || defaultRenderOptions;
  var options = renderOptions(optionData);
  return _react.default.createElement(_select.default, {
    showSearch: true,
    filterOption: false,
    defaultActiveFirstOption: false,
    notFoundContent: loading ? _react.default.createElement(_spin.default, {
      size: "small"
    }) : null,
    loading: loading,
    onSearch: handleSearch,
    onChange: props.onChange,
    value: props.value,
    id: props.id,
    placeholder: placeholder
  }, options);
}

var _default = SearchInput;
exports.default = _default;