import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/select/style";
import _Select from "antd/es/select";
import "antd/es/message/style";
import _message from "antd/es/message";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useDeepCompareEffect } from '../power-list/component/util';
import './index.less';
export function SKU(props) {
  var _useState = useState(new Array()),
      _useState2 = _slicedToArray(_useState, 2),
      skuList = _useState2[0],
      setSkuList = _useState2[1];

  var dataSource = props.dataSource,
      onChange = props.onChange;
  useDeepCompareEffect(function () {
    setSkuList(props.value || []);
  }, [props.value]);

  var valueChange = function valueChange(value) {
    if (_.isFunction(onChange)) {
      onChange(value);
    }
  }; // 添加一个分类


  var addCategory = function addCategory() {
    var skuMaxLen = _.get(dataSource, 'length');

    var newSkuList = _.cloneDeep(skuList) || [];

    if (newSkuList.length >= skuMaxLen) {
      _message.error('已达所有分类最大数量!!');

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
    var newSkuList = _.cloneDeep(skuList) || [];

    var index = _.findIndex(skuList, {
      id: id
    });

    _.pullAt(newSkuList, index);

    setSkuList(newSkuList);
    valueChange(newSkuList);
  }; // 选择分类时


  var onSelectCategory = function onSelectCategory(item, index) {
    if (!item) {
      _message.error('选择了非法规格!!');

      return;
    }

    var newSkuList = _.cloneDeep(skuList) || [];

    _.set(newSkuList, index, {
      id: item.id,
      name: item.name,
      children: []
    });

    setSkuList(newSkuList);
    valueChange(newSkuList);
  }; // 新建一个SKU


  var addSku = function addSku(categoryId) {
    var newSkuList = _.cloneDeep(skuList) || [];

    var index = _.findIndex(skuList, {
      id: categoryId
    });

    var dataItem = _.find(dataSource, {
      id: categoryId
    });

    var newSkuItems = _.get(newSkuList, "".concat(index, ".children")) || [];

    if (_.get(dataItem, 'children.length') <= _.get(newSkuItems, "length")) {
      _message.error('已添加最大规格数量!!');

      return;
    }

    newSkuItems.push({
      id: 0,
      parent_id: categoryId,
      name: ''
    });

    _.set(newSkuList, "".concat(index, ".children"), newSkuItems);

    setSkuList(newSkuList);
    valueChange(newSkuList);
  }; // 移除一个sku


  var deleteSku = function deleteSku(index, parentId) {
    var newSkuList = _.cloneDeep(skuList) || [];

    var parentIndex = _.findIndex(skuList, {
      id: parentId
    });

    var newSkuItems = _.get(newSkuList, "".concat(parentIndex, ".children")) || [];

    _.pullAt(newSkuItems, index);

    _.set(newSkuList, "".concat(parentIndex, ".children"), newSkuItems);

    setSkuList(newSkuList);
    valueChange(newSkuList);
  };

  var onSelectSku = function onSelectSku(item, index, parentId) {
    if (!item) {
      _message.error('选择了非法规格!!');

      return;
    }

    var newSkuList = _.cloneDeep(skuList) || [];

    var parentIndex = _.findIndex(skuList, {
      id: parentId
    });

    _.set(newSkuList, "[".concat(parentIndex, "].children.[").concat(index, "]"), {
      id: item.id,
      parent_id: item.parent_id,
      name: item.name
    });

    setTimeout(function () {
      setSkuList(newSkuList);
    });
    valueChange(newSkuList);
  };

  return React.createElement("div", {
    className: "powerSkuWrap"
  }, React.createElement("div", {
    className: "addWrap"
  }, _.map(skuList, function (item, index) {
    return React.createElement("div", {
      key: "category_item_".concat(index),
      className: "skuItemWrap"
    }, React.createElement(_Select, {
      placeholder: "\u8BF7\u9009\u62E9\u5546\u54C1\u89C4\u683C",
      className: "selectWrap",
      onChange: function onChange(id) {
        var valueItem = dataSource.find(function (n) {
          return n.id === id;
        });
        onSelectCategory(valueItem, _.toInteger(index));
      },
      value: _.get(skuList, "[".concat(index, "].id")) ? _.get(skuList, "[".concat(index, "].id")) : null
    }, _.map(dataSource, function (category) {
      return React.createElement(_Select.Option, {
        value: category.id,
        key: "category_".concat(category.id),
        disabled: _.findIndex(skuList, {
          id: category.id
        }) > -1
      }, category.name);
    })), React.createElement(_Button, {
      type: "primary",
      className: "red-btn",
      onClick: function onClick() {
        deleteCategory(item.id);
      }
    }, "\u5220\u9664"), item.id > 0 && React.createElement("div", {
      className: "selectSkuWrap"
    }, React.createElement("div", {
      className: "childrenWrap"
    }, _.map(item.children, function (skuItem, childIndex) {
      var dataItem = dataSource.find(function (n) {
        return n.id === skuItem.parent_id;
      });

      var value = _.get(skuList, "".concat(index, ".children.").concat(childIndex, ".id"));

      return React.createElement("div", {
        className: "childrenItem",
        key: "sku_item_".concat(skuItem.id)
      }, React.createElement(DeleteOutlined, {
        className: "deleteItemIcon",
        onClick: function onClick() {
          deleteSku(_.toInteger(childIndex), skuItem.parent_id);
        }
      }), React.createElement(_Select, {
        placeholder: "\u8BF7\u9009\u62E9\u89C4\u683C",
        onChange: function onChange(id) {
          var childItem = _.find(_.get(dataItem, 'children'), function (n) {
            return n.id === id;
          });

          onSelectSku(childItem, _.toInteger(childIndex), skuItem.parent_id);
        },
        value: value
      }, _.map(_.get(dataItem, 'children'), function (sku) {
        return React.createElement(_Select.Option, {
          value: sku.id,
          key: "sku_".concat(sku.id),
          disabled: _.findIndex(item.children, {
            id: sku.id
          }) > -1
        }, React.createElement("span", {
          className: "skuName"
        }, sku.name));
      })));
    })), React.createElement(_Button, {
      className: "addSkuBtn",
      onClick: function onClick() {
        addSku(item.id);
      }
    }, "\u6DFB\u52A0")));
  }), React.createElement(_Button, {
    type: "primary",
    onClick: addCategory
  }, "\u6DFB\u52A0\u5546\u54C1\u89C4\u683C")));
}
export default SKU;