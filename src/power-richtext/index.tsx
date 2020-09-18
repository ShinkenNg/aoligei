import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
/* eslint-disable */
import PowerLink from './../power-link';
import PowerModal from './../power-modal';

import PowerVideoUploader from './../power-uploader/video-uploader';
import * as utils from './utils';

const MODE = {
  INTERNAL_PowerModal: 'internal-PowerModal',
  PowerModal: 'PowerModal',
  NORMAL: 'normal',
};

function isPowerModalMode(mode: string) {
  return mode === MODE.INTERNAL_PowerModal || mode === MODE.PowerModal;
}

const simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy' +
  '23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNi' +
  'TAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxU' +
  'QKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/Uewdg' +
  'Ku4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6a' +
  'wOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hO' +
  'ojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj' +
  '3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg==';

export class PowerRichText extends React.Component<any> {
  private readonly containerID: any;
  private ueditor: any;
  private tempfileInput: HTMLElement | null;
  private readonly fileInputID: string;
  private pasteImageAmount: number;

  constructor(props: any) {
    super(props);
    this.ueditor = null;

    this.tempfileInput = null;
    this.containerID = 'reactueditor' + Math.random().toString(36).substr(2);
    this.fileInputID = 'fileinput' + Math.random().toString(36).substr(2);
    this.pasteImageAmount = 0;
    this.state = {
      videoSource: '',
      audioSource: '',
      extendControls: this.props.extendControls ? this.props.extendControls : [],
      videoHtml: '',
      audioHtml: '',
      pluginsWithCustomRender: [],
    };
  }

  static propTypes = {
    value: PropTypes.string,
    ueditorPath: PropTypes.string.isRequired,
    plugins: PropTypes.array,
    onChange: PropTypes.func,
    uploadImage: PropTypes.func,
    getRef: PropTypes.func,
    multipleImagesUpload: PropTypes.bool,
    onReady: PropTypes.func,
    pasteImageStart: PropTypes.func,
    handlePasteImage: PropTypes.func,
    pasteImageDone: PropTypes.func,
    extendControls: PropTypes.array,
    debug: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    multipleImagesUpload: false,
    extendControls: [],
    debug: false,
  };

  componentDidMount() {
    let { ueditorPath } = this.props;
    // @ts-ignore
    if (!window.UE && !window.UE_LOADING_PROMISE) {
      // @ts-ignore
      window.UE_LOADING_PROMISE = this.createScript(ueditorPath + '/ueditor.config.js').then(() => {
        return this.props.debug
          ? this.createScript(ueditorPath + '/ueditor.all.js')
          : this.createScript(ueditorPath + '/ueditor.all.min.js');
      });
    }
    // @ts-ignore
    window.UE_LOADING_PROMISE.then(() => {
      this.tempfileInput = document.getElementById(this.fileInputID);
      this.initEditor();
    });
  }

  /**
   * 这里存在两种情况会改变编辑器的内容：
   * 1. 父组件初始化传递的 value。父组件 value 的获取是异步的，因此会触发一次 componentWillReceiveProps，这种情况不需要将更新再通知父组件
   * 2. 用户对编辑器进行编辑
   */
  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps);
    if ('value' in nextProps && this.props.value !== nextProps.value) {
      if (this.ueditor) {
        this.ueditor.ready(() => {
          this.ueditor.setContent(nextProps.value);
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.ueditor) {
      this.ueditor.destroy();
      // 销毁后需要移除之前构建的textarea
      const container = document.getElementById(this.containerID);
      if(container) {
        container.remove();
      }
    }
  }

  createScript = (url: string) => {
    let scriptTags = window.document.querySelectorAll('script');
    let len = scriptTags.length;
    let i = 0;
    let _url = window.location.origin + url;
    return new Promise((resolve, reject) => {
      for (i = 0; i < len; i++) {
        const src = scriptTags[i].src;
        if (src && src === _url) {
          // @ts-ignore
          scriptTags[i].parentElement.removeChild(scriptTags[i]);
        }
      }

      let node = document.createElement('script');
      node.src = url;
      node.onload = resolve;
      document.body.appendChild(node);
    });
  };

  registerInternalPlugin(pluginName: string) {
    switch (pluginName) {
      case 'uploadImage':
        return this.registerImageUpload();
      case 'insertCode':
        return this.registerSimpleInsertCode();
      case 'uploadVideo':
        return this.registerUploadVideo();
      case 'insertPowerLink':
        return this.registerPowerLink();
      default:
        return;
    }
  }

  registerPlugin(plugin: any) {
    let name = Math.random().toString(36).slice(2);
    // @ts-ignore
    window.UE.registerUI(name, (ueditor: any, uiName: any) => {
      let config = plugin(ueditor);
      if (!config.mode) {
        config.mode = MODE.PowerModal;
      }
      // @ts-ignore
      const btn = new window.UE.ui.Button({
        name: uiName,
        title: config.menuText,
        cssRules: config.cssRules || '',
        onclick: isPowerModalMode(config.mode) ? () => {
          this.setState({ [this.getVisibleName(name)]: true });
          config.onIconClick && config.onIconClick();
        } : config.onIconClick,
      });
      if (config.render) {
        this.setState(prevState => ({
          pluginsWithCustomRender: [
            // @ts-ignore
            ...prevState.pluginsWithCustomRender,
            { name, ...config },
          ],
        }));
      }
      return btn;
    }, undefined, this.containerID);
  }

  registerImageUpload = () => this.registerPlugin(() => ({
    menuText: '图片上传',
    cssRules: 'background-position: -726px -77px;',
    mode: MODE.NORMAL,
    onIconClick: () => {
      // @ts-ignore
      this.tempfileInput.click();
    },
  }));

  registerSimpleInsertCode = () => this.registerPlugin((ueditor: any) => ({
    menuText: '插入代码',
    cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
    mode: MODE.NORMAL,
    onIconClick: () => {
      ueditor.focus();
      ueditor.execCommand('insertcode');
    },
  }));

  registerUploadVideo = () => {
    let { uploadVideo, progress } = this.props;
    return this.registerPlugin((ueditor: any) => ({
      menuText: '上传视频',
      cssRules: 'background-position: -320px -20px;',
      mode: MODE.INTERNAL_PowerModal,
      render: () => <PowerVideoUploader upload={uploadVideo} progress={progress} onChange={this.videoChange}/>,
      onConfirm: () => {
        ueditor.execCommand('insertparagraph');
        // @ts-ignore
        ueditor.execCommand('inserthtml', this.state.videoHtml, true);
        ueditor.execCommand('insertparagraph');
        ueditor.execCommand('insertparagraph');
      },
    }));
  };

  registerPowerLink = () => this.registerPlugin((ueditor: any) => ({
    menuText: '超链接',
    cssRules: 'background-position: -504px 0px;',
    mode: MODE.INTERNAL_PowerModal,
    render: () => <PowerLink onChange={this.PowerLinkChange}/>,
    onConfirm: () => {
      // @ts-ignore
      ueditor && ueditor.execCommand('inserthtml', this.state.PowerLinkHtml, true);
    },
  }));

  videoChange = (videoHtml: string) => {
    this.setState({ videoHtml });
  };

  audioChange = (audioHtml: string) => {
    this.setState({ audioHtml });
  };

  PowerLinkChange = (PowerLinkHtml: string) => {
    this.setState({ PowerLinkHtml });
  };

  uploadImage = (e: any) => {
    let { uploadImage } = this.props;
    if (uploadImage) {
      let promise = uploadImage(e);
      if (!!promise && typeof promise.then == 'function') {
        promise.then((imageUrl: any) => {
          if (imageUrl instanceof Array) {
            imageUrl.forEach(url => {
              this.insertImage(url);
            });
          } else {
            this.insertImage(imageUrl);
          }
        });
      }
    }
    // @ts-ignore
    this.tempfileInput.value = '';
  };

  insertImage = (imageUrl: any) => {
    if (this.ueditor) {
      this.ueditor.focus();
      this.ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '"  alt=""/>');
    }
  };

  handlePasteImage = () => {
    let { pasteImageStart, handlePasteImage, pasteImageDone } = this.props;
    if (!handlePasteImage) return;

    let html = this.ueditor.getContent();
    let images = utils.extractImageSource(html);

    if (Object.prototype.toString.call(images) !== '[object Array]') return;

    this.pasteImageAmount += images.length;
    pasteImageStart && pasteImageStart(this.pasteImageAmount);
    if (typeof images !== 'string') {
      images.forEach((src: any) => {
        let promise = handlePasteImage(src);
        if (!!promise && typeof promise.then == 'function') {
          promise.then((newSrc: any) => {
            --this.pasteImageAmount;
            if (this.pasteImageAmount === 0) {
              pasteImageDone && pasteImageDone();
            }
            let newHtml = utils.replaceImageSource(this.ueditor.getContent(), src, newSrc);
            this.ueditor.setContent(newHtml);
          });
        }
      });
    }
  };

  getVisibleName = (name: any) => {
    return name + 'VisiblePowerModal';
  };

  getRegisterUIName = (name: any) => {
    return `${name}-${this.containerID}`;
  };

  initEditor = () => {
    const { config, plugins, onChange, value, getRef, onReady } = this.props;

    if (plugins && Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        if (typeof plugin === 'string') {
          return this.registerInternalPlugin(plugin);
        } 
          return this.registerPlugin(plugin);
      });
    }

    // 即将废弃
    // @ts-ignore
    this.state.extendControls.forEach(control => {
      // @ts-ignore
      window.UE.registerUI(this.getRegisterUIName(control.name), (editor, uiName) => {
        // @ts-ignore
        const btn = new window.UE.ui.Button({
          name: uiName,
          title: control.menuText,
          cssRules: control.cssRules ? control.cssRules : '',
          onclick: () => {
            this.setState({ [this.getVisibleName(control.name)]: true });
          },
        });
        return btn;
      }, undefined, this.containerID);
    });

    const newConfig = _.cloneDeep(config) || {};
    newConfig.initialContent = value;
    // @ts-ignore
    this.ueditor = window.UE.getEditor(this.containerID, newConfig);
    this.ueditor._react_ref = this;

    getRef && getRef(this.ueditor);
    this.ueditor.ready(() => {
      this.ueditor.addListener('contentChange', () => {
        const content = this.ueditor.getContent();
        onChange && onChange(content);
      });

      this.ueditor.addListener('afterpaste', () => {
        this.handlePasteImage();
      });

      onReady && onReady(this.ueditor);
    });
  };

  render() {
    // @ts-ignore
    let { extendControls } = this.state;
    let { multipleImagesUpload } = this.props;

    return (
      <div>
        <script id={this.containerID} type='text/plain'/>
        <input type='file'
               id={this.fileInputID}
               onChange={this.uploadImage}
               style={{ visibility: 'hidden', width: 0, height: 0, margin: 0, padding: 0, fontSize: 0 }}
               multiple={multipleImagesUpload}/>
        {
          // @ts-ignore
          this.state.pluginsWithCustomRender.map(plugin => {
            const visible = !!this.state[this.getVisibleName(plugin.name)];
            const onClose = () => {
              if (isPowerModalMode(plugin.mode)) {
                this.setState({ [this.getVisibleName(plugin.name)]: false });
              }
              plugin.onClose && typeof plugin.onClose === 'function' && plugin.onClose();
            };
            if (plugin.mode === MODE.INTERNAL_PowerModal) {
              return (
                <PowerModal
                  key={plugin.name}
                  title={plugin.title || plugin.menuText}
                  zIndex={plugin.zIndex}
                  align={plugin.alignStyle}
                  visible={visible}
                  beforeClose={plugin.beforeClose}
                  onClose={onClose}
                  onConfirm={plugin.onConfirm}
                  component={plugin.render()}
                />
              );
            } else if (plugin.mode === MODE.PowerModal) {
              return (
                <div key={plugin.name}>
                  {plugin.render(visible, onClose)}
                </div>
              );
            } else if (plugin.mode === MODE.NORMAL) {
              return (
                <div key={plugin.name}>
                  {plugin.render()}
                </div>
              );
            }
          })
        }
        {  // 即将废弃
          extendControls.map((control: any) => (
            <PowerModal
              key={control.name + this.containerID}
              title={control.title}
              zIndex={control.zIndex}
              align={control.alignStyle}
              visible={this.state[this.getVisibleName(control.name)]
                ? this.state[this.getVisibleName(control.name)] : false}
              beforeClose={control.beforeClose}
              onClose={() => {
                this.setState({ [this.getVisibleName(control.name)]: false });
              }}
              onConfirm={control.onConfirm}
              component={control.component}
            />
          ))
        }
      </div>
    );
  }
}

export default PowerRichText;
