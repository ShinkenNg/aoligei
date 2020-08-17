import React, { CSSProperties } from 'react';

const buttonStyle: CSSProperties = {
  height: '24px',
  fontWeight: 500,
  cursor: 'pointer',
  padding: '0 15px',
  fontSize: '12px',
  color: 'rgba(0,0,0,.65)',
  border: '1px solid #d9d9d9',
  marginLeft: '10px',
}

export interface PowerButtonProps {
  style?: CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function PowerButton(props: PowerButtonProps) {
  let {style, children, onClick} = props
  let mergedStyle = {...buttonStyle, ...style}
  return <button style={mergedStyle} onClick={onClick}>{children}</button>
}

export default PowerButton;
