import React from 'react';
import _ from 'lodash';
import './index.less';

interface PowerTextProps<T> {
  value?: any;
  // 一个用于处理value的方法
  renderValue?: (value?: any) => any;
}

function PowerText<T>(props: PowerTextProps<T>) {
  let val = props.value;
  if (_.isFunction(props.renderValue)) {
    val = props.renderValue(props.value);
  }
  return <span className='powerText'>{val || ''}</span>;
}

export default PowerText;
