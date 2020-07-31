/// <reference types="react" />
import './index.less';
interface PowerTextProps<T> {
    value?: any;
    buildValue?: any;
}
declare function PowerText<T>(props: PowerTextProps<T>): JSX.Element;
export default PowerText;
