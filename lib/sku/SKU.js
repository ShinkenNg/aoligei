"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SKU = SKU;
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _lodash = _interopRequireDefault(require("lodash"));

var _util = require("../power-list/component/util");

require("./index.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function SKU(props) {
  var _useState = (0, _react.useState)(new Array()),
      _useState2 = _slicedToArray(_useState, 2),
      skuList = _useState2[0],
      setSkuList = _useState2[1];

  var dataSource = props.dataSource,
      onChange = props.onChange;
  (0, _util.useDeepCompareEffect)(function () {
    setSkuList(props.value || []);
  }, [props.value]);

  var valueChange = function valueChange(value) {
    if (_lodash.default.isFunction(onChange)) {
      onChange(value);
    }
  }; // 添加一个分类


  var addCategory = function addCategory() {
    var skuMaxLen = _lodash.default.get(dataSource, 'length');

    var newSkuList = _lodash.default.cloneDeep(skuList) || [];

    if (newSkuList.length >= skuMaxLen) {
      _message2.default.error('已达所有分类最大数量!!');

      return;
    }

    newSkuList.push({
      id: 0,
      name: '',
      children: []
    });
    setSkuList(newSkuList);
    valueChange(newSkuList);
  }; // 移除一个分类


  var deleteCategory = function deleteCategory(id) {
    var newSkuList = _lodash.default.cloneDeep(skuList) || [];

    var index = _lodash.default.findIndex(skuList, {
      id: id
    });

    _lodash.default.pullAt(newSkuList, index);

    setSkuList(newSkuList);
    valueChange(newSkuList);
  }; // 选择分类时


  var onSelectCategory = function onSelectCategory(item, index) {
    if (!item) {
      _message2.default.error('选择了非法规格!!');

      return;
    }

    var newSkuList = _lodash.default.cloneDeep(skuList) || [];

    _lodash.default.set(newSkuList, index, {
      id: item.id,
      name: item.name,
      children: []
    });

    setSkuList(newSkuList);
    valueChange(newSkuList);
  }; // 新建一个SKU


  var addSku = function addSku(categoryId) {
    var newSkuList = _lodash.default.cloneDeep(skuList) || [];

    var index = _lodash.default.findIndex(skuList, {
      id: categoryId
    });

    var dataItem = _lodash.default.find(dataSource, {
      id: categoryId
    });

    var newSkuItems = _lodash.default.get(newSkuList, "".concat(index, ".children")) || [];

    if (_lodash.default.get(dataItem, 'children.length') <= _lodash.default.get(newSkuItems, "length")) {
      _message2.default.error('已添加最大规格数量!!');

      return;
    }

    newSkuItems.push({
      id: 0,
      parent_id: categoryId,
      name: ''
    });

    _lodash.default.set(newSkuList, "".concat(index, ".children"), newSkuItems);

    setSkuList(newSkuList);
    valueChange(newSkuList);
  }; // 移除一个sku


  var deleteSku = function deleteSku(index, parentId) {
    var newSkuList = _lodash.default.cloneDeep(skuList) || [];

    var parentIndex = _lodash.default.findIndex(skuList, {
      id: parentId
    });

    var newSkuItems = _lodash.default.get(newSkuList, "".concat(parentIndex, ".children")) || [];

    _lodash.default.pullAt(newSkuItems, index);

    _lodash.default.set(newSkuList, "".concat(parentIndex, ".children"), newSkuItems);

    setSkuList(newSkuList);
    valueChange(newSkuList);
  };

  var onSelectSku = function onSelectSku(item, index, parentId) {
    if (!item) {
      _message2.default.error('选择了非法规格!!');

      return;
    }

    var newSkuList = _lodash.default.cloneDeep(skuList) || [];

    var parentIndex = _lodash.default.findIndex(skuList, {
      id: parentId
    });

    _lodash.default.set(newSkuList, "[".concat(parentIndex, "].children.[").concat(index, "]"), {
      id: item.id,
      parent_id: item.parent_id,
      name: item.name
    });

    setTimeout(function () {
      setSkuList(newSkuList);
    });
    valueChange(newSkuList);
  };

  return _react.default.createElement("div", {
    className: "powerSkuWrap"
  }, _react.default.createElement("div", {
    className: "addWrap"
  }, _lodash.default.map(skuList, function (item, index) {
    return _react.default.createElement("div", {
      key: "category_item_".concat(index),
      className: "skuItemWrap"
    }, _react.default.createElement(_select.default, {
      placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1\u89C4\u683C",
      className: "selectWrap",
      onChange: function onChange(id) {
        var valueItem = dataSource.find(function (n) {
          return n.id === id;
        });
        onSelectCategory(valueItem, _lodash.default.toInteger(index));
      },
      value: _lodash.default.get(skuList, "[".concat(index, "].id")) ? _lodash.default.get(skuList, "[".concat(index, "].id")) : null
    }, _lodash.default.map(dataSource, function (category) {
      return _react.default.createElement(_select.default.Option, {
        value: category.id,
        key: "category_".concat(category.id),
        disabled: _lodash.default.findIndex(skuList, {
          id: category.id
        }) > -1
      }, category.name);
    })), _react.default.createElement(_button.default, {
      type: "primary",
      className: "red-btn",
      onClick: function onClick() {
        deleteCategory(item.id);
      }
    }, "\u5220\u9664"), item.id > 0 && _react.default.createElement("div", {
      className: "selectSkuWrap"
    }, _react.default.createElement("div", {
      className: "childrenWrap"
    }, _lodash.default.map(item.children, function (skuItem, childIndex) {
      var dataItem = dataSource.find(function (n) {
        return n.id === skuItem.parent_id;
      });

      var value = _lodash.default.get(skuList, "".concat(index, ".children.").concat(childIndex, ".id"));

      return _react.default.createElement("div", {
        className: "childrenItem",
        key: "sku_item_".concat(skuItem.id)
      }, _react.default.createElement(_icons.DeleteOutlined, {
        className: "deleteItemIcon",
        onClick: function onClick() {
          deleteSku(_lodash.default.toInteger(childIndex), skuItem.parent_id);
        }
      }), _react.default.createElement(_select.default, {
        placeholder: "\u8BF7\u9009\u62E9\u89C4\u683C",
        onChange: function onChange(id) {
          var childItem = _lodash.default.find(_lodash.default.get(dataItem, 'children'), function (n) {
            return n.id === id;
          });

          onSelectSku(childItem, _lodash.default.toInteger(childIndex), skuItem.parent_id);
        },
        value: value
      }, _lodash.default.map(_lodash.default.get(dataItem, 'children'), function (sku) {
        return _react.default.createElement(_select.default.Option, {
          value: sku.id,
          key: "sku_".concat(sku.id),
          disabled: _lodash.default.findIndex(item.children, {
            id: sku.id
          }) > -1
        }, _react.default.createElement("span", {
          className: "skuName"
        }, sku.name));
      })));
    })), _react.default.createElement(_button.default, {
      className: "addSkuBtn",
      onClick: function onClick() {
        addSku(item.id);
      }
    }, "\u6DFB\u52A0")));
  }), _react.default.createElement(_button.default, {
    type: "primary",
    onClick: addCategory
  }, "\u6DFB\u52A0\u5546\u54C1\u89C4\u683C")));
}

var _default = SKU;
exports.default = _default;