import React from 'react';
import {Input} from 'antd';
import _ from 'lodash';
import { InputProps } from 'antd/es/input';

export interface PowerInputNumber extends Omit<InputProps, 'onChange'>{
  precision?: number;
  onChange?: (value?: any) => void;
}

const numberRegexp = /[^\d.]/g;

export function PowerInputNumber(props: PowerInputNumber) {
  const {value, onChange, precision = 0, ...rest} = props;
  // 构建精度match的正则表达式
  const precisionRegexp = new RegExp(`^\\d+(?:\\.\\d{0,${precision}})?`);

  const format = (val: any) => {
    let valueYes = _.toString(val).replace(numberRegexp, '') || '';
    // 替换非数字
    valueYes = valueYes.replace(numberRegexp, '');
    // 匹配精度并返回number
    return valueYes.match(precisionRegexp);
  }

  const handleChangeWithFormat = (event: { target: any; }) => {
    const val = format(event.target.value);
    if (_.isFunction(onChange)) {
      onChange(val);
    }
  }

  const handleChangeToNumber = (event: { target: any; }) => {
    const val = format(event.target.value);
    if (_.isFunction(onChange)) {
      onChange(Number(val));
    }
  }

  return (
    <Input
      {...rest}
      value={value}
      onChange={handleChangeWithFormat}
      onBlur={handleChangeToNumber}
    />
  )
}

export default PowerInputNumber;
