import React from 'react';
import _ from 'lodash';
import {Input} from 'antd';
import { BuildFormValueType, ValueEnumMap, ValueEnumObj } from '../columns';
import { ObjToMap, parsingText } from '../power-list/component/util';

interface PowerTextProps<T> {
  value?: any;
  // 一个用于处理value的方法
  renderValue?: (value?: any) => any;
  buildFormValueType?: BuildFormValueType; 

  // 值的枚举, 如果存在枚举则显示其中值
  valueEnum?: ValueEnumMap | ValueEnumObj;
}

function PowerText<T>(props: PowerTextProps<T>) {
  let val = props.value;
  if (_.isFunction(props.renderValue)) {
    val = props.renderValue(props.value);
  }

  // 处理枚举值
  if (!_.isEmpty(props.valueEnum)) {
    return <span>{parsingText(props.value, ObjToMap(props.valueEnum))}</span>;
  }
  
  // 对文本域的处理
  if (props.buildFormValueType === 'textarea') {
    return <Input.TextArea disabled value={_.isUndefined(val) ? '' : val} />;
  }

  return <Input disabled value={_.isUndefined(val) ? '' : val} />;
}

export default PowerText;
