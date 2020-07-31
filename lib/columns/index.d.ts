import { ColumnType } from "antd/es/table";
import { FormItemProps, FormInstance, Rule } from "antd/es/form";
import { ReactNode } from "react";
import { UseFetchDataAction, RequestData } from "../power-list/use-fetch-data";
import { StatusType } from "../power-list/component/status";
import { PowerColumnsValueType } from "../power-list";
import { PowerColumnsValueTypeFunction } from "../power-list/default-render";
export declare type ValueEnumObj = {
    [key: string]: {
        text: ReactNode;
        status: StatusType;
    } | ReactNode;
};
export declare type ValueEnumMap = Map<React.ReactText, {
    text: ReactNode;
    status: StatusType;
} | ReactNode>;
export declare type PowerListTypes = 'form' | 'list' | 'table' | 'cardList' | undefined;
export interface PowerColumnType<T = unknown> extends Omit<ColumnType<T>, 'render' | 'children' | 'title'>, Partial<Omit<FormItemProps, 'children'>> {
    index?: number;
    title?: ReactNode | ((config: PowerColumnType<T>, type: PowerListTypes) => ReactNode);
    /**
     * 自定义 render
     */
    render?: (text: React.ReactNode, record: T, index: number, action: UseFetchDataAction<RequestData<T>>) => React.ReactNode | React.ReactNode[];
    /**
     * 自定义 render，但是需要返回 string
     */
    renderText?: (text: any, record: T, index: number, action: UseFetchDataAction<RequestData<T>>) => any;
    /**
     * 自定义搜索 form 的输入
     */
    renderFormItem?: (item: PowerColumns<T>, config: {
        value?: any;
        onChange?: (value: any) => void;
        onSelect?: (value: any) => void;
        type: PowerListTypes;
        defaultRender: (newItem: PowerColumns<any>) => JSX.Element | null;
    }, form: Omit<FormInstance, 'scrollToField' | '__INTERNAL__'>) => JSX.Element | false | null;
    /**
     * 表单字段名
     * 特殊场景中，不可复用dataIndex
     * */
    formItemName?: string;
    /**
     * 搜索表单的 props
     */
    formItemProps?: {
        [prop: string]: any;
    };
    /**
     * 搜索表单的默认值
     */
    initialValue?: any;
    /**
     * 是否缩略
     */
    ellipsis?: boolean;
    /**
     * 是否拷贝
     */
    copyable?: boolean;
    /**
     * 值的类型
     */
    valueType?: PowerColumnsValueType | PowerColumnsValueTypeFunction<T>;
    /**
     * 值的枚举，如果存在枚举，Search 中会生成 select
     */
    valueEnum?: ValueEnumMap | ValueEnumObj;
    /**
     * 在查询表单中隐藏
     */
    hideInSearch?: boolean;
    /**
     * 在 table 中隐藏
     */
    hideInTable?: boolean;
    /**
     * 在新建表单中删除
     */
    hideInForm?: boolean;
    /**
     * form 的排序
     */
    order?: number;
}
export interface PowerColumnGroupType<RecordType> extends PowerColumnType<RecordType> {
    children: PowerColumns<RecordType>;
}
export declare type PowerColumns<T = {}> = PowerColumnGroupType<T> | PowerColumnType<T>;
export declare type RadioEnumObj = {
    [value: string]: any;
};
export declare type SelectEnumObj = {
    [value: string]: any;
};
export interface BuildFormColumns<T> extends Omit<PowerColumns<T>, ''> {
    buildFormHideItem?: ((form: FormInstance) => boolean) | boolean;
    buildFormIsRenderItem?: ((form: FormInstance) => boolean) | boolean;
    buildFormItemExtraProps?: {
        [prop: string]: any;
    };
    buildFormValueType?: 'money' | 'textarea' | 'option' | 'date' | 'dateRange' | 'dateTimeRange' | 'dateTime' | 'time' | 'text' | 'index' | 'indexBorder' | 'progress' | 'percent' | 'digit' | 'avatar' | 'code' | 'searchInput' | 'password' | 'powerText';
    radioEnum?: RadioEnumObj;
    selectEnum?: SelectEnumObj;
    buildFormFilter?: (form: FormInstance, input: any, option: any) => boolean;
    buildFormOrder?: number;
    renderBuildFormItem?: (item: BuildFormColumns<T>, config: {
        value?: any;
        onChange?: (value: any) => void;
        onSelect?: (value: any) => void;
        type: PowerListTypes;
        defaultRender: (newItem: BuildFormColumns<any>) => JSX.Element | null;
    }, form: Omit<FormInstance, 'scrollToField' | '__INTERNAL__'>) => JSX.Element | false | null;
    rules?: Rule[];
    required?: boolean;
}
