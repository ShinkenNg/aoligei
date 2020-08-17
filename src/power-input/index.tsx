import React, { CSSProperties } from 'react';

// 输入框的样式
const inputStyle: CSSProperties = {
  height: '18px',
  width: '72px',
  boxSizing: 'content-box',
  fontSize: '12px',
  lineHeight: '18px',
  color: 'rgba(0, 0, 0, 0.65)',
  backgroundColor: '#fff',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  overflow: 'hidden',
  padding: '1px 3px',
  margin: '0 10px',
};

export interface PowerInputProps {
  style?: CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  type?: string;
  defaultValue?: any;
}

export function PowerInput(props: PowerInputProps) {
  let {type, value, onChange, style} = props
  let mergedStyle = {...inputStyle, ...style}
  return <input style={mergedStyle} type={type} value={value} onChange={onChange} />
}

export default PowerInput;
