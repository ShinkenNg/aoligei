import React, { CSSProperties } from 'react';

interface TagStyleType {
  [key: string]: CSSProperties
}

const tagStyle: TagStyleType = {
  wrapper: {
    display: 'inline-block',
    lineHeight: '22px',
    height: '22px',
    padding: '0 0 0 8px',
    borderRadius: '4px',
    border: '1px solid #e9e9e9',
    backgroundColor: '#f3f3f3',
    fontSize: '13px',
    color: 'rgba(0, 0, 0, 0.65)',
    margin: '5px',
  },
  text: {
    display: 'inline-block',
    maxWidth: '500px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    display: 'inline-block',
    width: '25px',
    textAlign: 'center',
    float: 'right',
    cursor: 'pointer',
  },
}

export interface PowerTagProps {
  value?: any;
  index?: number;
  onRemove?: (index?: number) => void;
  style?: {
    [key: string]: CSSProperties;
  };
  key?: any;
}

export function PowerTag(props: PowerTagProps) {
  let {value, index, onRemove, style, key} = props;
  let mergedStyle = {...tagStyle.wrapper, ...style};
  return (
    <span style={mergedStyle} key={key}>
        <span style={tagStyle.text}>{value}</span>
        <i style={tagStyle.icon} onClick={() => {
          if (onRemove) {
            onRemove(index);
          }}}>×</i>
      </span>
  );
}

export default PowerTag;
