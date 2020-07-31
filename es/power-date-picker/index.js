import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import _ from 'lodash';
import moment from 'moment';

function PowerDatePicker(props) {
  var value = props.value,
      onChange = props.onChange,
      other = _objectWithoutProperties(props, ["value", "onChange"]);

  var time = value ? moment(value) : undefined;

  var triggerChange = function triggerChange(_value, dateStr) {
    if (_.isFunction(onChange)) {
      // 将参数反转， 忽略掉这个提示
      // @ts-ignore
      onChange(dateStr, _value);
    }
  };

  return React.createElement(_DatePicker, Object.assign({
    defaultValue: time,
    onChange: triggerChange
  }, other));
}

export default PowerDatePicker;