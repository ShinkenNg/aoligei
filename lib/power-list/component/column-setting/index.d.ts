/// <reference types="react" />
import { PowerColumns } from '../../../columns';
import './index.less';
interface ColumnSettingProps<T = any> {
    columns?: PowerColumns<T>[];
}
declare const ColumnSetting: <T, U = {}>(props: ColumnSettingProps<T>) => JSX.Element;
export default ColumnSetting;
