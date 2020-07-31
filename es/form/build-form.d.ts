/// <reference types="react" />
import { FormInstance, FormProps } from 'antd/es/form';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Store } from 'rc-field-form/es/interface';
import { BuildFormColumns } from '../columns';
declare const defaultColConfig: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
};
export interface BuildFormAction<T> {
    text: string;
    type: 'submit' | 'reset' | 'other';
    onClick: (form: FormInstance) => void;
}
export interface BuildFormProps<T> {
    columns: BuildFormColumns<T>[];
    form?: FormProps;
    onSubmit?: (params: Store) => Promise<T>;
    onCancel?: () => void;
    onChange?: (values: Store) => void;
    onSuccess?: () => void;
    spinning?: boolean;
    size?: SizeType;
    actions?: BuildFormAction<T>[];
    loadingText?: string;
    itemColSpan?: number | typeof defaultColConfig;
    request: (data: Store) => Promise<any>;
}
export declare function BuildForm<T>(props: BuildFormProps<T>): JSX.Element;
export {};
