import React, { CSSProperties, useState } from 'react';
import _ from 'lodash';
import PowerInput from './../power-input';
import PowerLabel from './../power-label';
import PowerTag from './../power-tag';
import PowerSelect from '../power-select';
import PowerButton from '../power-button';
import PowerUploader from './uploader';

const linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9,_-](\?)?)*)*$/i;
let timeoutInstance: NodeJS.Timeout | null = null;

interface VideoUploaderStyle {
  [key: string]: CSSProperties;
}

const style: VideoUploaderStyle = {
  paramsConfig: {
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexWrap: 'wrap',
  },
  insertTitle: {
    fontSize: '14px',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  sourceList: {
    margin: '10px 10px 10px 0',
    border: '1px dashed rgb(217, 217, 217)',
    borderRadius: '4px',
  },
  configTitle: {
    display: 'block',
    fontSize: '14px',
    margin: '10px 0',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  warnInfo: {
    display: 'inline-block',
    width: '100%',
    margin: '5px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#f04134',
  },
};

interface VideoUploaderState {
  sources: Array<string>;
  currentSource: string;
  width: number;
  height: number;
  controls: 'true' | 'false';
  autoplay: 'true' | 'false';
  muted: 'true' | 'false';
  loop: 'true' | 'false';
  poster: string;
  name: string;
  author: string;
  errorMsg: string;
  errorMsgVisible: boolean;
}

export interface VideoUploaderProps {
  onChange?: (value: any) => void;
  value?: any;
  upload?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<any>;
  progress?: number;
}

export function PowerVideoUploader(props: VideoUploaderProps) {
  const defaultState: VideoUploaderState = {
    sources: [],
    currentSource: '',
    width: 400,
    height: 400,
    controls: 'true',
    autoplay: 'false',
    muted: 'false',
    loop: 'false',
    poster: '',
    name: '',
    author: '',
    errorMsg: '',
    errorMsgVisible: false,
  };
  const [state, setState] = useState<VideoUploaderState>(defaultState);

  const updateCurrentSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = _.cloneDeep(state);
    newState.currentSource = e.target.value;
    setState(newState);
  };

  const showErrorMsg = (msg: string) => {
    const newState = _.cloneDeep(state);
    newState.errorMsg = msg;
    newState.errorMsgVisible = true;
    setState(newState);
    if (timeoutInstance) {
      clearTimeout(timeoutInstance);
    }
    timeoutInstance = setTimeout(() => {
      newState.errorMsgVisible = false;
      newState.errorMsg = '';
      setState(newState);
    }, 4000);
  };

  const addSource = () => {
    let { sources, currentSource } = state;
    let newSources = sources.concat([currentSource]);
    if (currentSource === '') {
      showErrorMsg('链接不能为空');
    } else if (!linkRegx.test(currentSource)) {
      showErrorMsg('非法的链接');
    } else if (sources.indexOf(currentSource) !== -1) {
      showErrorMsg('链接已存在');
    } else {
      const newState = _.cloneDeep(state);
      newState.sources = newSources;
      newState.currentSource = '';
      setState(newState);
      if (_.isFunction(props.onChange)) {
        props.onChange(generateHtml(newState));
      }
    }
  };

  const removeSource = (index?: number) => {
    if (!index) {
      return;
    }
    let sourcesCopy = _.cloneDeep(state.sources);
    sourcesCopy.splice(index, 1);
    const newState = _.cloneDeep(state);
    newState.sources = sourcesCopy;
    setState(newState);
  };

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.upload) return;

    props.upload(e).then(url => {
      const newState = _.cloneDeep(state);
      newState.currentSource = url;
      setState(newState);
    }).catch((e: Error) => {
      showErrorMsg(e.message);
    });
  };

  const getFileType = (fileUrl: string, mediaType: string) => {
    let type = fileUrl.match(/\.(\w+)$/i);
    return type ? type[1].toLowerCase() : 'mp4';
  };

  const generateHtml = (newState: VideoUploaderState) => {
    let { sources, width, height, controls, autoplay, muted, loop } = newState;
    let len = sources.length;

    if (len > 0) {
      let html = '';
      let attr = '';

      attr += controls === 'false' ? '' : ' controls="true" ';
      attr += autoplay === 'false' ? '' : ' autoplay="true" ';
      attr += loop === 'false' ? '' : ' loop="true" ';

      attr += muted === 'false' ? '' : ' muted ';
      if (len === 1) {
        html = `<video src="${sources[0]}" width="${width}" height="${height}" ${attr}>你的浏览器不支持 video 标签</video>`;
      } else {
        html = `<video width="${width}" height="${height}" ${attr}>`;
        sources.forEach(source => {
          html += `<source src=${source} type="video/${getFileType(source, 'video')}">`;
        });
        html += '你的浏览器不支持 video 标签</video>';
      }

      return html + '<p/>';
    }
    return '';
  };

  const changeConfig = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    console.log('change config');
    let value: any = e.target.value;
    let boolType = ['controls', 'autoplay', 'muted', 'loop'];
    if (type === 'width' || type === 'height') {
      if (isNaN(parseInt(value))) {
        value = parseInt(value);
      }
    } else if (boolType.indexOf(type) !== -1) {
      value = !!value;
    }
    const newState = _.cloneDeep(state);
    newState[type] = value;
    setState(newState);
    if (_.isFunction(props.onChange)) {
      props.onChange(generateHtml(newState));
    }
  };

  const renderSourceList = () => {
    let { sources } = state;
    if (sources.length > 0) {
      return sources.map((source, index) => {
        return <PowerTag value={source} key={source} index={index} onRemove={removeSource}/>;
      });
    } else {
      return <span style={style.warnInfo}>至少添加一个链接</span>;
    }
  };

  const renderVideoConfig = () => {
    let { width, height, controls, autoplay, muted, loop } = state;
    return (
      <form style={style.paramsConfig}>
        <PowerLabel name='width'>
          <PowerInput type='number' defaultValue={width} onChange={e => {
            changeConfig(e, 'width');
          }}/>
        </PowerLabel>
        <PowerLabel name='height'>
          <PowerInput type='number' defaultValue={height} onChange={e => {
            changeConfig(e, 'height');
          }}/>
        </PowerLabel>
        <PowerLabel name='controls'>
          <PowerSelect defaultValue={controls} onChange={e => {
            changeConfig(e, 'controls');
          }}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </PowerSelect>
        </PowerLabel>
        <PowerLabel name='autoplay'>
          <PowerSelect defaultValue={autoplay} onChange={e => {
            changeConfig(e, 'autoplay');
          }}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </PowerSelect>
        </PowerLabel>
        <PowerLabel name='muted'>
          <PowerSelect defaultValue={muted} onChange={e => {
            changeConfig(e, 'muted');
          }}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </PowerSelect>
        </PowerLabel>
        <PowerLabel name='loop'>
          <PowerSelect defaultValue={loop} onChange={e => {
            changeConfig(e, 'loop');
          }}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </PowerSelect>
        </PowerLabel>
      </form>
    );
  };

  let { currentSource, errorMsg, errorMsgVisible } = state;
  let { progress } = props;

  return (
    <div>
      <div>
        <span style={style.insertTitle}>插入链接</span>
        <PowerInput style={{ width: '300px' }} type='text' value={currentSource} onChange={updateCurrentSource}/>
        <PowerButton onClick={addSource}>添加</PowerButton>
        <PowerUploader onChange={upload}/>
      </div>
      <div>
    <span style={{ ...style.warnInfo, display: progress && progress !== -1 ? 'block' : 'none' }}>
    {progress}%
    </span>
        <span style={{ ...style.warnInfo, display: errorMsgVisible ? 'block' : 'none' }}>{errorMsg}</span>
      </div>
      <div style={style.sourceList}>
        {renderSourceList()}
      </div>
      <span style={style.configTitle}>参数配置</span>
      {renderVideoConfig()}
      <div style={{ textAlign: 'center', padding: '20px 10px 0 10px' }}>
        {
          <video src={currentSource} controls={true}
                 style={{ width: '400px', height: '250px', backgroundColor: '#000' }}>
            你的浏览器不支持 video 标签
          </video>
        }
      </div>
    </div>
  );
}

export default PowerVideoUploader;
