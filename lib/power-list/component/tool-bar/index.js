"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/space/style");

var _space = _interopRequireDefault(require("antd/lib/space"));

require("antd/lib/divider/style");

var _divider = _interopRequireDefault(require("antd/lib/divider"));

require("antd/lib/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _context = require("antd/lib/config-provider/context");

var _columnSetting = _interopRequireDefault(require("../column-setting"));

var _intlContext = require("../../../intl-context");

var _fullscreenIcon = _interopRequireDefault(require("./fullscreen-icon"));

var _densityIcon = _interopRequireDefault(require("./density-icon"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getButtonText = function getButtonText(_ref) {
  var intl = _ref.intl;
  return {
    fullScreen: {
      text: intl.getMessage('tableToolBar.fullScreen', '全屏'),
      icon: _react.default.createElement(_fullscreenIcon.default, null)
    },
    reload: {
      text: intl.getMessage('tableToolBar.reload', '刷新'),
      icon: _react.default.createElement(_icons.ReloadOutlined, null)
    },
    setting: {
      text: intl.getMessage('tableToolBar.columnSetting', '列设置'),
      icon: _react.default.createElement(_icons.SettingOutlined, null)
    },
    density: {
      text: intl.getMessage('tableToolBar.density', '表格密度'),
      icon: _react.default.createElement(_densityIcon.default, null)
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
      return _react.default.createElement(_columnSetting.default, {
        key: key
      });
    }

    if (key === 'fullScreen') {
      return _react.default.createElement("span", {
        key: key,
        className: className,
        onClick: value === true ? defaultOptions[key] : value
      }, _react.default.createElement(_fullscreenIcon.default, null));
    }

    var optionItem = getButtonText(defaultOptions)[key];

    if (optionItem) {
      return _react.default.createElement("span", {
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
      }, _react.default.createElement(_tooltip.default, {
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

  var intl = (0, _intlContext.useIntl)();
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

    return _react.default.createElement(_divider.default, {
      type: "vertical"
    });
  };

  return _react.default.createElement("div", {
    className: className
  }, _react.default.createElement("div", {
    className: "".concat(className, "-title")
  }, headerTitle), _react.default.createElement("div", {
    className: "".concat(className, "-option")
  }, _react.default.createElement(_space.default, null, options && options.search && _react.default.createElement(_input.default.Search, Object.assign({
    placeholder: intl.getMessage('tableForm.inputPlaceholder', '请输入'),
    style: {
      width: 200
    }
  }, options.search, {
    onSearch: onSearch
  })), actions.filter(function (item) {
    return item;
  }).map(function (node, index) {
    return _react.default.createElement("div", {
      // eslint-disable-next-line react/no-array-index-key
      key: index
    }, node);
  })), _react.default.createElement("div", {
    className: "".concat(className, "-default-option")
  }, renderDivider(), _react.default.createElement(_space.default, null, optionDom))));
};

var WarpToolBar = function WarpToolBar(props) {
  return _react.default.createElement(_context.ConfigConsumer, null, function (_ref3) {
    var getPrefixCls = _ref3.getPrefixCls;
    var className = getPrefixCls('pro-table-toolbar');
    return _react.default.createElement(ToolBar, Object.assign({
      className: className
    }, props));
  });
};

var _default = WarpToolBar;
exports.default = _default;