import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FormInstance, FormItemProps, FormProps } from 'antd/es/form';
import { Form, Row, Col } from 'antd';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import RcResizeObserver from 'rc-resize-observer';
// @ts-ignore
import useMediaQuery from 'use-media-antd-query';
import useMergeValue from 'use-merge-value';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FormInputRender } from '../../form/build-form';
import { getParams, addUrlParams } from '../../utils/utils';

import {
  useDeepCompareEffect,
  genColumnKey,
} from '../component/util';
import { useIntl, IntlType } from '../../intl-context';
import Container from '../container';
import { PowerColumnsValueTypeFunction } from '../default-render';
import { PowerColumnsValueType } from '../index';
import FormOption, { FormOptionProps } from './form-option';
import { BuildFormColumns } from '../../columns';
import './index.less';

/**
 * 默认的查询表单配置
 */
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 查询按钮的文本
   */
  searchText?: string;
  /**
   * 重置按钮的文本
   */
  resetText?: string;
  span?: number | typeof defaultColConfig;
  /**
   * 收起按钮的 render
   */
  collapseRender?: (
    collapsed: boolean,
    /**
     * 是否应该展示，有两种情况
     * 列只有三列，不需要收起
     * form 模式 不需要收起
     */
    showCollapseButton?: boolean,
  ) => React.ReactNode;
  /**
   * 底部操作栏的 render
   * searchConfig 基础的配置
   * props 更加详细的配置
   * {
      type?: 'form' | 'list' | 'table' | 'cardList' | undefined;
      form: FormInstance;
      submit: () => void;
      collapse: boolean;
      setCollapse: (collapse: boolean) => void;
      showCollapseButton: boolean;
   * }
   */
  optionRender?:
    | ((
        searchConfig: Omit<SearchConfig, 'optionRender'>,
        props: Omit<FormOptionProps, 'searchConfig'>,
      ) => React.ReactNode)
    | false;
  /**
   * 是否收起
   */
  collapsed?: boolean;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;
  /**
   * 提交按钮的文本
   */
  submitText?: string;
}

/**
 * 获取最后一行的 offset，保证在最后一列
 * @param length
 * @param span
 */
const getOffset = (length: number, span: number = 8) => {
  const cols = 24 / span;
  return (cols - 1 - (length % cols)) * span;
};

/**
 * 默认的设置
 */
const defaultSearch: SearchConfig = {
  searchText: '查询',
  resetText: '重置',
  span: defaultColConfig,
  collapseRender: (collapsed: boolean) => (collapsed ? '展开' : '收起'),
};

export interface TableFormItem<T> extends Omit<FormItemProps, 'children'> {
  onSubmit?: (value: T) => void;
  onReset?: () => void;
  form?: Omit<FormProps, 'form'>;
  dateFormatter?: 'string' | 'number' | false;
  search?: boolean | SearchConfig;
  formRef?: React.MutableRefObject<FormInstance | undefined> | ((actionRef: FormInstance) => void);
}

// export const FormInputRender: React.FC<{
//   item: BuildFormColumns<any>;
//   value?: any;
//   form?: Omit<FormInstance, 'scrollToField' | '__INTERNAL__'>;
//   type: PowerListTypes;
//   intl: IntlType;
//   onChange?: (value: any) => void;
//   onSelect?: (value: any) => void;
// }> = (props) => {
//   const { item, intl, form, type, ...rest } = props;
//   const { valueType: itemValueType } = item;
//   // if function， run it
//   const valueType = typeof itemValueType === 'function' ? itemValueType({}) : itemValueType;
//   /**
//    * 自定义 render
//    */
//   if (item.renderFormItem) {
//     /**
//      *删除 renderFormItem 防止重复的 dom 渲染
//      */
//     const { renderFormItem, ...restItem } = item;
//     const defaultRender = (newItem: BuildFormColumns<any>) => (
//       <FormInputRender
//         {...({
//           ...props,
//           item: newItem,
//         } || null)}
//       />
//     );

//     // 自动注入 onChange 和 value,用户自己很有肯能忘记
//     const dom = renderFormItem(
//       restItem,
//       { ...rest, type, defaultRender },
//       form as any,
//     ) as React.ReactElement;
//     // 有可能不是不是一个组件
//     if (!React.isValidElement(dom)) {
//       return dom;
//     }
//     const defaultProps = dom.props as any;
//     // 已用户的为主，不然过于 magic
//     return React.cloneElement(dom, { ...rest, ...defaultProps });
//   }

//   if (!valueType || valueType === 'text') {
//     const { valueEnum } = item;
//     if (valueEnum) {
//       return (
//         <Select
//           clearIcon
//           placeholder={intl.formatMessage('tableForm.selectPlaceholder', { title: item.title },'请选择')}
//           {...rest}
//           {...item.formItemProps}
//         >
//           {parsingValueEnumToArray(ObjToMap(valueEnum)).map(({ value, text }) => (
//             <Select.Option key={value} value={value}>
//               {text}
//             </Select.Option>
//           ))}
//         </Select>
//       );
//     }
//     return (
//       <Input
//         placeholder={intl.formatMessage('tableForm.inputPlaceholder', { title: item.title }, '请输入')}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }
//   if (valueType === 'date') {
//     return (
//       <DatePicker
//         placeholder={intl.formatMessage('tableForm.selectPlaceholder', { title: item.title }, '请选择')}
//         style={{
//           width: '100%',
//         }}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }

//   if (valueType === 'dateTime') {
//     return (
//       <DatePicker
//         showTime
//         placeholder={intl.formatMessage('tableForm.selectPlaceholder', { title: item.title }, '请选择')}
//         style={{
//           width: '100%',
//         }}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }

//   if (valueType === 'dateRange') {
//     return (
//       <DatePicker.RangePicker
//         placeholder={[
//           intl.formatMessage('tableForm.selectPlaceholder', { title: item.title }, '请选择'),
//           intl.formatMessage('tableForm.selectPlaceholder', { title: item.title }, '请选择'),
//         ]}
//         style={{
//           width: '100%',
//         }}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }
//   if (valueType === 'dateTimeRange') {
//     return (
//       <DatePicker.RangePicker
//         showTime
//         placeholder={[
//           intl.formatMessage('tableForm.selectPlaceholder', { title: item.title } ,'请选择'),
//           intl.formatMessage('tableForm.selectPlaceholder',  { title: item.title } ,'请选择'),
//         ]}
//         style={{
//           width: '100%',
//         }}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }

//   if (valueType === 'time') {
//     return (
//       <TimePicker
//         placeholder={intl.formatMessage('tableForm.selectPlaceholder', { title: item.title }, '请选择')}
//         style={{
//           width: '100%',
//         }}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }
//   if (valueType === 'digit') {
//     return (
//       <InputNumber
//         placeholder={intl.formatMessage('tableForm.inputPlaceholder', { title: item.title }, '请输入')}
//         style={{
//           width: '100%',
//         }}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }
//   if (valueType === 'money') {
//     return (
//       <InputNumber
//         min={0}
//         precision={2}
//         formatter={(value) => {
//           if (value) {
//             return `${intl.getMessage('moneySymbol', '￥')} ${value}`.replace(
//               /\B(?=(\d{3})+(?!\d))/g,
//               ',',
//             );
//           }
//           return '';
//         }}
//         parser={(value) =>
//           value
//             ? value.replace(
//                 new RegExp(`\\${intl.getMessage('moneySymbol', '￥')}\\s?|(,*)`, 'g'),
//                 '',
//               )
//             : ''
//         }
//         placeholder={intl.formatMessage('tableForm.inputPlaceholder', { title: item.title },'请输入')}
//         style={{
//           width: '100%',
//         }}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }
//   if (valueType === 'textarea' && type === 'form') {
//     return (
//       <Input.TextArea
//         placeholder={intl.formatMessage('tableForm.inputPlaceholder', { title: item.title }, '请输入')}
//         {...rest}
//         {...item.formItemProps}
//       />
//     );
//   }
//   return (
//     <Input
//       placeholder={intl.formatMessage('tableForm.inputPlaceholder', { title: item.title }, '请输入')}
//       {...rest}
//       {...item.formItemProps}
//     />
//   );
// };

export const proFormItemRender: (props: {
  item: BuildFormColumns<any>;
  intl: IntlType;
  formInstance?: Omit<FormInstance, 'scrollToField' | '__INTERNAL__'>;
  colConfig:
    | {
        lg: number;
        md: number;
        xxl: number;
        xl: number;
        sm: number;
        xs: number;
      }
    | {
        span: number;
      }
    | undefined;
}) => null | JSX.Element = ({ item, intl, formInstance, colConfig }) => {
  const {
    valueType,
    dataIndex,
    valueEnum,
    renderSearchFormItem,
    render,
    hideInForm,
    hideInSearch,
    hideInTable,
    renderText,
    order,
    initialValue,
    ellipsis,
    formItemProps,
    index,
    formItemName,
    dependencies,
    ...rest
  } = item;
  const key = genColumnKey(rest.key, dataIndex, index);
  const dom = <FormInputRender item={item} intl={intl} form={formInstance} type="search" />;
  if (!dom) {
    return null;
  }

  // 支持 function 的 title
  const getTitle = () => {
    if (rest.title && typeof rest.title === 'function') {
      return rest.title(item);
    }
    return rest.title;
  };

  let name = Array.isArray(dataIndex) ? dataIndex : key;
  if (formItemName) {
    name = formItemName;
  }

  const deps = dependencies;

  return (
    <Col {...colConfig} key={key}>
      <Form.Item labelAlign="right" dependencies={deps} label={getTitle()} name={name} >
        {dom}
      </Form.Item>
    </Col>
  );
};

const dateFormatterMap = {
  time: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateRange: 'YYYY-MM-DD',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 判断 DataType 是不是日期类型
 * @param type
 */
const isDateValueType = (type: PowerColumnsValueType | PowerColumnsValueTypeFunction<any>) => {
  let valueType: PowerColumnsValueType = type as PowerColumnsValueType;
  if (typeof type === 'function') {
    // 如果是 object 说明是进度条，直接返回 false
    if (typeof type({}) === 'object') {
      return false;
    }
    valueType = type({}) as PowerColumnsValueType;
  }
  const dateTypes = ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'];
  return dateTypes.includes(valueType);
};

/**
 * 这里主要是来转化一下数据
 * 将 moment 转化为 string
 * 将 all 默认删除
 * @param value
 * @param dateFormatter
 * @param PowerColumnsMap
 */
const conversionValue = (
  value: any,
  dateFormatter: string | boolean,
  PowerColumnsMap: { [key: string]: BuildFormColumns<any> },
) => {
  const tmpValue = {};

  Object.keys(value).forEach((key) => {
    const column = PowerColumnsMap[key || 'null'] || {};
    const valueType = column.valueType || 'text';
    const itemValue = value[key];

    // 如果值是 "all"，或者不存在直接删除
    // 下拉框里选 all，会删除
    if (itemValue === undefined || (itemValue === 'all' && column.valueEnum)) {
      return;
    }

    // 如果是日期，再处理这些
    if (!isDateValueType(valueType)) {
      tmpValue[key] = itemValue;
      return;
    }

    // 如果是 moment 的对象的处理方式
    // 如果执行到这里，肯定是 ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'] 之一
    if (moment.isMoment(itemValue) && dateFormatter) {
      if (dateFormatter === 'string') {
        const formatString = dateFormatterMap[valueType as 'dateTime'];
        tmpValue[key] = (itemValue as Moment).format(formatString || 'YYYY-MM-DD HH:mm:ss');
        return;
      }
      if (dateFormatter === 'number') {
        tmpValue[key] = (itemValue as Moment).valueOf();
        return;
      }
    }

    // 这里是日期数组
    if (Array.isArray(itemValue) && itemValue.length === 2 && dateFormatter) {
      if (dateFormatter === 'string') {
        const formatString = dateFormatterMap[valueType as 'dateTime'];
        const [startValue, endValue] = itemValue;
        tmpValue[key] = [
          moment(startValue as Moment).format(formatString || 'YYYY-MM-DD HH:mm:ss'),
          moment(endValue as Moment).format(formatString || 'YYYY-MM-DD HH:mm:ss'),
        ];
        return;
      }
      if (dateFormatter === 'number') {
        const [startValue, endValue] = itemValue;
        tmpValue[key] = [
          moment(startValue as Moment).valueOf(),
          moment(endValue as Moment).valueOf(),
        ];
      }
    }

    // 都没命中，原样返回
    tmpValue[key] = itemValue;
  });
  return tmpValue;
};

const getDefaultSearch = (
  search: boolean | SearchConfig | undefined,
  intl: IntlType,
): SearchConfig => {
  const config = {
    collapseRender: (collapsed: boolean) => {
      if (collapsed) {
        return (
          <>
            {intl.getMessage('tableForm.collapsed', '展开')}
            <DownOutlined
              style={{
                marginLeft: '0.5em',
                transition: '0.3s all',
                transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
              }}
            />
          </>
        );
      }
      return (
        <>
          {intl.getMessage('tableForm.expand', '收起')}
          <DownOutlined
            style={{
              marginLeft: '0.5em',
              transition: '0.3s all',
              transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
            }}
          />
        </>
      );
    },
    searchText: intl.getMessage('tableForm.search', defaultSearch.searchText || '查询'),
    resetText: intl.getMessage('tableForm.reset', defaultSearch.resetText || '重置'),
    submitText: intl.getMessage('tableForm.submit', defaultSearch.submitText || '提交'),
    span: defaultColConfig,
  };

  if (search === undefined || search === true) {
    return config;
  }

  return { ...config, ...search } as Required<SearchConfig>;
};

/**
 * 合并用户和默认的配置
 * @param span
 * @param size
 */
const getSpanConfig = (
  span: number | typeof defaultColConfig,
  size: keyof typeof defaultColConfig,
): number => {
  if (typeof span === 'number') {
    return span;
  }
  const config = {
    ...defaultColConfig,
    ...span,
  };
  return config[size];
};

const FormSearch = <T, U = {}>({
  onSubmit,
  formRef,
  dateFormatter = 'string',
  search: propsSearch,
  form: formConfig = {},
  onReset,
}: TableFormItem<T>) => {
  /**
   * 为了支持 dom 的消失，支持了这个 api
   */
  const intl = useIntl();

  const [form] = Form.useForm();
  const formInstanceRef = useRef<
    Omit<FormInstance, 'scrollToField' | '__INTERNAL__'> | undefined
  >();

  const searchConfig = getDefaultSearch(propsSearch, intl);
  const { span } = searchConfig;

  const counter = Container.useContainer();
  const [collapse, setCollapse] = useMergeValue<boolean>(false, {
    value: searchConfig.collapsed,
    onChange: searchConfig.onCollapse,
  });
  const [PowerColumnsMap, setPowerColumnsMap] = useState<{
    [key: string]: BuildFormColumns<any>;
  }>({});

  const windowSize = useMediaQuery();
  const [colSize, setColSize] = useState(getSpanConfig(span || 8, windowSize));
  const [formHeight, setFormHeight] = useState<number | undefined>(88);
  const rowNumber = 24 / colSize || 3;

  /**
   *提交表单，根据两种模式不同，方法不相同
   */
  const submit = async () => {
    // 如果不是表单模式，不用进行验证
    const value = form.getFieldsValue();
    addUrlParams(value, true);
    if (onSubmit) {
      onSubmit(conversionValue(value, dateFormatter, PowerColumnsMap) as T);
    }
  };

  function willUnmount() {
    form.resetFields();
  }

  useEffect(() => {
    if (!formRef) {
      return;
    }
    if (typeof formRef === 'function') {
      formRef(form);
    }
    if (formRef && typeof formRef !== 'function') {
      // eslint-disable-next-line no-param-reassign
      formRef.current = {
        ...form,
        submit: () => {
          submit();
          form.submit();
        },
      };
    }
    // eslint-disable-next-line consistent-return
    return willUnmount;
  }, []);

  useEffect(() => {
    setColSize(getSpanConfig(span || 8, windowSize));
  }, [windowSize]);

  useDeepCompareEffect(() => {
    const tempMap = {};
    counter.powerColumns.forEach((item) => {
      tempMap[genColumnKey(item.key, item.dataIndex, item.index) || 'null'] = item;
    });
    setPowerColumnsMap(tempMap);
  }, [counter.powerColumns]);

  const columnsList = counter.powerColumns
    .filter((item) => {
      const { valueType } = item;
      if (item.hideInSearch) {
        return false;
      }
      if (item.hideInForm) {
        return false;
      }
      if (
        valueType !== 'index' &&
        valueType !== 'indexBorder' &&
        valueType !== 'option' &&
        (item.key || item.dataIndex)
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      if (a && b) {
        return (b.order || 0) - (a.order || 0);
      }
      if (a && a.order) {
        return -1;
      }
      if (b && b.order) {
        return 1;
      }
      return 0;
    });

  const colConfig = typeof span === 'number' ? { span } : span;

  // 这么做是为了在用户修改了输入的时候触发一下子节点的render
  const [, updateState] = React.useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const domList = formInstanceRef.current
    ? columnsList
        .map((item) =>
          proFormItemRender({
            formInstance: formInstanceRef.current,
            item,
            colConfig,
            intl,
          }),
        )
        .filter((_ignore, index) => (collapse ? index < (rowNumber - 1 || 1) : true))
        .filter((item) => !!item)
    : [];

    const paramInfo = getParams();
    useDeepCompareEffect(() => {
      form.setFieldsValue(paramInfo);
    }, [paramInfo]);

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const className = getPrefixCls('pro-table-search');
        return (
          <div
            style={
              {
                height: formHeight,
              }
            }
            className={className}
          >
            <RcResizeObserver
              onResize={({ height }) => {
                setFormHeight(height + 24);
              }}
            >
              <div>
                <Form
                  {...formConfig}
                  form={form}
                  onValuesChange={() => forceUpdate()}
                  initialValues={columnsList.reduce(
                    (pre, item) => {
                      const key = genColumnKey(item.key, item.dataIndex, item.index) || '';
                      if (item.initialValue) {
                        return {
                          ...pre,
                          [key]: item.initialValue,
                        };
                      }
                      return pre;
                    },
                    { ...formConfig.initialValues },
                  )}
                >
                  <Form.Item shouldUpdate noStyle>
                    {(formInstance) => {
                      // @ts-ignore
                      formInstanceRef.current = formInstance;
                      return null;
                    }}
                  </Form.Item>
                  <Row gutter={16} justify="start">
                    <Form.Item shouldUpdate noStyle>
                      <>{domList}</>
                    </Form.Item>
                    <Col
                      {...colConfig}
                      offset={getOffset(domList.length, colSize)}
                      key="option"
                      className={classNames(`${className}-option`)}
                    >
                      <Form.Item>
                        <FormOption
                          showCollapseButton={columnsList.length > rowNumber - 1}
                          searchConfig={searchConfig}
                          submit={submit}
                          onReset={() => {
                            const formSet = form.getFieldsValue();
                            _.forEach(_.keys(formSet), (key) => {
                              _.set(formSet, key, '');
                            });
                            addUrlParams(formSet);
                            form.resetFields();
                            if (_.isFunction(onReset)){
                              onReset();
                            }
                          }}
                          form={{
                            ...form,
                            submit: () => {
                              submit();
                              form.submit();
                            },
                          }}
                          collapse={collapse}
                          setCollapse={setCollapse}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </RcResizeObserver>
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

export default FormSearch;
