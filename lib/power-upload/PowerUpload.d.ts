/// <reference types="react" />
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload/interface';
export interface PowerUploadProps<T = any> extends Omit<UploadProps<T>, 'beforeUpload' | 'onChange'> {
    beforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void>;
    onChange?: (info: UploadChangeParam) => void;
    maxCount?: number;
}
export declare function PowerUpload<T = any>(props: PowerUploadProps): JSX.Element;
export default PowerUpload;
