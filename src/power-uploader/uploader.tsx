import React, { CSSProperties } from 'react';
import _ from 'lodash';

const uploadStyle: CSSProperties = {
  height: '26px',
  width: '80px',
  display: 'inline-block',
  boxSizing: 'border-box',
  lineHeight: '25px',
  textAlign: 'center',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '12px',
  fontWeight: 500,
  color: '#fff',
  backgroundColor: '#108ee9',
  cursor: 'pointer',
  marginLeft: '10px',
};

export interface PowerUploaderProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PowerUploader(props: PowerUploaderProps) {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_.isFunction(props.onChange)) {
      props.onChange(e);
    }
    e.target.value = '';
  };

  return (
    <label style={uploadStyle}>直接上传
      <input type='file' onChange={onInputChange} style={{ display: 'none' }}/>
    </label>
  );
}

export default PowerUploader;
