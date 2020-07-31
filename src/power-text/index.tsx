import React from 'react';
import './index.less';

interface PowerTextProps<T> {
  value?: any;
  // 优先级更高的纯渲染值
  buildValue?: any;
}

function PowerText<T>(props: PowerTextProps<T>) {
  return <span className='powerText'>{props.buildValue || props.value || ''}</span>;
}

export default PowerText;
