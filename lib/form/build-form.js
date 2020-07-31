"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildForm = BuildForm;

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/space/style");

var _space = _interopRequireDefault(require("antd/lib/space"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

require("antd/lib/radio/style");

var _radio2 = _interopRequireDefault(require("antd/lib/radio"));

require("antd/lib/select/style");

var _select2 = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _regex = require("../utils/regex");

var _powerDatePicker = _interopRequireDefault(require("../power-date-picker"));

var _searchInput = _interopRequireDefault(require("../search-input"));

var _powerText = _interopRequireDefault(require("../power-text"));

var _intlContext = require("../intl-context");

var _util = require("../power-list/component/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6
};

function BuildForm(props) {
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

  var columns = _lodash.default.orderBy(originColumns, 'buildFormOrder', 'desc');

  var labelCol = formLabelCol || {
    span: 4
  };
  var wrapperCol = formWrapperCol || {
    span: 24
  };
  var layout = formLayout || 'horizontal';
  var initialValues = formInitialValues || {};
  var size = formSize || 'middle';
  var itemCol = _lodash.default.isNumber(itemColSpan) ? {
    span: itemColSpan
  } : defaultColConfig; // 使用表单hooks

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      formHook = _Form$useForm2[0]; // 国际化hooks


  var intl = (0, _intlContext.useIntl)(); // 定义类型

  var selfType = 'form'; // 保存表单值, 也可触发rerender

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      formValues = _useState2[0],
      setFormValues = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      submitting = _useState4[0],
      setSubmitting = _useState4[1];

  (0, _util.useDeepCompareEffect)(function () {
    // 初始值不同时，需要更新进form
    setFormValues(initialValues);
    formHook.resetFields();
  }, [initialValues]); // 接管表单的字段变化，将此方法绑定在所有子Item的change中，实现受控

  var onFormValueChange = function onFormValueChange() {
    var values = formHook.getFieldsValue();
    setFormValues(values);

    if (_lodash.default.isFunction(onChange)) {
      onChange(formValues);
    }
  }; // 暴露的外部onChange回调
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  var onCallbackChange = function onCallbackChange(dataIndex, value) {// TODO: 暂无特殊处理
  }; // 渲染表单项


  var renderFormItem = function renderFormItem(item) {
    if (_lodash.default.isFunction(item.renderBuildFormItem)) {
      var dataIndex = item.dataIndex;
      var config = {
        defaultRender: function defaultRender(columnItem) {
          return _react.default.createElement("span", null, columnItem.label, " \u6CA1\u6709\u5F97\u5230\u6B63\u786E\u6E32\u67D3\uFF0C\u8BF7\u68C0\u67E5\u4EE3\u7801");
        },
        onChange: function onChange(value) {
          onCallbackChange(dataIndex, value);
        },
        onSelect: function onSelect(value) {
          onCallbackChange(dataIndex, value);
        },
        type: selfType,
        value: _lodash.default.get(formHook.getFieldsValue(), "".concat(dataIndex))
      }; // 调用item自己的渲染

      return item.renderBuildFormItem(item, config, formHook);
    } // 取extra props


    var extraProps = item.buildFormItemExtraProps || {};

    if (!_lodash.default.isEmpty(item.valueEnum)) {
      // eslint-disable-next-line no-shadow
      var options = _lodash.default.map(_lodash.default.entries(item.valueEnum), function (item) {
        var _item = _slicedToArray(item, 2),
            value = _item[0],
            label = _item[1]; // 由于select需要精确类型匹配，如果是数字，需要精确


        return _react.default.createElement(_select2.default.Option, {
          value: _regex.numberRegex.test(value) ? _lodash.default.toNumber(value) : value,
          key: value
        }, label.text);
      });

      return _react.default.createElement(_select2.default, Object.assign({}, extraProps, {
        onChange: onFormValueChange
      }), options);
    } // 单选框，直接渲染


    if (!_lodash.default.isEmpty(item.radioEnum)) {
      var _options = _lodash.default.map(_lodash.default.entries(item.radioEnum), function (radio) {
        var _radio = _slicedToArray(radio, 2),
            value = _radio[0],
            label = _radio[1]; // 由于select需要精确类型匹配，如果是数字，需要精确


        return _react.default.createElement(_radio2.default, {
          value: _regex.numberRegex.test(value) ? _lodash.default.toNumber(value) : value,
          key: value
        }, label);
      });

      return _react.default.createElement(_radio2.default.Group, Object.assign({}, extraProps, {
        onChange: onFormValueChange
      }), _options);
    } // 下拉选择框


    if (!_lodash.default.isEmpty(item.selectEnum)) {
      var _options2 = _lodash.default.map(_lodash.default.entries(item.selectEnum), function (select) {
        var _select = _slicedToArray(select, 2),
            value = _select[0],
            label = _select[1]; // 转化为数字


        return _react.default.createElement(_select2.default.Option, {
          value: _regex.numberRegex.test(value) ? _lodash.default.toNumber(value) : value,
          key: "".concat(item.title, "-").concat(value)
        }, label);
      });

      return _react.default.createElement(_select2.default, Object.assign({}, extraProps), _options2);
    } // 取两种类型之一


    var valueType = item.buildFormValueType || item.valueType;

    switch (valueType) {
      case 'money':
        return _react.default.createElement(_inputNumber.default, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'time':
        return _react.default.createElement(_timePicker.default, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'date':
        return _react.default.createElement(_powerDatePicker.default, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'dateTime':
        return _react.default.createElement(_powerDatePicker.default, Object.assign({}, extraProps, {
          showTime: true,
          onChange: onFormValueChange
        }));

      case 'dateTimeRange':
        return _react.default.createElement(_datePicker.default.RangePicker, Object.assign({}, extraProps, {
          placeholder: [intl.formatMessage('tableForm.selectPlaceholder', {
            title: item.title
          }, '请选择'), intl.formatMessage('tableForm.selectPlaceholder', {
            title: item.title
          }, '请选择')]
        }));

      case 'textarea':
        return _react.default.createElement(_input.default.TextArea, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      case 'searchInput':
        return _react.default.createElement(_searchInput.default, Object.assign({}, extraProps));

      case 'powerText':
        return _react.default.createElement(_powerText.default, Object.assign({}, extraProps));

      case 'password':
        return _react.default.createElement(_input.default.Password, Object.assign({}, extraProps, {
          onChange: onFormValueChange
        }));

      default:
        // @ts-ignore
        return _react.default.createElement(_input.default, Object.assign({
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
              hide = _message2.default.loading(text); // const values = formHook.getFieldsValue();

              if (!_lodash.default.isFunction(onSubmit)) {
                _context.next = 19;
                break;
              }

              _context.prev = 8;
              _context.next = 11;
              return onSubmit(values);

            case 11:
              setTimeout(function () {
                if (_lodash.default.isFunction(onSuccess)) {
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
              if (!_lodash.default.isFunction(request)) {
                _context.next = 30;
                break;
              }

              _context.prev = 20;
              _context.next = 23;
              return request(values);

            case 23:
              _message2.default.success(intl.getMessage('tableForm.submitSuccess', '提交成功'));

              setTimeout(function () {
                if (_lodash.default.isFunction(onSuccess)) {
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
    return _react.default.createElement(_form.default.Item, {
      style: {
        textAlign: 'right'
      }
    }, _react.default.createElement(_space.default, null, _react.default.createElement(_button.default, {
      onClick: function onClick() {
        // 重置清空
        formHook.resetFields();
      }
    }, intl.getMessage('tableForm.reset', '重置')), _react.default.createElement(_button.default, {
      type: "primary",
      htmlType: "submit",
      disabled: submitting,
      loading: submitting,
      onClick: formSubmit
    }, intl.getMessage('tableForm.submit', '提交'))));
  };

  return _react.default.createElement("div", null, _react.default.createElement(_form.default, {
    layout: layout,
    labelCol: labelCol,
    wrapperCol: wrapperCol,
    initialValues: initialValues,
    size: size,
    form: formHook
  }, _react.default.createElement(_row.default, {
    gutter: 16,
    justify: "start"
  }, _lodash.default.map(columns, function (item) {
    // 判断是否显示
    if (_lodash.default.isFunction(item.buildFormIsRenderItem)) {
      if (!item.buildFormIsRenderItem(formHook)) {
        return false;
      }
    }

    if (_lodash.default.isBoolean(item.buildFormIsRenderItem)) {
      if (item.buildFormIsRenderItem) {
        return false;
      }
    } // form隐藏或者类型是操作的，不创建


    if (item.hideInForm || item.valueType === 'option') {
      return false;
    } // 样式上的隐藏


    var hide = item.buildFormHideItem;

    if (_lodash.default.isFunction(item.buildFormHideItem)) {
      hide = item.buildFormHideItem(formHook);
    }

    var rules = item.rules || []; // 在设置了必填样式时，帮忙填充一条必填规则

    if (item.required) {
      var requiredItem = {
        required: true
      };
      rules.push(requiredItem);
    } // 如果没有placeholder,则为其插入默认的,可配置国际化


    if (!_lodash.default.get(item, 'buildFormItemExtraProps.placeholder')) {
      var placeholder = '';
      var msgId = 'tableForm.inputPlaceholder';
      var selectType = ['searchInput', 'date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'];

      if (_lodash.default.get(item, 'valueEnum') || _lodash.default.get(item, 'radioEnum') || _lodash.default.get(item, 'selectEnum')) {
        msgId = 'tableForm.selectPlaceholder';
      }

      if (_lodash.default.includes(selectType, _lodash.default.get(item, 'buildFormValueType'))) {
        msgId = 'tableForm.selectPlaceholder';
      }

      placeholder = intl.formatMessage(msgId, {
        title: item.title
      }, msgId);

      _lodash.default.set(item, 'buildFormItemExtraProps.placeholder', placeholder);
    }

    var dataIndex = _lodash.default.get(item, 'dataIndex');

    if (_lodash.default.includes(_lodash.default.toString(item.dataIndex), '.')) {
      dataIndex = _lodash.default.split(_lodash.default.toString(item.dataIndex), '.');
    }

    return _react.default.createElement(_col.default, Object.assign({}, itemCol, {
      className: hide ? 'eom-hide' : '',
      key: "form_".concat(item.title, "_").concat(item.dataIndex, "_")
    }), _react.default.createElement(_form.default.Item, {
      rules: rules,
      required: item.required,
      name: dataIndex,
      label: item.title
    }, renderFormItem(item)));
  })), renderFormAction()));
}