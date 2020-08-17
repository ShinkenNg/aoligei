import React, { CSSProperties } from 'react';

const labelStyle: CSSProperties = {
  display: 'block',
  width: '165px',
  color: 'rgba(0, 0, 0, 0.65)',
  marginRight: '20px',
  marginBottom: '10px',
}

const labelName = {
  display: 'inline-block',
  width: '50px',
}

export interface PowerLabelProps {
  children?: React.ReactNode;
  name?: string;
  style?: CSSProperties;
}

export function PowerLabel(props: PowerLabelProps) {
  let {style, children, name} = props
  let mergedStyle = {...labelStyle, ...style}
  return <label style={mergedStyle}><span style={labelName}>{name}</span>{children}</label>;
}

export default PowerLabel;
