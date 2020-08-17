import PowerInput from './../power-input';
import React, { CSSProperties, useState } from 'react';
import _ from 'lodash';

let inputStyle: CSSProperties = {
  width: '300px',
};
let spanStyle: CSSProperties = {
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.65)',
  display: 'inline-block',
  width: '80px',
};
let formItmeStyle: CSSProperties = {
  marginBottom: '10px',
};

export interface PowerLinkProps {
  children?: React.ReactNode;
  onChange?: (value?: any) => void;
}

export interface PowerLinkState {
  text: string;
  link: string;
  title: string;
  newTab: boolean;
  showTips: boolean;
}

export function PowerLink(props: PowerLinkProps) {
  const defaultState:PowerLinkState = {
    text: '',
    link: '',
    title: '',
    newTab: false,
    showTips: false,
  };

  const [state, setState] = useState<PowerLinkState>(defaultState);

  const hasProtocol = (link: string) => {
    return !!(link.match(/^http:|https:/) || link.match(/^\/\//));
  };

  const generateHtml = (nowState: PowerLinkState) => {
    let { text, link, title, newTab } = nowState;

    if (link) {
      let html = '';

      if (!hasProtocol(link)) {
        link = 'http://' + link;
      }

      html += `<a href="${link}" target=${newTab ? '_blank' : '_self'} title="${title}">${text || link}</a>`;

      return html;
    }
    return '';
  };

  const changeConfig = (e: { target: { value: any; }; }, type: string) => {
    let value = e.target.value;
    let boolType = ['newTab'];
    if (boolType.indexOf(type) !== -1) {
      value = !!value;
    }
    const newState = _.cloneDeep(state);
    if (type == 'link') {
      newState.showTips = !hasProtocol(value);
    }
    if (type == 'newTab') {
      newState.newTab = !state.newTab;
      return;
    }
    newState[type] = value;
    if (_.isFunction(props.onChange)) {
      props.onChange(generateHtml(newState));
    }
    setState(newState);
  };

  let { text, link, title, newTab, showTips } = state;
  return (
    <form>
      <div style={formItmeStyle}>
        <span style={spanStyle}>文本内容：</span>
        <PowerInput type='text' style={inputStyle} value={text} onChange={e => changeConfig(e, 'text')}/>
      </div>
      <div style={formItmeStyle}>
        <span style={spanStyle}>链接地址：</span>
        <PowerInput type='text' style={inputStyle} value={link} onChange={e => changeConfig(e, 'link')}/>
      </div>
      <div style={formItmeStyle}>
        <span style={spanStyle}>标题：</span>
        <PowerInput type='text' style={inputStyle} value={title} onChange={e => changeConfig(e, 'title')}/>
      </div>
      <div style={formItmeStyle}>
        <span style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '14px' }}>是否在新窗口打开：</span>
        <input type='checkbox' checked={newTab} onChange={e => changeConfig(e, 'newTab')}/>
      </div>
      {showTips && <p style={{ fontSize: '14px', color: 'red' }}>您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀</p>}
    </form>
  );
}

export default PowerLink;
