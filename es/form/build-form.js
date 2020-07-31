import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/space/style";
import _Space from "antd/es/space";
import "antd/es/message/style";
import _message from "antd/es/message";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";
import "antd/es/time-picker/style";
import _TimePicker from "antd/es/time-picker";
import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import "antd/es/radio/style";
import _Radio from "antd/es/radio";
import "antd/es/select/style";
import _Select from "antd/es/select";
import "antd/es/form/style";
import _Form from "antd/es/form";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import _ from 'lodash';
import { numberRegex } from '../utils/regex';
import PowerDatePicker from '../power-date-picker'; // import {StatusType} from "@/components/PowerList/component/status";

import SearchInput from '../search-input';
import PowerText from '../power-text';
import { useIntl } from '../intl-context';
import { useDeepCompareEffect } from '../power-list/component/util';
var defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6
};
export function BuildForm(props) {
  var form = props.form,
      formSize = props.size,
      originColumns = props.columns,
      onChange = props.onChange,
      onSubmit = props.onSubmit,
      onSuccess = props.onSuccess,
      loadingText = props.loadingText,
      itemColSpan = props.itemColSpan,
      request = props.request;

  var _ref = form || {},
      formLayout = _ref.layout,
      formLabelCol = _ref.labelCol,
      formWrapperCol = _ref.wrapperCol,
      formInitialValues = _ref.initialValues;

  var columns = _.orderBy(originColumns, 'buildFormOrder', 'desc');

  var labelCol = formLabelCol || {
    span: 4
  };
  var wrapperCol = formWrapperCol || {
    span: 24
  };
  var layout = formLayout || 'horizontal';
  var initialValues = formInitialValues || {};
  var size = formSize || 'middle';
  var itemCol = _.isNumber(itemColSpan) ? {
    span: itemColSpan
  } : defaultColConfig; // 使用表单hooks

  var _Form$useForm = _Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      formHook = _Form$useForm2[0]; // 国际化hooks


  var intl = useIntl(); // 定义类型

  var selfType = 'form'; // 保存表单值, 也可触发rerender

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      formValues = _useState2[0],
      setFormValues = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      submitting = _useState4[0],
      setSubmitting = _useState4[1];

  useDeepCompareEffect(function () {
    // 初始值不同时，需要更新进form
    setFormValues(initialValues);
    formHook.resetFields();
  }, [initialValues]); // 接管表单的字段变化，将此方法绑定在所有子Item的change中，实现受控

  var onFormValueChange = function onFormValueChange() {
    var values = formHook.getFieldsValue();
    setFormValues(values);

    if (_.isFunction(onChange)) {
      onChange(formValues);
    }
  }; // 暴露的外部onChange回调
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  var onCallbackChange = function onCallbackChange(dataIndex, value) {// TODO: 暂无特殊处理
  }; // 渲染表单项


  var renderFormItem = function renderFormItem(item) {
    if (_.isFunction(item.renderBuildFormItem)) {
      var dataIndex = item.dataIndex;
      var config = {
        defaultRender: function defaultRender(columnItem) {
          return React.createElement("span", null, columnItem.label, " \u6CA1\u6709\u5F97\u5230\u6B63\u786E\u6E32\u67D3\uFF0C\u8BF7\u68C0\u67E5\u4EE3\u7801");
        },
        onChange: function onChange(value) {
          onCallbackChange(dataIndex, value);
        },
        onSelect: function onSelect(value) {
          onCallbackChange(dataIndex, value);
        },
        type: selfType,
        value: _.get(formHook.getFieldsValue(), "".concat(dataIndex))
      }; // 调用item自己的渲染

      return item.renderBuildFormItem(item, config, formHook);
    } // 取extra props


    var extraProps = item.buildFormItemExtraProps || {};

    if (!_.isEmpty(item.valueEnum)) {
      // eslint-disable-next-line no-shadow
      var options = _.map(_.entries(item.valueEnum), function (item) {
        var _item = _slicedToArray(item, 2),
            value = _item[0],
            label = _item[1]; // 由于select需要精确类型匹配，如果是数字，需要精确


        return React.createElement(_Select.Option, {
          value: numberRegex.test(value) ? _.toNumber(value) : value,
          key: value
        }, label.text);
      });

      return React.createElement(_Select, Object.assign({}, extraProps, {
        onChange: onFormValueChange
      }), options);
    } // 单选框，直接渲染


    if (!_.isEmpty(item.radioEnum)) {
      var _options = _.map(_.entries(item.radioEnum), function (radio) {
        var _radio = _slicedToArray(radio, 2),
            value = _radio[0],
            label = _radio[1]; // 由于select需要精确类型匹配，如果是数字，需要精确


        return React.createElement(_Radio, {
          value: numberRegex.test(value) ? _.toNumber(value) : value,
          key: value
        }, label);
      });

      return React.createElement(_Radio.Group, Object.assign({}, extraProps, {
        onChange: onFormValueChange
      }), _options);
    } // 下拉选择框


    if (!_.isEmpty(item.selectEnum)) {
      var _options2 = _.map(_.entries(item.selectEnum), function (select) {
        var _select = _slicedToArray(select, 2),
            value = _select[0],
            label = _select[1]; // 转化为数字


        return React.createElement(_Select.Option, {
          value: numberRegex.test(value) ? _.toNumber(value) : value,
          key: "".concat(item.title, "-").concat(value)
        }, label);
      });

      return React.createElement(_Select, Object.assign({}, extraProps), _options2);
    } // 取两种类型之一


    var valueType = item.buildFormValueType || item.valueType;

    switch (valueType) {
      case 'money':
        return React.createElement(_InputNumber, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'time':
        return React.createElement(_TimePicker, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'date':
        return React.createElement(PowerDatePicker, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'dateTime':
        return React.createElement(PowerDatePicker, Object.assign({}, extraProps, {
          showTime: true,
          onChange: onFormValueChange
        }));

      case 'dateTimeRange':
        return React.createElement(_DatePicker.RangePicker, Object.assign({}, extraProps, {
          placeholder: [intl.formatMessage('tableForm.selectPlaceholder', {
            title: item.title
          }, '请选择'), intl.formatMessage('tableForm.selectPlaceholder', {
            title: item.title
          }, '请选择')]
        }));

      case 'textarea':
        return React.createElement(_Input.TextArea, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'searchInput':
        return React.createElement(SearchInput, Object.assign({}, extraProps));

      case 'powerText':
        return React.createElement(PowerText, Object.assign({}, extraProps));

      case 'password':
        return React.createElement(_Input.Password, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      default:
        // @ts-ignore
        return React.createElement(_Input, Object.assign({
          autoComplete: "off"
        }, extraProps, {
          onChange: onFormValueChange
        }));
    }
  }; // submit动作，分用户是否自定义了submit钩子两种情况


  var formSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var values, text, hide;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // 设置提交loading
              setSubmitting(true);
              _context.next = 4;
              return formHook.validateFields();

            case 4:
              values = _context.sent;
              text = loadingText || intl.getMessage('tableForm.submitting', '提交中...');
              hide = _message.loading(text); // const values = formHook.getFieldsValue();

              if (!_.isFunction(onSubmit)) {
                _context.next = 19;
                break;
              }

              _context.prev = 8;
              _context.next = 11;
              return onSubmit(values);

            case 11:
              setTimeout(function () {
                if (_.isFunction(onSuccess)) {
                  onSuccess();
                }
              });
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](8);
              // eslint-disable-next-line no-console
              console.error(_context.t0);

            case 17:
              _context.next = 30;
              break;

            case 19:
              if (!_.isFunction(request)) {
                _context.next = 30;
                break;
              }

              _context.prev = 20;
              _context.next = 23;
              return request(values);

            case 23:
              _message.success(intl.getMessage('tableForm.submitSuccess', '提交成功'));

              setTimeout(function () {
                if (_.isFunction(onSuccess)) {
                  onSuccess();
                }
              });
              _context.next = 30;
              break;

            case 27:
              _context.prev = 27;
              _context.t1 = _context["catch"](20);
              // eslint-disable-next-line no-console
              console.error(_context.t1);

            case 30:
              setSubmitting(false);
              hide();
              _context.next = 37;
              break;

            case 34:
              _context.prev = 34;
              _context.t2 = _context["catch"](0);
              console.error(_context.t2);

            case 37:
              _context.prev = 37;
              setSubmitting(false);
              return _context.finish(37);

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 34, 37, 40], [8, 14], [20, 27]]);
    }));

    return function formSubmit() {
      return _ref2.apply(this, arguments);
    };
  }(); // 预设的渲染表单动作，关于表单动作，如用户不自定义，则仅有重置和提交


  var renderFormAction = function renderFormAction() {
    return React.createElement(_Form.Item, {
      style: {
        textAlign: 'right'
      }
    }, React.createElement(_Space, null, React.createElement(_Button, {
      onClick: function onClick() {
        // 重置清空
        formHook.resetFields();
      }
    }, intl.getMessage('tableForm.reset', '重置')), React.createElement(_Button, {
      type: "primary",
      htmlType: "submit",
      disabled: submitting,
      loading: submitting,
      onClick: formSubmit
    }, intl.getMessage('tableForm.submit', '提交'))));
  };

  return React.createElement("div", null, React.createElement(_Form, {
    layout: layout,
    labelCol: labelCol,
    wrapperCol: wrapperCol,
    initialValues: initialValues,
    size: size,
    form: formHook
  }, React.createElement(_Row, {
    gutter: 16,
    justify: "start"
  }, _.map(columns, function (item) {
    // 判断是否显示
    if (_.isFunction(item.buildFormIsRenderItem)) {
      if (!item.buildFormIsRenderItem(formHook)) {
        return false;
      }
    }

    if (_.isBoolean(item.buildFormIsRenderItem)) {
      if (item.buildFormIsRenderItem) {
        return false;
      }
    } // form隐藏或者类型是操作的，不创建


    if (item.hideInForm || item.valueType === 'option') {
      return false;
    } // 样式上的隐藏


    var hide = item.buildFormHideItem;

    if (_.isFunction(item.buildFormHideItem)) {
      hide = item.buildFormHideItem(formHook);
    }

    var rules = item.rules || []; // 在设置了必填样式时，帮忙填充一条必填规则

    if (item.required) {
      var requiredItem = {
        required: true
      };
      rules.push(requiredItem);
    } // 如果没有placeholder,则为其插入默认的,可配置国际化


    if (!_.get(item, 'buildFormItemExtraProps.placeholder')) {
      var placeholder = '';
      var msgId = 'tableForm.inputPlaceholder';
      var selectType = ['searchInput', 'date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'];

      if (_.get(item, 'valueEnum') || _.get(item, 'radioEnum') || _.get(item, 'selectEnum')) {
        msgId = 'tableForm.selectPlaceholder';
      }

      if (_.includes(selectType, _.get(item, 'buildFormValueType'))) {
        msgId = 'tableForm.selectPlaceholder';
      }

      placeholder = intl.formatMessage(msgId, {
        title: item.title
      }, msgId);

      _.set(item, 'buildFormItemExtraProps.placeholder', placeholder);
    }

    var dataIndex = _.get(item, 'dataIndex');

    if (_.includes(_.toString(item.dataIndex), '.')) {
      dataIndex = _.split(_.toString(item.dataIndex), '.');
    }

    return React.createElement(_Col, Object.assign({}, itemCol, {
      className: hide ? 'eom-hide' : '',
      key: "form_".concat(item.title, "_").concat(item.dataIndex, "_")
    }), React.createElement(_Form.Item, {
      rules: rules,
      required: item.required,
      name: dataIndex,
      label: item.title
    }, renderFormItem(item)));
  })), renderFormAction()));
}