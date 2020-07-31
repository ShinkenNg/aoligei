import React from 'react';
import { DatePicker } from 'antd';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { DatePickerProps } from 'antd/lib/date-picker/index';

function PowerDatePicker(props: DatePickerProps) {
  const { value, onChange, ...other } = props;
  const time = value ? moment(value) : undefined;
  const triggerChange = (_value: Moment | null, dateStr: string) => {
    if (_.isFunction(onChange)) {
      // 将参数反转， 忽略掉这个提示
      // @ts-ignore
      onChange(dateStr, _value);
    }
  };

  return <DatePicker defaultValue={time} onChange={triggerChange} {...other} />;
}

export default PowerDatePicker;
