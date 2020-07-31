import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import "antd/es/empty/style";
import _Empty from "antd/es/empty";
import "antd/es/card/style";
import _Card from "antd/es/card";
import "antd/es/space/style";
import _Space from "antd/es/space";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import './index.less';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value'; // eslint-disable-next-line import/no-extraneous-dependencies

import { stringify } from 'use-json-comparison';
import { ConfigConsumer } from "antd/es/config-provider"; // eslint-disable-next-line import/no-extraneous-dependencies

import { noteOnce } from "rc-util/es/warning";
import { IntlProvider, IntlConsumer, useIntl } from '../intl-context';
import useFetchData from './use-fetch-data';
import Container from './container';
import Toolbar from './component/tool-bar';
import Alert from './component/alert';
import FormSearch from './form';
import get, { parsingText // parsingValueEnumToArray,
, checkUndefinedOrNull, useDeepCompareEffect, genColumnKey, removeObjectNull, ObjToMap, reduceWidth } from './component/util';
import defaultRenderText from './default-render';
import ErrorBoundary from './component/errorboundary';

var mergePagination = function mergePagination() {
  var pagination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var intl = arguments.length > 2 ? arguments[2] : undefined;

  if (pagination === false) {
    return {};
  }

  var defaultPagination = pagination || {};
  var current = action.current,
      pageSize = action.pageSize;

  if (pagination === true) {
    defaultPagination = {};
  }

  return _objectSpread(_objectSpread({
    showTotal: function showTotal(all, range) {
      return "".concat(intl.getMessage('pagination.total.range', '第'), " ").concat(range[0], "-").concat(range[1], " ").concat(intl.getMessage('pagination.total.total', '条/总共'), " ").concat(all, " ").concat(intl.getMessage('pagination.total.item', '条'));
    },
    showSizeChanger: true,
    total: action.total
  }, defaultPagination), {}, {
    current: current,
    pageSize: pageSize,
    onChange: function onChange(page, newPageSize) {
      var purePathName = (window.location.pathname || '').replace(/\//g, ''); // pageSize 改变之后就没必要切换页码

      if (newPageSize !== pageSize && current !== page) {
        action.setPageInfo({
          pageSize: pageSize,
          page: page
        });
      } else {
        if (newPageSize !== pageSize) {
          action.setPageInfo({
            pageSize: newPageSize
          });
        }

        if (current !== page) {
          action.setPageInfo({
            page: page
          });
        }
      }

      var pageInfo = {
        pageSize: newPageSize,
        current: page
      };
      sessionStorage.setItem(purePathName, JSON.stringify(pageInfo));
      var onChange = pagination.onChange;

      if (onChange) {
        onChange(page, newPageSize || 20);
      }
    },
    onShowSizeChange: function onShowSizeChange(page, showPageSize) {
      action.setPageInfo({
        pageSize: showPageSize,
        page: page
      });
      var onShowSizeChange = pagination.onShowSizeChange;

      if (onShowSizeChange) {
        onShowSizeChange(page, showPageSize || 20);
      }
    }
  });
};
/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */


var genEllipsis = function genEllipsis(dom, item, text) {
  if (!item.ellipsis) {
    return dom;
  }

  return React.createElement(_Tooltip, {
    title: text
  }, React.createElement("div", null, dom));
};

var genCopyable = function genCopyable(dom, item) {
  if (item.copyable || item.ellipsis) {
    return React.createElement(_Typography.Paragraph, {
      style: {
        width: reduceWidth(item.width),
        margin: 0,
        padding: 0
      },
      copyable: item.copyable,
      ellipsis: item.ellipsis
    }, dom);
  }

  return dom;
};
/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */


var columRender = function columRender(_ref) {
  var item = _ref.item,
      text = _ref.text,
      row = _ref.row,
      index = _ref.index,
      columnEmptyText = _ref.columnEmptyText;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  var counter = Container.useContainer();
  var action = counter.action;
  var _item$renderText = item.renderText,
      renderText = _item$renderText === void 0 ? function (val) {
    return val;
  } : _item$renderText,
      _item$valueEnum = item.valueEnum,
      valueEnum = _item$valueEnum === void 0 ? {} : _item$valueEnum;

  if (!action.current) {
    return null;
  }

  var renderTextStr = renderText(parsingText(text, ObjToMap(valueEnum)), row, index, action.current);
  var textDom = defaultRenderText(renderTextStr, item.valueType || 'text', index, row, columnEmptyText);
  var dom = genEllipsis(genCopyable(textDom, item), item, renderText(parsingText(text, ObjToMap(valueEnum), true), row, index, action.current));

  if (item.render) {
    var renderDom = item.render(dom, row, index, action.current); // 如果是合并单元格的，直接返回对象

    if (renderDom && _typeof(renderDom) === 'object' && renderDom.props && renderDom.props.colSpan) {
      return renderDom;
    }

    if (renderDom && item.valueType === 'option' && Array.isArray(renderDom)) {
      return React.createElement(_Space, null, renderDom);
    }

    return renderDom;
  }

  return checkUndefinedOrNull(dom) ? dom : null;
};
/**
 * 转化 columns 到 power list 的格式
 * 主要是 render 方法的自行实现
 * @param columns
 * @param map
 * @param columnEmptyText
 */


var genColumnList = function genColumnList(columns, map, columnEmptyText) {
  return columns.map(function (item) {
    var title = item.title;
    return _objectSpread(_objectSpread({}, item), {}, {
      title: title && typeof title === 'function' ? title(item, 'table') : title,
      valueEnum: ObjToMap(item.valueEnum)
    });
  }).map(function (item, columnsIndex) {
    var _tempColumns$dataInde;

    var key = item.key,
        dataIndex = item.dataIndex;
    var columnKey = genColumnKey(key, dataIndex, columnsIndex);
    var config = columnKey ? map[columnKey] || {
      fixed: item.fixed
    } : {
      fixed: item.fixed
    };

    var tempColumns = _objectSpread(_objectSpread({
      onFilter: function onFilter(value, record) {
        var recordElement = get(record, item.dataIndex || '');

        if (typeof recordElement === 'number') {
          recordElement = recordElement.toString();
        }

        var itemValue = String(recordElement || '');
        return String(itemValue) === String(value);
      },
      index: columnsIndex
    }, item), {}, {
      ellipsis: false,
      fixed: config.fixed,
      width: item.width || (item.fixed ? 200 : undefined),
      // @ts-ignore
      children: item.children ? genColumnList(item.children, map, columnEmptyText) : undefined,
      render: function render(text, row, index) {
        return columRender({
          item: item,
          text: text,
          row: row,
          index: index,
          columnEmptyText: columnEmptyText
        });
      }
    });

    if (!tempColumns.children || !tempColumns.children.length) {
      delete tempColumns.children;
    }

    if (!tempColumns.dataIndex) {
      delete tempColumns.dataIndex;
    } // 如果存在点连接.符号


    if ((_tempColumns$dataInde = tempColumns.dataIndex) === null || _tempColumns$dataInde === void 0 ? void 0 : _tempColumns$dataInde.toString().includes('.')) {
      var _tempColumns$dataInde2;

      // 转为 ant design table接受的格式
      tempColumns.dataIndex = (_tempColumns$dataInde2 = tempColumns.dataIndex) === null || _tempColumns$dataInde2 === void 0 ? void 0 : _tempColumns$dataInde2.toString().split('.');
    }

    if (!tempColumns.filters || !tempColumns.filters.length) {
      delete tempColumns.filters;
    }

    return tempColumns;
  }).filter(function (item) {
    return !item.hideInTable;
  });
};
/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */


var PowerList = function PowerList(props) {
  var request = props.request,
      propsClassName = props.className,
      _props$params = props.params,
      params = _props$params === void 0 ? {} : _props$params,
      _props$defaultData = props.defaultData,
      defaultData = _props$defaultData === void 0 ? [] : _props$defaultData,
      headerTitle = props.headerTitle,
      postData = props.postData,
      propsPagination = props.pagination,
      actionRef = props.actionRef,
      _props$columns = props.columns,
      propsColumns = _props$columns === void 0 ? [] : _props$columns,
      _props$toolBarRender = props.toolBarRender,
      toolBarRender = _props$toolBarRender === void 0 ? function () {
    return [];
  } : _props$toolBarRender,
      onLoad = props.onLoad,
      onRequestError = props.onRequestError,
      style = props.style,
      tableStyle = props.tableStyle,
      tableClassName = props.tableClassName,
      columnsStateMap = props.columnsStateMap,
      onColumnsStateChange = props.onColumnsStateChange,
      options = props.options,
      _props$search = props.search,
      search = _props$search === void 0 ? true : _props$search,
      _props$rowSelection = props.rowSelection,
      propsRowSelection = _props$rowSelection === void 0 ? false : _props$rowSelection,
      _props$beforeSearchSu = props.beforeSearchSubmit,
      beforeSearchSubmit = _props$beforeSearchSu === void 0 ? function (searchParams) {
    return searchParams;
  } : _props$beforeSearchSu,
      tableAlertRender = props.tableAlertRender,
      defaultClassName = props.defaultClassName,
      formRef = props.formRef,
      _props$type = props.type,
      type = _props$type === void 0 ? 'table' : _props$type,
      _props$onReset = props.onReset,
      _onReset = _props$onReset === void 0 ? function () {} : _props$onReset,
      _props$columnEmptyTex = props.columnEmptyText,
      columnEmptyText = _props$columnEmptyTex === void 0 ? '-' : _props$columnEmptyTex,
      getPageMeta = props.getPageMeta,
      rest = _objectWithoutProperties(props, ["request", "className", "params", "defaultData", "headerTitle", "postData", "pagination", "actionRef", "columns", "toolBarRender", "onLoad", "onRequestError", "style", "tableStyle", "tableClassName", "columnsStateMap", "onColumnsStateChange", "options", "search", "rowSelection", "beforeSearchSubmit", "tableAlertRender", "defaultClassName", "formRef", "type", "onReset", "columnEmptyText", "getPageMeta"]);

  var _useMergeValue = useMergeValue([], {
    value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      selectedRowKeys = _useMergeValue2[0],
      setSelectedRowKeys = _useMergeValue2[1];

  var _useState = useState(function () {
    var _rest$form;

    return (_rest$form = rest.form) === null || _rest$form === void 0 ? void 0 : _rest$form.initialValues;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      formSearch = _useState2[0],
      setFormSearch = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedRows = _useState4[0],
      setSelectedRows = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      dataSource = _useState6[0],
      setDataSource = _useState6[1];

  var _useState7 = useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      proFilter = _useState8[0],
      setProFilter = _useState8[1];

  var _useState9 = useState({}),
      _useState10 = _slicedToArray(_useState9, 2),
      proSort = _useState10[0],
      setProSort = _useState10[1];

  var rootRef = useRef(null);
  var fullScreen = useRef();
  /**
   * 需要初始化 不然默认可能报错
   * 这里取了 defaultCurrent 和 current
   * 为了保证不会重复刷新
   */

  var fetchPagination = _typeof(propsPagination) === 'object' ? propsPagination : {
    defaultCurrent: 1,
    defaultPageSize: 20,
    pageSize: 20,
    current: 1
  };
  var action = useFetchData( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
      var pageSize, current, msg;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pageSize = _ref2.pageSize, current = _ref2.current;

              if (request) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", {
                data: props.dataSource || [],
                success: true
              });

            case 3:
              _context.next = 5;
              return request(_objectSpread(_objectSpread({
                page: current,
                pageSize: pageSize
              }, formSearch), params), proSort, proFilter);

            case 5:
              msg = _context.sent;

              if (!postData) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", _objectSpread(_objectSpread({}, msg), {}, {
                data: postData(msg.data)
              }));

            case 8:
              return _context.abrupt("return", msg);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), defaultData, {
    defaultCurrent: fetchPagination.current || fetchPagination.defaultCurrent,
    defaultPageSize: fetchPagination.pageSize || fetchPagination.defaultPageSize,
    onLoad: onLoad,
    onRequestError: onRequestError,
    getMeta: getPageMeta,
    effects: [stringify(params), stringify(formSearch), stringify(proFilter), stringify(proSort)]
  });
  useEffect(function () {
    fullScreen.current = function () {
      if (!rootRef.current || !document.fullscreenEnabled) {
        return;
      }

      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        rootRef.current.requestFullscreen();
      }
    };
  }, [rootRef.current]);
  action.fullScreen = fullScreen.current;
  var intl = useIntl();
  var pagination = propsPagination !== false && mergePagination(propsPagination, action, intl);
  var counter = Container.useContainer();

  var onCleanSelected = function onCleanSelected() {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], []);
    }

    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  useEffect(function () {
    // 数据源更新时 取消所有选中项
    // onCleanSelected();
    setDataSource(request ? action.dataSource : props.dataSource || []);
  }, [props.dataSource, action.dataSource]);
  /**
   *  保存一下 propsColumns
   *  生成 form 需要用
   */

  useDeepCompareEffect(function () {
    counter.setPowerColumns(propsColumns);
  }, [propsColumns]);
  counter.setAction(action);
  /**
   * 这里生成action的映射，保证 action 总是使用的最新
   * 只需要渲染一次即可
   * 同时确定销毁之前，能保存页面信息到session中
   */

  useEffect(function () {
    var userAction = {
      reload: function () {
        var _reload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resetPageIndex) {
          var current;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  current = counter.action.current;

                  if (current) {
                    _context2.next = 3;
                    break;
                  }

                  return _context2.abrupt("return");

                case 3:
                  noteOnce(!!resetPageIndex, ' reload 的 resetPageIndex 将会失效，建议使用 reloadAndRest。');
                  noteOnce(!!resetPageIndex, 'reload resetPageIndex will remove and reloadAndRest is recommended.'); // 如果为 true，回到第一页

                  if (!resetPageIndex) {
                    _context2.next = 8;
                    break;
                  }

                  _context2.next = 8;
                  return current.resetPageIndex();

                case 8:
                  _context2.next = 10;
                  return current.reload();

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function reload(_x2) {
          return _reload.apply(this, arguments);
        }

        return reload;
      }(),
      reloadAndRest: function () {
        var _reloadAndRest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var current;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  current = counter.action.current;

                  if (current) {
                    _context3.next = 3;
                    break;
                  }

                  return _context3.abrupt("return");

                case 3:
                  // reload 之后大概率会切换数据，清空一下选择。
                  onCleanSelected(); // 如果为 true，回到第一页

                  _context3.next = 6;
                  return current.resetPageIndex();

                case 6:
                  _context3.next = 8;
                  return current.reload();

                case 8:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function reloadAndRest() {
          return _reloadAndRest.apply(this, arguments);
        }

        return reloadAndRest;
      }(),
      fetchMore: function () {
        var _fetchMore = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var current;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  current = counter.action.current;

                  if (current) {
                    _context4.next = 3;
                    break;
                  }

                  return _context4.abrupt("return");

                case 3:
                  _context4.next = 5;
                  return current.fetchMore();

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function fetchMore() {
          return _fetchMore.apply(this, arguments);
        }

        return fetchMore;
      }(),
      reset: function reset() {
        var current = counter.action.current;

        if (!current) {
          return;
        }

        current.reset();
      },
      clearSelected: function clearSelected() {
        return onCleanSelected();
      }
    };

    if (actionRef && typeof actionRef === 'function') {
      actionRef(userAction);
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = userAction;
    }

    var purePathName = (window.location.pathname || '').replace(/\//g, '');
    var sessionPageInfo = sessionStorage.getItem(purePathName);

    if (sessionPageInfo) {
      try {
        var cachePageInfo = JSON.parse(sessionPageInfo);

        if (cachePageInfo.current > 1) {
          // 当页码需要恢复
          action.setPageInfo({
            page: cachePageInfo.current,
            pageSize: cachePageInfo.pageSize
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  /**
   * Table Column 变化的时候更新一下，这个参数将会用于渲染
   */

  useDeepCompareEffect(function () {
    var tableColumn = genColumnList(propsColumns, counter.columnsMap, columnEmptyText);

    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn); // 重新生成key的字符串用于排序

      counter.setSortKeyColumns(tableColumn.map(function (item, index) {
        var key = genColumnKey(item.key, item.dataIndex, index) || "".concat(index);
        return "".concat(key, "_").concat(item.index);
      }));
    }
  }, [propsColumns]);
  /**
   * 这里主要是为了排序，为了保证更新及时，每次都重新计算
   */

  useDeepCompareEffect(function () {
    var keys = counter.sortKeyColumns.join(',');
    var tableColumn = genColumnList(propsColumns, counter.columnsMap, columnEmptyText);

    if (keys.length > 0) {
      // 用于可视化的排序
      tableColumn = tableColumn.sort(function (a, b) {
        var aFixed = a.fixed,
            aIndex = a.index;
        var bFixed = b.fixed,
            bIndex = b.index;

        if (aFixed === 'left' && bFixed !== 'left' || bFixed === 'right' && aFixed !== 'right') {
          return -2;
        }

        if (bFixed === 'left' && aFixed !== 'left' || aFixed === 'right' && bFixed !== 'right') {
          return 2;
        } // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错


        var aKey = "".concat(genColumnKey(a.key, a.dataIndex, aIndex), "_").concat(aIndex);
        var bKey = "".concat(genColumnKey(b.key, b.dataIndex, bIndex), "_").concat(bIndex);
        return keys.indexOf(aKey) - keys.indexOf(bKey);
      });
    }

    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn);
    }
  }, [counter.columnsMap, counter.sortKeyColumns.join('-')]);
  /**
   * 同步 Pagination，支持受控的 页码 和 pageSize
   */

  useDeepCompareEffect(function () {
    if (propsPagination && propsPagination.current && propsPagination.pageSize) {
      action.setPageInfo({
        pageSize: propsPagination.pageSize,
        page: propsPagination.current
      });
    }
  }, [propsPagination]); // 映射 selectedRowKeys 与 selectedRow

  useEffect(function () {
    if (action.loading !== false || propsRowSelection === false) {
      return;
    }

    var tableKey = rest.rowKey; // dataSource maybe is a null
    // eg: api has 404 error

    var duplicateRemoveMap = new Map();

    if (Array.isArray(dataSource)) {
      // 根据当前选中和当前的所有数据计算选中的行
      // 因为防止翻页以后丢失，所有还增加了当前选择选中的
      var rows = [].concat(_toConsumableArray(dataSource), _toConsumableArray(selectedRows)).filter(function (item, index) {
        var rowKey = tableKey;

        if (!tableKey) {
          return selectedRowKeys.includes(index);
        }

        if (typeof tableKey === 'function') {
          rowKey = tableKey(item, index);
        } else {
          rowKey = item[tableKey];
        }

        if (duplicateRemoveMap.has(rowKey)) {
          return false;
        }

        duplicateRemoveMap.set(rowKey, true);
        return selectedRowKeys.includes(rowKey);
      });
      setSelectedRows(rows);
      return;
    }

    setSelectedRows([]);
  }, [selectedRowKeys.join('-'), action.loading, propsRowSelection === false]);

  var rowSelection = _objectSpread(_objectSpread({
    selectedRowKeys: selectedRowKeys
  }, propsRowSelection), {}, {
    onChange: function onChange(keys, rows) {
      if (propsRowSelection && propsRowSelection.onChange) {
        propsRowSelection.onChange(keys, rows);
      }

      setSelectedRowKeys(_toConsumableArray(keys));
    }
  });

  useEffect(function () {
    counter.setTableSize(rest.size || 'middle');
  }, [rest.size]);

  if (counter.columns.length < 1) {
    return React.createElement(_Card, {
      bordered: false,
      bodyStyle: {
        padding: 50
      }
    }, React.createElement(_Empty, null));
  }

  var className = classNames(defaultClassName, propsClassName);
  return React.createElement(_ConfigProvider, {
    getPopupContainer: function getPopupContainer() {
      return rootRef.current || document.body;
    }
  }, React.createElement("div", {
    className: className,
    id: "ant-design-pro-table",
    style: style,
    ref: rootRef
  }, (search || type === 'form') && React.createElement(FormSearch, Object.assign({}, rest, {
    type: props.type,
    formRef: formRef,
    onSubmit: function onSubmit(value) {
      if (type !== 'form') {
        setFormSearch(beforeSearchSubmit(_objectSpread(_objectSpread({}, value), {}, {
          _timestamp: Date.now()
        }))); // back first page

        action.resetPageIndex();
      }

      if (props.onSubmit) {
        props.onSubmit(value);
      }
    },
    onReset: function onReset() {
      setFormSearch(beforeSearchSubmit({})); // back first page

      action.resetPageIndex();

      _onReset();
    },
    dateFormatter: rest.dateFormatter,
    search: search
  })), type !== 'form' && React.createElement(_Card, {
    bordered: false,
    style: {
      height: '100%'
    },
    bodyStyle: {
      padding: 0
    }
  }, toolBarRender !== false && (options !== false || headerTitle || toolBarRender) && // if options= false & headerTitle=== false, hide Toolbar
  React.createElement(Toolbar, {
    options: options,
    headerTitle: headerTitle,
    action: action,
    onSearch: function onSearch(keyword) {
      if (options && options.search) {
        var _ref4 = options.search === true ? {
          name: 'keyword'
        } : options.search,
            _ref4$name = _ref4.name,
            name = _ref4$name === void 0 ? 'keyword' : _ref4$name;

        setFormSearch(_objectSpread(_defineProperty({}, name, keyword), formSearch));
      }
    },
    selectedRows: selectedRows,
    selectedRowKeys: selectedRowKeys,
    toolBarRender: toolBarRender
  }), propsRowSelection !== false && React.createElement(Alert, {
    selectedRowKeys: selectedRowKeys,
    selectedRows: selectedRows,
    onCleanSelected: onCleanSelected,
    alertOptionRender: rest.tableAlertOptionRender,
    alertInfoRender: tableAlertRender
  }), React.createElement(_Table, Object.assign({}, rest, {
    size: counter.tableSize,
    scroll: {
      x: 'max-content'
    },
    rowSelection: !propsRowSelection ? undefined : rowSelection,
    className: tableClassName,
    style: tableStyle,
    columns: counter.columns.filter(function (item) {
      // 删掉不应该显示的
      var key = item.key,
          dataIndex = item.dataIndex;
      var columnKey = genColumnKey(key, dataIndex);

      if (!columnKey) {
        return true;
      }

      var config = counter.columnsMap[columnKey];
      return !(config && config.show === false);
    }),
    loading: action.loading || props.loading,
    dataSource: dataSource,
    pagination: pagination,
    onChange: function onChange(changePagination, filters, sorter, extra) {
      if (rest.onChange) {
        rest.onChange(changePagination, filters, sorter, extra);
      } // 制造筛选的数据


      setProFilter(removeObjectNull(filters)); // 制造一个排序的数据

      if (Array.isArray(sorter)) {
        var data = sorter.reduce(function (pre, value) {
          if (!value.order) {
            return pre;
          }

          return _objectSpread(_objectSpread({}, pre), {}, _defineProperty({}, "".concat(value.field), value.order));
        }, {});
        setProSort(data);
      } else if (sorter.order) {
        setProSort(_defineProperty({}, "".concat(sorter.field), sorter.order));
      }
    }
  })))));
};
/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */


var ProviderWarp = function ProviderWarp(props) {
  return React.createElement(Container.Provider, {
    initialState: props
  }, React.createElement(ConfigConsumer, null, function (_ref5) {
    var getPrefixCls = _ref5.getPrefixCls;
    return React.createElement(IntlConsumer, null, function (value) {
      return React.createElement(IntlProvider, {
        value: value
      }, React.createElement(ErrorBoundary, null, React.createElement(PowerList, Object.assign({
        defaultClassName: getPrefixCls('pro-table')
      }, props))));
    });
  }));
};

export default ProviderWarp;