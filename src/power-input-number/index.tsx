import React, { FocusEventHandler } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import { InputProps } from 'antd/es/input';

export interface PowerInputNumber extends Omit<InputProps, 'onChange' | 'onBlur'> {
  precision?: number;
  onChange?: (value?: any) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
}

const numberRegexp = /[^\d.]/g;

export function PowerInputNumber(props: PowerInputNumber) {
  const { value, onChange, onBlur, precision = 0, min, max, ...rest } = props;
  // 构建精度match的正则表达式
  const precisionRegexp = new RegExp(`^\\d+(?:\\.\\d{0,${precision}})?`);

  const format = (val: any) => {
    let checkVal = val;
    if (_.isNumber(min)) {
      if (checkVal < min) {
        checkVal = min;
      }
    }
    if (_.isNumber(max)) {
      if (checkVal > max) {
        checkVal = max;
      }
    }
    let valueYes = _.toString(checkVal).replace(numberRegexp, '') || '';

    // 替换非数字
    valueYes = valueYes.replace(numberRegexp, '');
    // 匹配精度并返回number
    return valueYes.match(precisionRegexp);
  };

  const handleChangeToNumber = (event: { target: any; }, toNumber?: boolean) => {
    const val = format(event.target.value);
    if (_.isFunction(onChange)) {
      if (_.isBoolean(toNumber) && toNumber) {
        onChange(Number(val));
      } else {
        onChange(val);
      }
    }
  };

  return (
    <Input
      {...rest}
      value={value}
      onChange={handleChangeToNumber}
      onBlur={(e) => {
        // 移除焦点时，一定要转换成number
        handleChangeToNumber(e, true);
        if (_.isFunction(onBlur)) {
          onBlur(e);
        }
      }}
    />
  );
}

export default PowerInputNumber;
