"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/popover/style");

var _popover = _interopRequireDefault(require("antd/lib/popover"));

require("antd/lib/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

require("antd/lib/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _react = _interopRequireDefault(require("react"));

var _context = require("antd/lib/config-provider/context");

var _icons = require("@ant-design/icons");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _container = _interopRequireDefault(require("../../container"));

var _dndItem = _interopRequireDefault(require("./dnd-item"));

var _intlContext = require("../../../intl-context");

require("./index.less");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ToolTipIcon = function ToolTipIcon(_ref) {
  var title = _ref.title,
      show = _ref.show,
      children = _ref.children,
      columnKey = _ref.columnKey,
      fixed = _ref.fixed;

  var _Container$useContain = _container.default.useContainer(),
      columnsMap = _Container$useContain.columnsMap,
      setColumnsMap = _Container$useContain.setColumnsMap;

  if (show) {
    return _react.default.createElement(_tooltip.default, {
      title: title
    }, _react.default.createElement("span", {
      onClick: function onClick() {
        var config = columnsMap[columnKey || ''] || {};

        var columnKeyMap = _objectSpread(_objectSpread({}, columnsMap), {}, _defineProperty({}, columnKey, _objectSpread(_objectSpread({}, config), {}, {
          fixed: fixed
        })));

        setColumnsMap(columnKeyMap);
      }
    }, children));
  }

  return null;
};

var CheckboxListItem = function CheckboxListItem(_ref2) {
  var columnKey = _ref2.columnKey,
      className = _ref2.className,
      columnsMap = _ref2.columnsMap,
      title = _ref2.title,
      setColumnsMap = _ref2.setColumnsMap,
      fixed = _ref2.fixed;
  var intl = (0, _intlContext.useIntl)();
  var config = columnsMap[columnKey || 'null'] || {
    show: true
  };
  return _react.default.createElement("span", {
    className: "".concat(className, "-list-item"),
    key: columnKey
  }, _react.default.createElement(_checkbox.default, {
    onChange: function onChange(e) {
      if (columnKey) {
        var tempConfig = columnsMap[columnKey || ''] || {};

        var newSetting = _objectSpread({}, tempConfig);

        if (e.target.checked) {
          delete newSetting.show;
        } else {
          newSetting.show = false;
        }

        var columnKeyMap = _objectSpread(_objectSpread({}, columnsMap), {}, _defineProperty({}, columnKey, newSetting));

        setColumnsMap(columnKeyMap);
      }
    },
    checked: config.show !== false
  }, title), _react.default.createElement("span", {
    className: "".concat(className, "-list-item-option")
  }, _react.default.createElement(ToolTipIcon, {
    columnKey: columnKey,
    fixed: "left",
    title: intl.getMessage('tableToolBar.leftPin', '固定到左边'),
    show: fixed !== 'left'
  }, _react.default.createElement(_icons.PushpinOutlined, {
    style: {
      transform: 'rotate(-90deg)'
    }
  })), _react.default.createElement(ToolTipIcon, {
    columnKey: columnKey,
    fixed: undefined,
    title: intl.getMessage('tableToolBar.noPin', '取消固定'),
    show: !!fixed
  }, _react.default.createElement(_icons.VerticalAlignMiddleOutlined, null)), _react.default.createElement(ToolTipIcon, {
    columnKey: columnKey,
    fixed: "right",
    title: intl.getMessage('tableToolBar.rightPin', '固定到右边'),
    show: fixed !== 'right'
  }, _react.default.createElement(_icons.PushpinOutlined, null))));
};

var CheckboxList = function CheckboxList(_ref3) {
  var list = _ref3.list,
      className = _ref3.className,
      _ref3$showTitle = _ref3.showTitle,
      showTitle = _ref3$showTitle === void 0 ? true : _ref3$showTitle,
      listTitle = _ref3.title;

  var _Container$useContain2 = _container.default.useContainer(),
      columnsMap = _Container$useContain2.columnsMap,
      setColumnsMap = _Container$useContain2.setColumnsMap,
      sortKeyColumns = _Container$useContain2.sortKeyColumns,
      setSortKeyColumns = _Container$useContain2.setSortKeyColumns;

  var show = list && list.length > 0;

  if (!show) {
    return null;
  }

  var move = function move(id, targetIndex) {
    var newColumns = _toConsumableArray(sortKeyColumns);

    var findIndex = newColumns.findIndex(function (columnKey) {
      return columnKey === id;
    });
    var key = newColumns[findIndex];
    newColumns.splice(findIndex, 1);

    if (targetIndex === 0) {
      newColumns.unshift(key);
    } else {
      newColumns.splice(targetIndex, 0, key);
    }

    setSortKeyColumns(newColumns);
  };

  var listDom = list.map(function (_ref4, index) {
    var key = _ref4.key,
        dataIndex = _ref4.dataIndex,
        title = _ref4.title,
        fixed = _ref4.fixed,
        rest = _objectWithoutProperties(_ref4, ["key", "dataIndex", "title", "fixed"]);

    var columnKey = (0, _util.genColumnKey)(key, dataIndex, rest.index);
    return _react.default.createElement(_dndItem.default, {
      index: index,
      id: "".concat(columnKey, "_").concat(rest.index),
      key: columnKey,
      end: function end(id, targetIndex) {
        move(id, targetIndex);
      }
    }, _react.default.createElement(CheckboxListItem, {
      setColumnsMap: setColumnsMap,
      columnKey: columnKey || "".concat(index),
      columnsMap: columnsMap,
      title: title,
      fixed: fixed,
      className: className
    }));
  });
  return _react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.default
  }, showTitle && _react.default.createElement("span", {
    className: "".concat(className, "-list-title")
  }, listTitle), listDom);
};

var GroupCheckboxList = function GroupCheckboxList(_ref5) {
  var localColumns = _ref5.localColumns,
      className = _ref5.className;
  var rightList = [];
  var leftList = [];
  var list = [];
  var intl = (0, _intlContext.useIntl)();
  localColumns.forEach(function (item) {
    var fixed = item.fixed;

    if (fixed === 'left') {
      leftList.push(item);
      return;
    }

    if (fixed === 'right') {
      rightList.push(item);
      return;
    }

    list.push(item);
  });
  var showRight = rightList && rightList.length > 0;
  var showLeft = leftList && leftList.length > 0;
  return _react.default.createElement("div", {
    className: "".concat(className, "-list")
  }, _react.default.createElement(CheckboxList, {
    title: intl.getMessage('tableToolBar.leftFixedTitle', '固定在左侧'),
    list: leftList,
    className: className
  }), _react.default.createElement(CheckboxList, {
    list: list,
    title: intl.getMessage('tableToolBar.noFixedTitle', '不固定'),
    showTitle: showLeft || showRight,
    className: className
  }), _react.default.createElement(CheckboxList, {
    title: intl.getMessage('tableToolBar.rightFixedTitle', '固定在右侧'),
    list: rightList,
    className: className
  }));
};

var ColumnSetting = function ColumnSetting(props) {
  var counter = _container.default.useContainer();

  var localColumns = props.columns || counter.columns || [];
  var columnsMap = counter.columnsMap,
      setColumnsMap = counter.setColumnsMap,
      setSortKeyColumns = counter.setSortKeyColumns;
  /**
   * 设置全部选中，或全部未选中
   * @param show
   */

  var setAllSelectAction = function setAllSelectAction() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var columnKeyMap = {};
    localColumns.forEach(function (_ref6) {
      var key = _ref6.key,
          fixed = _ref6.fixed,
          dataIndex = _ref6.dataIndex,
          index = _ref6.index;
      var columnKey = (0, _util.genColumnKey)(key, dataIndex, index);

      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: show,
          fixed: fixed
        };
      }
    });
    setColumnsMap(columnKeyMap);
  }; // 选中的 key 列表


  var selectedKeys = Object.values(columnsMap).filter(function (value) {
    return !value || value.show === false;
  }); // 是否已经选中

  var indeterminate = selectedKeys.length > 0 && selectedKeys.length !== localColumns.length;
  var intl = (0, _intlContext.useIntl)();
  return _react.default.createElement(_context.ConfigConsumer, null, function (_ref7) {
    var getPrefixCls = _ref7.getPrefixCls;
    var className = getPrefixCls('pro-table-column-setting');
    var toolBarClassName = getPrefixCls('pro-table-toolbar');
    return _react.default.createElement(_popover.default, {
      arrowPointAtCenter: true,
      title: _react.default.createElement("div", {
        className: "".concat(className, "-title")
      }, _react.default.createElement(_checkbox.default, {
        indeterminate: indeterminate,
        checked: selectedKeys.length === 0 && selectedKeys.length !== localColumns.length,
        onChange: function onChange(e) {
          if (e.target.checked) {
            setAllSelectAction();
          } else {
            setAllSelectAction(false);
          }
        }
      }, intl.getMessage('tableToolBar.columnDisplay', '列展示')), _react.default.createElement("a", {
        onClick: function onClick() {
          setColumnsMap({});
          setSortKeyColumns([]);
        }
      }, intl.getMessage('tableToolBar.reset', '重置'))),
      trigger: "click",
      placement: "bottomRight",
      content: _react.default.createElement(GroupCheckboxList, {
        className: className,
        localColumns: localColumns
      })
    }, _react.default.createElement(_tooltip.default, {
      title: intl.getMessage('tableToolBar.columnSetting', '列设置')
    }, _react.default.createElement(_icons.SettingOutlined, {
      className: "".concat(toolBarClassName, "-item-icon"),
      style: {
        fontSize: 16
      }
    })));
  });
};

var _default = ColumnSetting;
exports.default = _default;