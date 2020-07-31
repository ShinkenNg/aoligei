import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/space/style";
import _Space from "antd/es/space";
import "antd/es/divider/style";
import _Divider from "antd/es/divider";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigConsumer } from "antd/es/config-provider/context";
import ColumnSetting from '../column-setting';
import { useIntl } from '../../../intl-context';
import FullScreenIcon from './fullscreen-icon';
import DensityIcon from './density-icon';
import './index.less';

var getButtonText = function getButtonText(_ref) {
  var intl = _ref.intl;
  return {
    fullScreen: {
      text: intl.getMessage('tableToolBar.fullScreen', '全屏'),
      icon: React.createElement(FullScreenIcon, null)
    },
    reload: {
      text: intl.getMessage('tableToolBar.reload', '刷新'),
      icon: React.createElement(ReloadOutlined, null)
    },
    setting: {
      text: intl.getMessage('tableToolBar.columnSetting', '列设置'),
      icon: React.createElement(SettingOutlined, null)
    },
    density: {
      text: intl.getMessage('tableToolBar.density', '表格密度'),
      icon: React.createElement(DensityIcon, null)
    }
  };
};
/**
 * 渲染默认的 工具栏
 * @param options
 * @param className
 */


var renderDefaultOption = function renderDefaultOption(options, className, defaultOptions) {
  return options && Object.keys(options).filter(function (item) {
    return item;
  }).map(function (key) {
    var value = options[key];

    if (!value) {
      return null;
    }

    if (key === 'setting') {
      return React.createElement(ColumnSetting, {
        key: key
      });
    }

    if (key === 'fullScreen') {
      return React.createElement("span", {
        key: key,
        className: className,
        onClick: value === true ? defaultOptions[key] : value
      }, React.createElement(FullScreenIcon, null));
    }

    var optionItem = getButtonText(defaultOptions)[key];

    if (optionItem) {
      return React.createElement("span", {
        key: key,
        className: className,
        onClick: function onClick() {
          if (value && defaultOptions[key] !== true) {
            if (value !== true) {
              value();
              return;
            }

            defaultOptions[key]();
          }
        }
      }, React.createElement(_Tooltip, {
        title: optionItem.text
      }, optionItem.icon));
    }

    return null;
  }).filter(function (item) {
    return item;
  });
};

var ToolBar = function ToolBar(_ref2) {
  var headerTitle = _ref2.headerTitle,
      toolBarRender = _ref2.toolBarRender,
      action = _ref2.action,
      _ref2$options = _ref2.options,
      propsOptions = _ref2$options === void 0 ? {
    density: true,
    fullScreen: function fullScreen() {
      return action.fullScreen && action.fullScreen();
    },
    reload: function reload() {
      return action.reload();
    },
    setting: true,
    search: false
  } : _ref2$options,
      selectedRowKeys = _ref2.selectedRowKeys,
      selectedRows = _ref2.selectedRows,
      className = _ref2.className,
      onSearch = _ref2.onSearch;

  var options = _objectSpread({
    density: true,
    fullScreen: function fullScreen() {
      return action.fullScreen && action.fullScreen();
    },
    reload: function reload() {
      return action.reload();
    },
    setting: true,
    search: false
  }, propsOptions);

  var intl = useIntl();
  var optionDom = renderDefaultOption(options, "".concat(className, "-item-icon"), {
    fullScreen: function fullScreen() {
      return action.fullScreen && action.fullScreen();
    },
    reload: function reload() {
      return action.reload();
    },
    density: true,
    setting: true,
    search: false,
    intl: intl
  }) || []; // 操作列表

  var actions = toolBarRender ? toolBarRender(action, {
    selectedRowKeys: selectedRowKeys,
    selectedRows: selectedRows
  }) : [];

  var renderDivider = function renderDivider() {
    if (optionDom.length < 1) {
      return false;
    }

    if (actions.length < 1 && options.search === false) {
      return false;
    }

    return React.createElement(_Divider, {
      type: "vertical"
    });
  };

  return React.createElement("div", {
    className: className
  }, React.createElement("div", {
    className: "".concat(className, "-title")
  }, headerTitle), React.createElement("div", {
    className: "".concat(className, "-option")
  }, React.createElement(_Space, null, options && options.search && React.createElement(_Input.Search, Object.assign({
    placeholder: intl.getMessage('tableForm.inputPlaceholder', '请输入'),
    style: {
      width: 200
    }
  }, options.search, {
    onSearch: onSearch
  })), actions.filter(function (item) {
    return item;
  }).map(function (node, index) {
    return React.createElement("div", {
      // eslint-disable-next-line react/no-array-index-key
      key: index
    }, node);
  })), React.createElement("div", {
    className: "".concat(className, "-default-option")
  }, renderDivider(), React.createElement(_Space, null, optionDom))));
};

var WarpToolBar = function WarpToolBar(props) {
  return React.createElement(ConfigConsumer, null, function (_ref3) {
    var getPrefixCls = _ref3.getPrefixCls;
    var className = getPrefixCls('pro-table-toolbar');
    return React.createElement(ToolBar, Object.assign({
      className: className
    }, props));
  });
};

export default WarpToolBar;