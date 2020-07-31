"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/alert/style");

var _alert = _interopRequireDefault(require("antd/lib/alert"));

require("antd/lib/space/style");

var _space = _interopRequireDefault(require("antd/lib/space"));

var _react = _interopRequireDefault(require("react"));

var _context = require("antd/lib/config-provider/context");

var _intlContext = require("../../../intl-context");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultAlertOptionRender = function defaultAlertOptionRender(props) {
  var intl = props.intl,
      onCleanSelected = props.onCleanSelected;
  return [_react.default.createElement("a", {
    onClick: onCleanSelected,
    key: "0"
  }, intl.getMessage('alert.clear', '清空'))];
};

var TableAlert = function TableAlert(_ref) {
  var _ref$selectedRowKeys = _ref.selectedRowKeys,
      selectedRowKeys = _ref$selectedRowKeys === void 0 ? [] : _ref$selectedRowKeys,
      onCleanSelected = _ref.onCleanSelected,
      _ref$selectedRows = _ref.selectedRows,
      selectedRows = _ref$selectedRows === void 0 ? [] : _ref$selectedRows,
      _ref$alertInfoRender = _ref.alertInfoRender,
      alertInfoRender = _ref$alertInfoRender === void 0 ? function (_ref2) {
    var intl = _ref2.intl;
    return _react.default.createElement(_space.default, null, intl.getMessage('alert.selected', '已选择'), _react.default.createElement("a", {
      style: {
        fontWeight: 600
      }
    }, selectedRowKeys.length), intl.getMessage('alert.item', '项'), "\xA0\xA0");
  } : _ref$alertInfoRender,
      _ref$alertOptionRende = _ref.alertOptionRender,
      alertOptionRender = _ref$alertOptionRende === void 0 ? defaultAlertOptionRender : _ref$alertOptionRende;
  var intl = (0, _intlContext.useIntl)();
  var option = alertOptionRender && alertOptionRender({
    onCleanSelected: onCleanSelected,
    intl: intl
  });
  return _react.default.createElement(_context.ConfigConsumer, null, function (_ref3) {
    var getPrefixCls = _ref3.getPrefixCls;
    var className = getPrefixCls('pro-table-alert');

    if (alertInfoRender === false) {
      return null;
    }

    var dom = alertInfoRender({
      intl: intl,
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows
    });

    if (dom === false) {
      return null;
    }

    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement(_alert.default, {
      message: _react.default.createElement("div", {
        className: "".concat(className, "-info")
      }, _react.default.createElement("div", {
        className: "".concat(className, "-info-content")
      }, dom), option && _react.default.createElement("div", {
        className: "".concat(className, "-info-option")
      }, option)),
      type: "info",
      showIcon: true
    }));
  });
};

var _default = TableAlert;
exports.default = _default;