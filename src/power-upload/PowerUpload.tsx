import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import _ from 'lodash';

// 覆盖原来的部分实现
// Omit beforeUpload实现数量限制
export interface PowerUploadProps<T = any>
  extends Omit<UploadProps<T>, 'beforeUpload' | 'onChange'> {
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void>;
  onChange?: (info: UploadChangeParam) => void;
  // 限制最大上传数
  maxCount?: number;
}

export function PowerUpload<T = any>(props: PowerUploadProps) {
  const [uploadFileList, setUploadFileList] = useState(new Array<UploadFile>());

  const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
    if (_.isNumber(props.maxCount) && props.maxCount > 0) {
      if (_.toInteger(_.get(uploadFileList, 'length')) < _.toInteger(props.maxCount)) {
        return true;
      }
      // message.error(intl.formatMessage({ id: 'tooltip.upload_over' }));
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
    if (_.isFunction(props.onChange)) {
      props.onChange(info);
    }
  };

  return (
    <Upload {...props} beforeUpload={beforeUpload} fileList={uploadFileList} onChange={onChange} />
  );
}

export default PowerUpload;
