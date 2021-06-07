import React from 'react';
import { DatePicker } from 'antd';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { DatePickerProps } from 'antd/lib/date-picker/index';

export function PowerDatePicker(props: DatePickerProps) {
  const { value, onChange, ...other } = props;
  // eslint-disable-next-line no-nested-ternary
  const time = moment.isMoment(value)? value : (value ? moment(value) : undefined);
  const triggerChange = (_value: Moment | null, dateStr: string) => {
    if (_.isFunction(onChange)) {
      onChange(_value, dateStr);
    }
  };

  return <DatePicker value={time} onChange={triggerChange} {...other} allowClear={false} />;
}

export default PowerDatePicker;
