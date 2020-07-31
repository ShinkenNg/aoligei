import React from 'react';
import { FormInstance } from 'antd/es/form';
import { PowerListTypes } from '../../columns';
import { SearchConfig } from './index';
export interface FormOptionProps {
    searchConfig: SearchConfig;
    type?: PowerListTypes;
    form: FormInstance;
    submit: () => void;
    collapse: boolean;
    setCollapse: (collapse: boolean) => void;
    showCollapseButton: boolean;
    onReset?: () => void;
}
/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
declare const FormOption: React.FC<FormOptionProps>;
export default FormOption;
