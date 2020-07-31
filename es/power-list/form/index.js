import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import "antd/es/time-picker/style";
import _TimePicker from "antd/es/time-picker";
import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/select/style";
import _Select from "antd/es/select";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';
import RcResizeObserver from 'rc-resize-observer'; // @ts-ignore

import useMediaQuery from 'use-media-antd-query';
import useMergeValue from 'use-merge-value';
import { ConfigConsumer } from "antd/es/config-provider";
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { parsingValueEnumToArray, useDeepCompareEffect, genColumnKey, ObjToMap } from '../component/util';
import { useIntl } from '../../intl-context';
import Container from '../container';
import FormOption from './form-option';
import './index.less';
/**
 * 默认的查询表单配置
 */

var defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6
};
/**
 * 默认的新建表单配置
 */

var defaultFormColConfig = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  xxl: 24
};
/**
 * 获取最后一行的 offset，保证在最后一列
 * @param length
 * @param span
 */

var getOffset = function getOffset(length) {
  var span = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  var cols = 24 / span;
  return (cols - 1 - length % cols) * span;
};
/**
 * 默认的设置
 */


var defaultSearch = {
  searchText: '查询',
  resetText: '重置',
  span: defaultColConfig,
  collapseRender: function collapseRender(collapsed) {
    return collapsed ? '展开' : '收起';
  }
};
export var FormInputRender = function FormInputRender(props) {
  var item = props.item,
      intl = props.intl,
      form = props.form,
      type = props.type,
      rest = _objectWithoutProperties(props, ["item", "intl", "form", "type"]);

  var itemValueType = item.valueType; // if function， run it

  var valueType = typeof itemValueType === 'function' ? itemValueType({}) : itemValueType;
  /**
   * 自定义 render
   */

  if (item.renderFormItem) {
    /**
     *删除 renderFormItem 防止重复的 dom 渲染
     */
    var renderFormItem = item.renderFormItem,
        restItem = _objectWithoutProperties(item, ["renderFormItem"]);

    var defaultRender = function defaultRender(newItem) {
      return React.createElement(FormInputRender, Object.assign({}, _objectSpread(_objectSpread({}, props), {}, {
        item: newItem
      }) || null));
    }; // 自动注入 onChange 和 value,用户自己很有肯能忘记


    var dom = renderFormItem(restItem, _objectSpread(_objectSpread({}, rest), {}, {
      type: type,
      defaultRender: defaultRender
    }), form); // 有可能不是不是一个组件

    if (!React.isValidElement(dom)) {
      return dom;
    }

    var defaultProps = dom.props; // 已用户的为主，不然过于 magic

    return React.cloneElement(dom, _objectSpread(_objectSpread({}, rest), defaultProps));
  }

  if (!valueType || valueType === 'text') {
    var valueEnum = item.valueEnum;

    if (valueEnum) {
      return React.createElement(_Select, Object.assign({
        clearIcon: true,
        placeholder: intl.formatMessage('tableForm.selectPlaceholder', {
          title: item.title
        }, '请选择')
      }, rest, item.formItemProps), parsingValueEnumToArray(ObjToMap(valueEnum)).map(function (_ref) {
        var value = _ref.value,
            text = _ref.text;
        return React.createElement(_Select.Option, {
          key: value,
          value: value
        }, text);
      }));
    }

    return React.createElement(_Input, Object.assign({
      placeholder: intl.formatMessage('tableForm.inputPlaceholder', {
        title: item.title
      }, '请输入')
    }, rest, item.formItemProps));
  }

  if (valueType === 'date') {
    return React.createElement(_DatePicker, Object.assign({
      placeholder: intl.formatMessage('tableForm.selectPlaceholder', {
        title: item.title
      }, '请选择'),
      style: {
        width: '100%'
      }
    }, rest, item.formItemProps));
  }

  if (valueType === 'dateTime') {
    return React.createElement(_DatePicker, Object.assign({
      showTime: true,
      placeholder: intl.formatMessage('tableForm.selectPlaceholder', {
        title: item.title
      }, '请选择'),
      style: {
        width: '100%'
      }
    }, rest, item.formItemProps));
  }

  if (valueType === 'dateRange') {
    return React.createElement(_DatePicker.RangePicker, Object.assign({
      placeholder: [intl.formatMessage('tableForm.selectPlaceholder', {
        title: item.title
      }, '请选择'), intl.formatMessage('tableForm.selectPlaceholder', {
        title: item.title
      }, '请选择')],
      style: {
        width: '100%'
      }
    }, rest, item.formItemProps));
  }

  if (valueType === 'dateTimeRange') {
    return React.createElement(_DatePicker.RangePicker, Object.assign({
      showTime: true,
      placeholder: [intl.formatMessage('tableForm.selectPlaceholder', {
        title: item.title
      }, '请选择'), intl.formatMessage('tableForm.selectPlaceholder', {
        title: item.title
      }, '请选择')],
      style: {
        width: '100%'
      }
    }, rest, item.formItemProps));
  }

  if (valueType === 'time') {
    return React.createElement(_TimePicker, Object.assign({
      placeholder: intl.formatMessage('tableForm.selectPlaceholder', {
        title: item.title
      }, '请选择'),
      style: {
        width: '100%'
      }
    }, rest, item.formItemProps));
  }

  if (valueType === 'digit') {
    return React.createElement(_InputNumber, Object.assign({
      placeholder: intl.formatMessage('tableForm.inputPlaceholder', {
        title: item.title
      }, '请输入'),
      style: {
        width: '100%'
      }
    }, rest, item.formItemProps));
  }

  if (valueType === 'money') {
    return React.createElement(_InputNumber, Object.assign({
      min: 0,
      precision: 2,
      formatter: function formatter(value) {
        if (value) {
          return "".concat(intl.getMessage('moneySymbol', '￥'), " ").concat(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        return '';
      },
      parser: function parser(value) {
        return value ? value.replace(new RegExp("\\".concat(intl.getMessage('moneySymbol', '￥'), "\\s?|(,*)"), 'g'), '') : '';
      },
      placeholder: intl.formatMessage('tableForm.inputPlaceholder', {
        title: item.title
      }, '请输入'),
      style: {
        width: '100%'
      }
    }, rest, item.formItemProps));
  }

  if (valueType === 'textarea' && type === 'form') {
    return React.createElement(_Input.TextArea, Object.assign({
      placeholder: intl.formatMessage('tableForm.inputPlaceholder', {
        title: item.title
      }, '请输入')
    }, rest, item.formItemProps));
  }

  return React.createElement(_Input, Object.assign({
    placeholder: intl.formatMessage('tableForm.inputPlaceholder', {
      title: item.title
    }, '请输入')
  }, rest, item.formItemProps));
};
export var proFormItemRender = function proFormItemRender(_ref2) {
  var item = _ref2.item,
      intl = _ref2.intl,
      formInstance = _ref2.formInstance,
      type = _ref2.type,
      isForm = _ref2.isForm,
      colConfig = _ref2.colConfig;

  var valueType = item.valueType,
      dataIndex = item.dataIndex,
      valueEnum = item.valueEnum,
      renderFormItem = item.renderFormItem,
      render = item.render,
      hideInForm = item.hideInForm,
      hideInSearch = item.hideInSearch,
      hideInTable = item.hideInTable,
      renderText = item.renderText,
      order = item.order,
      initialValue = item.initialValue,
      ellipsis = item.ellipsis,
      formItemProps = item.formItemProps,
      index = item.index,
      formItemName = item.formItemName,
      rest = _objectWithoutProperties(item, ["valueType", "dataIndex", "valueEnum", "renderFormItem", "render", "hideInForm", "hideInSearch", "hideInTable", "renderText", "order", "initialValue", "ellipsis", "formItemProps", "index", "formItemName"]);

  var key = genColumnKey(rest.key, dataIndex, index);
  var dom = React.createElement(FormInputRender, {
    item: item,
    type: type,
    intl: intl,
    form: formInstance
  });

  if (!dom) {
    return null;
  } // 支持 function 的 title


  var getTitle = function getTitle() {
    if (rest.title && typeof rest.title === 'function') {
      return rest.title(item, 'form');
    }

    return rest.title;
  };

  var name = Array.isArray(dataIndex) ? dataIndex : key;

  if (formItemName) {
    name = formItemName;
  }

  return React.createElement(_Col, Object.assign({}, colConfig, {
    key: key
  }), React.createElement(_Form.Item, Object.assign({
    labelAlign: "right",
    label: getTitle(),
    name: name
  }, isForm && rest), dom));
};
var dateFormatterMap = {
  time: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateRange: 'YYYY-MM-DD',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss'
};
/**
 * 判断 DataType 是不是日期类型
 * @param type
 */

var isDateValueType = function isDateValueType(type) {
  var valueType = type;

  if (typeof type === 'function') {
    // 如果是 object 说明是进度条，直接返回 false
    if (_typeof(type({})) === 'object') {
      return false;
    }

    valueType = type({});
  }

  var dateTypes = ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'];
  return dateTypes.includes(valueType);
};
/**
 * 这里主要是来转化一下数据
 * 将 moment 转化为 string
 * 将 all 默认删除
 * @param value
 * @param dateFormatter
 * @param PowerColumnsMap
 */


var conversionValue = function conversionValue(value, dateFormatter, PowerColumnsMap) {
  var tmpValue = {};
  Object.keys(value).forEach(function (key) {
    var column = PowerColumnsMap[key || 'null'] || {};
    var valueType = column.valueType || 'text';
    var itemValue = value[key]; // 如果值是 "all"，或者不存在直接删除
    // 下拉框里选 all，会删除

    if (itemValue === undefined || itemValue === 'all' && column.valueEnum) {
      return;
    } // 如果是日期，再处理这些


    if (!isDateValueType(valueType)) {
      tmpValue[key] = itemValue;
      return;
    } // 如果是 moment 的对象的处理方式
    // 如果执行到这里，肯定是 ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'] 之一


    if (moment.isMoment(itemValue) && dateFormatter) {
      if (dateFormatter === 'string') {
        var formatString = dateFormatterMap[valueType];
        tmpValue[key] = itemValue.format(formatString || 'YYYY-MM-DD HH:mm:ss');
        return;
      }

      if (dateFormatter === 'number') {
        tmpValue[key] = itemValue.valueOf();
        return;
      }
    } // 这里是日期数组


    if (Array.isArray(itemValue) && itemValue.length === 2 && dateFormatter) {
      if (dateFormatter === 'string') {
        var _formatString = dateFormatterMap[valueType];

        var _itemValue = _slicedToArray(itemValue, 2),
            startValue = _itemValue[0],
            endValue = _itemValue[1];

        tmpValue[key] = [moment(startValue).format(_formatString || 'YYYY-MM-DD HH:mm:ss'), moment(endValue).format(_formatString || 'YYYY-MM-DD HH:mm:ss')];
        return;
      }

      if (dateFormatter === 'number') {
        var _itemValue2 = _slicedToArray(itemValue, 2),
            _startValue = _itemValue2[0],
            _endValue = _itemValue2[1];

        tmpValue[key] = [moment(_startValue).valueOf(), moment(_endValue).valueOf()];
      }
    } // 都没命中，原样返回


    tmpValue[key] = itemValue;
  });
  return tmpValue;
};

var getDefaultSearch = function getDefaultSearch(search, intl, isForm) {
  var config = {
    collapseRender: function collapseRender(collapsed) {
      if (collapsed) {
        return React.createElement(React.Fragment, null, intl.getMessage('tableForm.collapsed', '展开'), React.createElement(DownOutlined, {
          style: {
            marginLeft: '0.5em',
            transition: '0.3s all',
            transform: "rotate(".concat(collapsed ? 0 : 0.5, "turn)")
          }
        }));
      }

      return React.createElement(React.Fragment, null, intl.getMessage('tableForm.expand', '收起'), React.createElement(DownOutlined, {
        style: {
          marginLeft: '0.5em',
          transition: '0.3s all',
          transform: "rotate(".concat(collapsed ? 0 : 0.5, "turn)")
        }
      }));
    },
    searchText: intl.getMessage('tableForm.search', defaultSearch.searchText || '查询'),
    resetText: intl.getMessage('tableForm.reset', defaultSearch.resetText || '重置'),
    submitText: intl.getMessage('tableForm.submit', defaultSearch.submitText || '提交'),
    span: isForm ? defaultFormColConfig : defaultColConfig
  };

  if (search === undefined || search === true) {
    return config;
  }

  return _objectSpread(_objectSpread({}, config), search);
};
/**
 * 合并用户和默认的配置
 * @param span
 * @param size
 */


var getSpanConfig = function getSpanConfig(span, size) {
  if (typeof span === 'number') {
    return span;
  }

  var config = _objectSpread(_objectSpread({}, defaultColConfig), span);

  return config[size];
};

var FormSearch = function FormSearch(_ref3) {
  var onSubmit = _ref3.onSubmit,
      formRef = _ref3.formRef,
      _ref3$dateFormatter = _ref3.dateFormatter,
      dateFormatter = _ref3$dateFormatter === void 0 ? 'string' : _ref3$dateFormatter,
      propsSearch = _ref3.search,
      type = _ref3.type,
      _ref3$form = _ref3.form,
      formConfig = _ref3$form === void 0 ? {} : _ref3$form,
      onReset = _ref3.onReset;

  /**
   * 为了支持 dom 的消失，支持了这个 api
   */
  var intl = useIntl();

  var _Form$useForm = _Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var formInstanceRef = useRef();
  var searchConfig = getDefaultSearch(propsSearch, intl, type === 'form');
  var span = searchConfig.span;
  var counter = Container.useContainer();

  var _useMergeValue = useMergeValue(true, {
    value: searchConfig.collapsed,
    onChange: searchConfig.onCollapse
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      collapse = _useMergeValue2[0],
      setCollapse = _useMergeValue2[1];

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      PowerColumnsMap = _useState2[0],
      setPowerColumnsMap = _useState2[1];

  var windowSize = useMediaQuery();

  var _useState3 = useState(getSpanConfig(span || 8, windowSize)),
      _useState4 = _slicedToArray(_useState3, 2),
      colSize = _useState4[0],
      setColSize = _useState4[1];

  var _useState5 = useState(88),
      _useState6 = _slicedToArray(_useState5, 2),
      formHeight = _useState6[0],
      setFormHeight = _useState6[1];

  var rowNumber = 24 / colSize || 3;
  var isForm = type === 'form';
  /**
   *提交表单，根据两种模式不同，方法不相同
   */

  var _submit = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var value, _value;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (isForm) {
                _context.next = 4;
                break;
              }

              value = form.getFieldsValue();

              if (onSubmit) {
                onSubmit(conversionValue(value, dateFormatter, PowerColumnsMap));
              }

              return _context.abrupt("return");

            case 4:
              _context.prev = 4;
              _context.next = 7;
              return form.validateFields();

            case 7:
              _value = _context.sent;

              if (onSubmit) {
                onSubmit(conversionValue(_value, dateFormatter, PowerColumnsMap));
              }

              _context.next = 13;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](4);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 11]]);
    }));

    return function submit() {
      return _ref4.apply(this, arguments);
    };
  }();

  useEffect(function () {
    if (!formRef) {
      return;
    }

    if (typeof formRef === 'function') {
      formRef(form);
    }

    if (formRef && typeof formRef !== 'function') {
      // eslint-disable-next-line no-param-reassign
      formRef.current = _objectSpread(_objectSpread({}, form), {}, {
        submit: function submit() {
          _submit();

          form.submit();
        }
      });
    }
  }, []);
  useEffect(function () {
    setColSize(getSpanConfig(span || 8, windowSize));
  }, [windowSize]);
  useDeepCompareEffect(function () {
    var tempMap = {};
    counter.powerColumns.forEach(function (item) {
      tempMap[genColumnKey(item.key, item.dataIndex, item.index) || 'null'] = item;
    });
    setPowerColumnsMap(tempMap);
  }, [counter.powerColumns]);
  var columnsList = counter.powerColumns.filter(function (item) {
    var valueType = item.valueType;

    if (item.hideInSearch && type !== 'form') {
      return false;
    }

    if (type === 'form' && item.hideInForm) {
      return false;
    }

    if (valueType !== 'index' && valueType !== 'indexBorder' && valueType !== 'option' && (item.key || item.dataIndex)) {
      return true;
    }

    return false;
  }).sort(function (a, b) {
    if (a && b) {
      return (b.order || 0) - (a.order || 0);
    }

    if (a && a.order) {
      return -1;
    }

    if (b && b.order) {
      return 1;
    }

    return 0;
  });
  var colConfig = typeof span === 'number' ? {
    span: span
  } : span; // 这么做是为了在用户修改了输入的时候触发一下子节点的render

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      updateState = _React$useState2[1];

  var forceUpdate = useCallback(function () {
    return updateState({});
  }, []);
  var domList = formInstanceRef.current ? columnsList.map(function (item) {
    return proFormItemRender({
      isForm: isForm,
      formInstance: formInstanceRef.current,
      item: item,
      type: type,
      colConfig: colConfig,
      intl: intl
    });
  }).filter(function (_, index) {
    return collapse && type !== 'form' ? index < (rowNumber - 1 || 1) : true;
  }).filter(function (item) {
    return !!item;
  }) : [];
  return React.createElement(ConfigConsumer, null, function (_ref5) {
    var getPrefixCls = _ref5.getPrefixCls;
    var className = getPrefixCls('pro-table-search');
    var formClassName = getPrefixCls('pro-table-form');
    return React.createElement("div", {
      className: classNames(className, _defineProperty({}, formClassName, isForm)),
      style: isForm ? undefined : {
        height: formHeight
      }
    }, React.createElement(RcResizeObserver, {
      onResize: function onResize(_ref6) {
        var height = _ref6.height;

        if (type === 'form') {
          return;
        }

        setFormHeight(height + 24);
      }
    }, React.createElement("div", null, React.createElement(_Form, Object.assign({}, formConfig, {
      form: form,
      onValuesChange: function onValuesChange() {
        return forceUpdate();
      },
      initialValues: columnsList.reduce(function (pre, item) {
        var key = genColumnKey(item.key, item.dataIndex, item.index) || '';

        if (item.initialValue) {
          return _objectSpread(_objectSpread({}, pre), {}, _defineProperty({}, key, item.initialValue));
        }

        return pre;
      }, _objectSpread({}, formConfig.initialValues))
    }), React.createElement(_Form.Item, {
      shouldUpdate: true,
      noStyle: true
    }, function (formInstance) {
      // @ts-ignore
      formInstanceRef.current = formInstance;
      return null;
    }), React.createElement(_Row, {
      gutter: 16,
      justify: "start"
    }, React.createElement(_Form.Item, {
      label: isForm && ' ',
      shouldUpdate: true,
      noStyle: true
    }, React.createElement(React.Fragment, null, domList)), React.createElement(_Col, Object.assign({}, colConfig, {
      offset: getOffset(domList.length, colSize),
      key: "option",
      className: classNames("".concat(className, "-option"), _defineProperty({}, "".concat(className, "-form-option"), isForm))
    }), React.createElement(_Form.Item, {
      label: isForm && ' '
    }, React.createElement(FormOption, {
      showCollapseButton: columnsList.length > rowNumber - 1 && !isForm,
      searchConfig: searchConfig,
      submit: _submit,
      onReset: onReset,
      form: _objectSpread(_objectSpread({}, form), {}, {
        submit: function submit() {
          _submit();

          form.submit();
        }
      }),
      type: type,
      collapse: collapse,
      setCollapse: setCollapse
    }))))))));
  });
};

export default FormSearch;