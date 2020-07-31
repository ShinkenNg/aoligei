import React from 'react';
import './index.less';

function PowerText(props) {
  return React.createElement("span", {
    className: 'powerText'
  }, props.buildValue || props.value || '');
}

export default PowerText;