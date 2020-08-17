import React, { CSSProperties } from 'react';

const selectStyle: CSSProperties = {
  height: '22px',
  width: '80px',
  fontSize: '14px',
  color: 'rgba(0,0,0,.65)',
  backgroundColor: '#fff',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  marginLeft: '10px',
}

export interface PowerSelectProps {
  style?: CSSProperties;
  children?: React.ReactNode;
  defaultValue?: any;
  value?: any;
  onChange: (value?: any) => void;
}

export function PowerSelect(props: PowerSelectProps){
  let {style, children, defaultValue, onChange, ...rest} = props;
  let mergedStyle = {...selectStyle, ...style};
  return <select {...rest} style={mergedStyle} defaultValue={defaultValue} onChange={onChange}>{children}</select>;
}

export default PowerSelect;
