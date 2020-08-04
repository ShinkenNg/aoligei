import React, { ReactNode, useState } from 'react';
import { Upload, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import _ from 'lodash';
import moment from 'moment';
import { useIntl } from '../intl-context';
import { useDeepCompareEffect } from '../power-list/component/util';

// 覆盖原来的部分实现
// Omit beforeUpload实现数量限制
export interface PowerUploadProps<T = any>
  extends Omit<UploadProps<T>, 'beforeUpload' | 'onChange'> {
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void>;
  onChange?: (info: UploadChangeParam) => void;
  // 限制最大上传数
  maxCount?: number;
  value?: any;
  children?: ReactNode,
}

export function Index<T = any>(props: PowerUploadProps) {
  const [uploadFileList, setUploadFileList] = useState(new Array<UploadFile>());
  const intl = useIntl();

  const {children, ...rest} = props;

  useDeepCompareEffect(() => {
    if (_.isString(props.value)) {
      const newList = new Array<UploadFile>();
      const fileItem:UploadFile =  {
        url: props.value,
        size: 0,
        type: '',
        uid: _.toString(moment().unix()),
        name: props.value,
        status: 'done',
      };
      newList.push(fileItem);
      setUploadFileList(newList);
    }
  }, [props.value]);

  const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
    if (_.isNumber(props.maxCount) && props.maxCount > 0) {
      if (_.toInteger(_.get(uploadFileList, 'length')) < _.toInteger(props.maxCount)) {
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
    if (_.isFunction(props.onChange)) {
      props.onChange(info);
    }
  };

  // 定义是否展示上传按钮
  let showChildren = true;
  if (_.isNumber(props.maxCount)) {
    showChildren = props.maxCount > uploadFileList.length;
  }

  return (
    <Upload {...rest} beforeUpload={beforeUpload} fileList={uploadFileList} onChange={onChange}>
      {showChildren && children}
    </Upload>
  );
}

export default Index;
