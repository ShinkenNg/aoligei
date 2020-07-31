import './index.less';
import React, { CSSProperties } from 'react';
import { TableProps } from 'antd/es/table';
import { FormProps } from 'antd/es/form';
import { PowerColumns, PowerListTypes } from '../columns';
import { IntlType } from '../intl-context';
import { RequestData, RequestPageMeta } from './use-fetch-data';
import { OptionConfig, ToolBarProps } from './component/tool-bar';
import { SearchConfig, TableFormItem } from './form';
import { DensitySize } from './component/tool-bar/density-icon';
export interface ActionType {
    reload: (resetPageIndex?: boolean) => void;
    reloadAndRest: () => void;
    fetchMore: () => void;
    reset: () => void;
    clearSelected: () => void;
}
export interface ColumnsState {
    show?: boolean;
    fixed?: 'right' | 'left' | undefined;
}
export interface PowerListProps<T, U extends {
    [key: string]: any;
}> extends Omit<TableProps<T>, 'columns' | 'rowSelection'> {
    columns?: PowerColumns<T>[];
    params?: U;
    columnsStateMap?: {
        [key: string]: ColumnsState;
    };
    onColumnsStateChange?: (map: {
        [key: string]: ColumnsState;
    }) => void;
    onSizeChange?: (size: DensitySize) => void;
    /**
     * 一个获得 dataSource 的方法
     */
    request?: (params: U & {
        pageSize?: number;
        current?: number;
    }, sort: {
        [key: string]: 'ascend' | 'descend';
    }, filter: {
        [key: string]: React.ReactText[];
    }) => Promise<RequestData<T>>;
    /**
     * 对数据进行一些处理
     */
    postData?: (data: any[]) => any[];
    /**
     * 默认的数据
     */
    defaultData?: T[];
    /**
     * 初始化的参数，可以操作 table
     */
    actionRef?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);
    /**
     * 操作自带的 form
     */
    formRef?: TableFormItem<T>['formRef'];
    /**
     * 渲染操作栏
     */
    toolBarRender?: ToolBarProps<T>['toolBarRender'] | false;
    /**
     * 数据加载完成后触发
     */
    onLoad?: (dataSource: T[]) => void;
    /**
     * 数据加载失败时触发
     */
    onRequestError?: (e: Error) => void;
    /**
     * 给封装的 table 的 className
     */
    tableClassName?: string;
    /**
     * 给封装的 table 的 style
     */
    tableStyle?: CSSProperties;
    /**
     * 左上角的 title
     */
    headerTitle?: React.ReactNode;
    /**
     * 默认的操作栏配置
     */
    options?: OptionConfig<T> | false;
    /**
     * 是否显示搜索表单
     */
    search?: boolean | SearchConfig;
    /**
     * type="form" 和 搜索表单 的 Form 配置
     * 基本配置与 antd Form 相同
     *  但是劫持了 form 的配置
     */
    form?: Omit<FormProps, 'form'>;
    /**
     * 如何格式化日期
     * 暂时只支持 moment
     * string 会格式化为 YYYY-DD-MM
     * number 代表时间戳
     */
    dateFormatter?: 'string' | 'number' | false;
    /**
     * 格式化搜索表单提交数据
     */
    beforeSearchSubmit?: (params: Partial<T>) => Partial<T>;
    /**
     * 自定义 table 的 alert
     * 设置或者返回false 即可关闭
     */
    tableAlertRender?: ((props: {
        intl: IntlType;
        selectedRowKeys: (string | number)[];
        selectedRows: T[];
    }) => React.ReactNode) | false;
    /**
     * 自定义 table 的 alert 的操作
     * 设置或者返回false 即可关闭
     */
    tableAlertOptionRender?: ((props: {
        intl: IntlType;
        onCleanSelected: () => void;
    }) => React.ReactNode) | false;
    rowSelection?: TableProps<T>['rowSelection'] | false;
    style?: React.CSSProperties;
    /**
     * 支持 PowerList 的类型
     */
    type?: PowerListTypes;
    /**
     * 提交表单时触发
     */
    onSubmit?: (params: U) => void;
    /**
     * 重置表单时触发
     */
    onReset?: () => void;
    /**
     * 空值时显示
     */
    columnEmptyText?: ColumnEmptyText;
    /**
     * 提取分页元信息
     */
    getPageMeta?: (response: RequestData<any>) => RequestPageMeta;
}
export declare type ColumnEmptyText = string | false;
/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
declare const ProviderWarp: <T, U extends {
    [key: string]: any;
} = {}>(props: PowerListProps<T, U>) => JSX.Element;
export default ProviderWarp;
