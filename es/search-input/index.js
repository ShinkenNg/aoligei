import "antd/es/spin/style";
import _Spin from "antd/es/spin";
import "antd/es/select/style";
import _Select from "antd/es/select";

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

import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

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

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      optionData = _useState2[0],
      setOptionData = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      keyword = _useState4[0],
      setKeyword = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var requestSearch = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var key, searchData, formData, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 默认搜索name
            key = searchKey || 'name';
            searchData = _objectSpread({}, extraData) || {};

            if (!_.isEmpty(keyword)) {
              // 不为空设置搜索条件
              _.set(searchData, key, keyword);
            } // 设置了分页条件


            if (_.isNumber(pageSize) && pageSize > 0) {
              _.set(searchData, 'pageSize', _.toInteger(pageSize));
            }

            formData = {
              method: method || 'get'
            }; // 除了get传params，其它都传data

            if (formData.method === 'get') {
              _.set(formData, 'params', searchData);
            } else {
              _.set(formData, 'data', searchData);
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
  useEffect(function () {
    requestSearch();
  }, [keyword]);

  var handleSearch = function handleSearch(value) {
    // 设置关键词，触发依赖此state的effect
    setKeyword(value);
  };

  var defaultRenderOptions = function defaultRenderOptions(originData) {
    var data = originData; // 需要过滤数据

    if (_.isFunction(customOptionFilter)) {
      data = customOptionFilter(originData);
    } // 需要排除值


    if (exclude) {
      if (_.isArray(exclude)) {
        data = _.pickBy(data, function (n) {
          return !_.includes(exclude, _.get(n, _.toString(valueKey)));
        });
      } else {
        data = _.pickBy(data, function (n) {
          return _.get(n, _.toString(valueKey)) !== exclude;
        });
      }
    }

    var valuePath = valueKey || 'id';
    var labelPath = labelKey || searchKey || 'name';
    return _.map(data, function (item) {
      return React.createElement(_Select.Option, {
        key: "".concat(_.get(props, 'id'), "_").concat(_.get(item, valuePath)),
        value: _.get(item, valuePath) || props.value
      }, _.get(item, labelPath));
    });
  };

  var renderOptions = customOptionRender || defaultRenderOptions;
  var options = renderOptions(optionData);
  return React.createElement(_Select, {
    showSearch: true,
    filterOption: false,
    defaultActiveFirstOption: false,
    notFoundContent: loading ? React.createElement(_Spin, {
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

export default SearchInput;