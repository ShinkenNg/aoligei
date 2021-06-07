import React from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

export interface PowerInputNumberProps extends Omit<InputNumberProps, 'suffix' | 'prefix'> {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

export function PowerInputNumber(props: PowerInputNumberProps) {
  const { suffix, prefix, ...rest } = props;

  return (
    <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
      {
        prefix && <div style={{marginRight: 6}}>{prefix}</div>
      }
      <InputNumber
        style={{flex: 1}}
        {...rest}
      />
      {
        suffix && <div style={{marginLeft: 6}}>{suffix}</div>
      }
    </div>
  );
}

export default PowerInputNumber;
