import React, { ReactNode, useState } from 'react';
import { Upload, message, Modal } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import _ from 'lodash';
import moment from 'moment';
import { useIntl } from '../intl-context';
import { useDeepCompareEffect } from '../power-list/component/util';

// export interface PowerUploadValue {
//   preview?: string;
//   url: string;
// }

function getBase64(file: File | Blob | undefined) {
  if (!file) {
    return '';
  }
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(_.toString(reader.result));
    reader.onerror = error => reject(error);
  });
}

// 覆盖原来的部分实现
// Omit beforeUpload实现数量限制
export interface PowerUploadProps<T = any>
  extends Omit<UploadProps<T>, 'beforeUpload' | 'onChange'> {
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void>;
  onChange?: (value?: any) => void;
  // 限制最大上传数
  maxCount?: number;
  value?: any;
  postValueToList?: (value?: any) => Array<UploadFile>;
  children?: ReactNode,
}

export function PowerUpload<T = any>(props: PowerUploadProps) {
  const { children, postValueToList, maxCount, value, ...rest } = props;

  const [uploadFileList, setUploadFileList] = useState(new Array<UploadFile>());
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [valueState, setValueState] = useState(value);
  const intl = useIntl();

  useDeepCompareEffect(() => {
    if (_.isFunction(postValueToList)) {
      const list = postValueToList(value);
      setUploadFileList(list);
    } else if (_.isString(value)) {
      const newList = new Array<UploadFile>();
      const fileItem: UploadFile = {
        url: value,
        size: 0,
        type: '',
        uid: _.toString(moment().unix()),
        name: value,
        status: 'done',
      };
      newList.push(fileItem);
      setUploadFileList(newList);
    }
  }, [value]);

  const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
    if (_.isNumber(maxCount) && maxCount > 0) {
      if (_.toInteger(_.get(uploadFileList, 'length')) < _.toInteger(maxCount)) {
        return true;
      }
      message.error(intl.getMessage('tooltip.upload_over', '超出上传数量限制'));
      return false;
    }
    if (_.isFunction(props.beforeUpload)) {
      return props.beforeUpload(file, FileList);
    }
    return true;
  };

  const onChange = (info: UploadChangeParam): void => {
    const enableStatus = ['uploading', 'done', 'removed', 'error'];
    if (_.includes(enableStatus, info.file.status)) {
      setUploadFileList(info.fileList);
    }

    if (info.file.status === 'error') {
      const msg = _.get(info.file.response, 'message');
      const firstError = _.get(info.file.response, `errors.${props.name}[0]`);
      message.error(firstError || msg);
    }
    if (info.file.status === 'done') {
      // 上传成功将值传给外部
      if (_.isFunction(props.onChange)) {
        // 根据maxCount判断是否上传列表
        // @ts-ignore
        if (maxCount > 1 || _.isUndefined(maxCount) || _.isNull(maxCount)) {
          const newVal = valueState || [];
          newVal.push(info.file.response?.data);
          setValueState(newVal);
          props.onChange(newVal);
        } else {
          props.onChange(info.file.response?.data);
        }
      }
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (file.url || file.preview) {
      // @ts-ignore
      setPreviewImage(file.url || file.preview);
    } else {
      const preview = await getBase64(file.originFileObj);
      setPreviewImage(preview);
    }
    setPreviewVisible(true);
  }

  // 定义是否展示上传按钮
  let showChildren = true;
  if (_.isNumber(maxCount)) {
    showChildren = maxCount > uploadFileList.length;
  }

  return (
    <span>
      <Upload
        {...rest}
        beforeUpload={beforeUpload}
        fileList={uploadFileList}
        onChange={onChange}
        onPreview={handlePreview}
      >
        {showChildren && children}
      </Upload>
      <Modal
        visible={previewVisible}
        footer={null}
        title={intl.getMessage('upload.preview', '预览')}
        onCancel={() => {
          setPreviewVisible(false);
        }}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </span>
  );
}

export default PowerUpload;
