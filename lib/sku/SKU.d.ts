/// <reference types="react" />
import './index.less';
export interface SkuItem {
    id: number;
    name: string;
    children: Array<SkuChildItem>;
}
export interface SkuChildItem extends Omit<SkuItem, 'children'> {
    parent_id: number;
}
export interface SKUProps<T> {
    dataSource: Array<SkuItem>;
    value?: any;
    onChange?: (value: Array<any>) => void;
}
export declare function SKU<T>(props: SKUProps<T>): JSX.Element;
export default SKU;
