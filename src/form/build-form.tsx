import React, { useCallback, useRef, useState } from 'react';
import { FormInstance, FormProps } from 'antd/es/form';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  TimePicker,
  Row,
  Col,
  Radio,
  Rate,
  Divider,
} from 'antd';

import { ColProps } from 'antd/es/grid/col';
import { FormLayout } from 'antd/es/form/Form';
import { SizeType } from 'antd/es/config-provider/SizeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Store } from 'rc-field-form/es/interface';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import _ from 'lodash';
import { ButtonProps } from 'antd/es/button';
import { numberRegex } from '../utils/regex';
import PowerDatePicker from '../power-date-picker';
// import {StatusType} from "@/components/PowerList/component/status";
import {SearchInput} from '../search-input';
import PowerText from '../power-text';
import { IntlType, useIntl } from '../intl-context';

import {PowerRichText} from '../power-richtext';
import {PowerUpload} from '../power-upload';
import PowerSKU from '../power-sku';
import {PowerInputNumber} from '../power-input-number';

import { useDeepCompareEffect } from '../power-list/component/util';
import { BuildFormColumns } from '../columns';

const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export interface BuildFormAction<T> extends Omit<ButtonProps, 'onClick'> {
  text?: string;
  // 按钮对应的点击事件
  onClick?: (form: FormInstance, request: (data: Store) => Promise<any>) => void;
  // 当传入element时，则直接渲染该元素
  element?: JSX.Element;
}

export type ColConfig =  {
  lg?: number;
  md?: number;
  xxl?: number;
  xl?: number;
  sm?: number;
  xs?: number;
}
| {
    span: number;
  }
| undefined;

// 高级的表单列，可分组
export type AdvancedGroupItem<T> = Array<
{
  columns: BuildFormColumns<T>[],
  title?: string;
  extra?: React.ReactNode;
  shouldUpdate?: boolean;
  labelCol?: ColProps;
  itemColSpan?: ColConfig;
}
>
export interface AdvancedBuildFormColumns<T> {
  groups: AdvancedGroupItem<T>;
  useDivider?: boolean;
  extra?: React.ReactNode;
}

export interface BuildFormProps<T> extends Omit<RcFormProps, 'form'> {
  lock?: boolean;
  columns: BuildFormColumns<T>[] | AdvancedBuildFormColumns<T>;
  // 表单属性，直接取用ant design form的Props
  form?: FormProps;
  // submit回调
  onSubmit?: (params: Store) => Promise<T>;
  // cancel回调
  onCancel?: () => void;
  // onChange回调
  onChange?: (values: Store) => void;
  // submit成功callback
  onSuccess?: () => void;
  // postData 用于提交前处理数据
  postData?: (params: Store) => Store;
  // spinning，设置整个表单外层的spin加载
  spinning?: boolean;
  // size, 表单尺寸，等同ant design form
  size?: SizeType;
  // actions, 通过此属性，可覆盖掉默认的表单动作
  // TODO: 待完善
  actions?: BuildFormAction<T>[];
  // 显示的loading消息文本
  loadingText?: string;
  // 一行的col布局
  itemColSpan?: ColConfig;
  // 请求数据的方法
  request: (data: Store) => Promise<any>;
  // 获取form实例
  getInstance?: (form: FormInstance<any>) => void;
}

export const FormInputRender: React.FC<{
  item: BuildFormColumns<any>;
  value?: any;
  intl: IntlType;
  lock?: boolean;
  form?: Omit<FormInstance, 'scrollToField' | '__INTERNAL__'>;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}> = (props) => {
  /* 被form接管之后，value和change select事件都被传进生成item中 */
  const { item, intl, form, lock, ...rest } = props;

  const { buildFormValueType } = item;

  if (item.renderBuildFormItem) {
    const { renderBuildFormItem, ...restItem } = item;
    const defaultRender = (newItem: BuildFormColumns<any>) => (
      <FormInputRender
        {...({
          ...props,
          item: newItem,
        } || null)}
      />
    );

    // 注入受控值
    const dom = renderBuildFormItem(
      restItem,
      { ...rest, defaultRender, lock },
      form as any,
    ) as React.ReactElement;

    // 验证元素
    if (!React.isValidElement(dom)) {
      // 非有效，返回
      return dom;
    }
    const defaultProps = dom.props as any;
    // 以dom本身的props为主
    return React.cloneElement(dom, { ...rest, ...defaultProps });
  }

  // 取extra props并注入受控属性
  const extraProps = {...(item.buildFormItemExtraProps || {}), ...rest};

  // 当表单锁定时，所有组件都不可编辑
  if (lock) {
    return <PowerText {...extraProps} />;
  }

  if (!_.isEmpty(item.valueEnum)) {
    // eslint-disable-next-line no-shadow
    const options = _.map(
      _.filter(_.entries(item.valueEnum), (n) => {
        const [,label] = n;
        return !_.get(label, 'hideInForm');
      }),
      (valueItem) => {
      const [value, label] = valueItem;
      let ItemComp: any = Select.Option;
      // 判断组件类型
      if (buildFormValueType === 'radio') {
        ItemComp = Radio;
      }

      // 如果是数字，需要精确
      return (
        <ItemComp value={numberRegex.test(value) ? _.toNumber(value) : value} key={value}>
          {label.text}
        </ItemComp>
      );
    });
    let GroupComp: any = Select;
    if (buildFormValueType === 'radio') {
      GroupComp = Radio.Group;
    }
    return (
      <GroupComp {...extraProps}>
        {options}
      </GroupComp>
    );
  }

  // 取两种类型之一
  const valueType = buildFormValueType || item.valueType;
  switch (valueType) {
    case 'money':
      return <InputNumber {...extraProps} />;
    case 'digit':
      return <PowerInputNumber {...extraProps} />;
    case 'time':
      return <TimePicker {...extraProps} />;
    case 'date':
      return <PowerDatePicker {...extraProps} />;
    case 'dateTime':
      return <PowerDatePicker {...extraProps} showTime />;
    case 'dateTimeRange':
      return (
        <DatePicker.RangePicker
          {...extraProps}
          placeholder={[
            intl.formatMessage('tableForm.selectPlaceholder', { title: item.title }, '请选择'),
            intl.formatMessage('tableForm.selectPlaceholder', { title: item.title }, '请选择'),
          ]}
        />
      );
    case 'textarea':
      return <Input.TextArea {...extraProps} />;
    case 'searchInput':
      return <SearchInput {...extraProps} />;
    case 'powerText':
      return <PowerText {...extraProps} />;
    case 'password':
      return <Input.Password {...extraProps} />;
    case 'richText':
      return <PowerRichText {...extraProps} />;
    case 'upload':
      return <PowerUpload {...extraProps} />;
    case 'sku':
      return <PowerSKU {...extraProps} />;
    case 'rate':
      return <Rate {...extraProps}/>;
    default:
      // @ts-ignore
      return <Input autoComplete="off" {...extraProps} />;
  }
}

const buildItem = (props: {
  item: BuildFormColumns<any>,
  intl: IntlType,
  formInstance?: FormInstance<any>,
  lock?: boolean,
  itemCol: ColConfig,
  labelCol?: ColProps,
}) => {
  const {item, intl, formInstance, itemCol, labelCol, lock} = props;
  // 判断是否显示
  if (_.isFunction(item.buildFormIsRenderItem)) {
    if (!formInstance) {
      return false;
    }
    if (!item.buildFormIsRenderItem(formInstance)) {
      return false;
    }
  }
  if (_.isBoolean(item.buildFormIsRenderItem)) {
    if (!formInstance) {
      return false;
    }
    if (!item.buildFormIsRenderItem) {
      return false;
    }
  }
  // form隐藏或者类型是操作的，不创建
  if (item.hideInForm || item.valueType === 'option') {
    return false;
  }
  // 样式上的隐藏
  let hide = item.buildFormHideItem;
  if (_.isFunction(item.buildFormHideItem)) {
    if (!formInstance) {
      return false;
    }
    hide = item.buildFormHideItem(formInstance);
  }

  const rules = item.rules || [];
  // 在设置了必填样式时，帮忙填充一条必填规则
  if (item.required && _.findIndex(rules, {required: true}) < 0) {
    const requiredItem = {
      required: true,
      // message: `${item.title} ${intl.formatMessage({ id: 'tooltip.required' })}`,
    };
    rules.push(requiredItem);
  }

  // 如果没有placeholder,则为其插入默认的,可配置国际化
  if (!_.get(item, 'buildFormItemExtraProps.placeholder')) {
    let placeholder = '';
    let msgId = 'tableForm.inputPlaceholder';
    const selectType = [
      'searchInput',
      'date',
      'dateRange',
      'dateTimeRange',
      'dateTime',
      'time',
    ];
    if (
      _.get(item, 'valueEnum') ||
      _.get(item, 'radioEnum') ||
      _.get(item, 'selectEnum')
    ) {
      msgId = 'tableForm.selectPlaceholder';
    }
    if (_.includes(selectType, _.get(item, 'buildFormValueType'))) {
      msgId = 'tableForm.selectPlaceholder';
    }
    placeholder = intl.formatMessage(msgId, { title: item.title }, msgId);
    _.set(item, 'buildFormItemExtraProps.placeholder', placeholder);
  }

  let dataIndex = _.get(item, 'dataIndex');
  if (_.includes(_.toString(item.dataIndex), '.')) {
    dataIndex = _.split(_.toString(item.dataIndex), '.');
  }

  const dependencies = _.get(item, 'dependencies');

  return (
    <Col
      {...itemCol}
      className={hide ? 'eom-hide' : ''}
      style={hide ? {display: 'none'} : {}}
      key={`form_${item.title}_${item.dataIndex}_`}
    >
      <Form.Item
        rules={rules}
        required={item.required}
        name={dataIndex}
        labelCol={labelCol}
        label={item.title}
        dependencies={dependencies}
        trigger={item.trigger}
        shouldUpdate={item.shouldUpdate}
        validateTrigger={item.validateTrigger}
        extra={item.extra}
      >
        <FormInputRender item={item} intl={intl} form={formInstance} lock={lock} />
      </Form.Item>
    </Col>
  );
}

export function BuildForm<T>(props: BuildFormProps<T>) {
  const {
    form,
    size: formSize,
    columns: originColumns,
    onChange,
    onSubmit,
    onSuccess,
    postData,
    loadingText,
    itemColSpan,
    onValuesChange,
    request,
    lock,
    ...rest
  } = props;
  const {
    layout: formLayout,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    initialValues: formInitialValues,
  } = form || {};

  // 获取全部列与排序
  let columns: any;
  // 非数组的是则当作高级配置
  if (!_.isArray(originColumns)) {
    // 存在高级Columns
    columns = _.cloneDeep(originColumns);
    const groups = _.get(originColumns, 'groups');
    const newGroups: any[] = [];
    _.forEach(groups, (group) => {
      const tempGroup = _.cloneDeep(group);
      const orderColumns = _.orderBy(_.get(group, 'columns'), 'buildFormOrder', 'desc');
      _.set(tempGroup, 'columns', orderColumns);
      newGroups.push(tempGroup);
    });
    _.set(columns, 'groups', newGroups);
  } else {
    columns = _.orderBy(originColumns, 'buildFormOrder', 'desc');
  }

  const labelCol: ColProps = formLabelCol || { span: 4 };
  const wrapperCol: ColProps = formWrapperCol || { span: 24 };
  const layout: FormLayout = formLayout || 'horizontal';
  const initialValues = formInitialValues || {};
  const size: SizeType = formSize || 'middle';

  const itemCol = _.isNumber(itemColSpan) ? { span: itemColSpan } : (itemColSpan || defaultColConfig);

  // 使用表单hooks
  const [formHook] = Form.useForm();

  // @ts-ignore
  window.formHook_debug = formHook;

  const formInstanceRef = useRef<FormInstance<any>>();

  // 国际化hooks
  const intl = useIntl();

  const [submitting, setSubmitting] = useState(false);

  // 对表单进行更新
  const [, updateState] = React.useState();


  // @ts-ignore
  const forceUpdate = useCallback(() => updateState({}), []);

  useDeepCompareEffect(() => {
    // 初始值不同时，需要更新进form
    formInstanceRef.current?.setFieldsValue(initialValues);
    forceUpdate();
  }, [initialValues]);

  useDeepCompareEffect(() => {
    if (_.isFunction(props.getInstance)) {
      props.getInstance(formHook);
    }
  }, [formHook]);

  // submit动作，分用户是否自定义了submit钩子两种情况
  const formSubmit = async () => {
    // 设置提交loading
    setSubmitting(true);
    // 进行表单验证
    try {
      const text = loadingText || intl.getMessage('tableForm.submitting', '提交中...');
      const hide = message.loading(text);
      window.focus();
      // timeout解决提交时意外的数据超时修改
      let values = await formHook.validateFields();
      if (_.isFunction(postData)) {
        values = postData(formHook.getFieldsValue());
      }

      // const values = formHook.getFieldsValue();
      if (_.isFunction(onSubmit)) {
        try {
          await onSubmit(values);
          setTimeout(() => {
            if (_.isFunction(onSuccess)) {
              onSuccess();
            }
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      } else if (_.isFunction(request)) {
        // 用户定义了url,执行由内部执行submit
        try {
          await request(values);
          message.success(intl.getMessage('tableForm.submitSuccess', '提交成功'));
          setTimeout(() => {
            if (_.isFunction(onSuccess)) {
              onSuccess();
            }
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
      setSubmitting(false);
      hide();
    } catch(e) {
      window.console.error(e);
    }
    finally {
      setSubmitting(false);
    }
  };

  // 预设的渲染表单动作，关于表单动作，如用户不自定义，则仅有重置和提交
  const renderFormAction = () => {
    // 处理用户定义的动作
    const {actions} = props;

    if (_.isArray(actions)) {
      const actionElem: JSX.Element[] = [];
      _.forEach(actions, (action, index) => {
        const {text, onClick, element, ...btnRest} = action;
        if (element) {
          actionElem.push(element);
        } else {
          actionElem.push(
            <Button
              {...btnRest}
              onClick={() => {
                if (_.isFunction(onClick)) {
                  onClick(formHook, request);
                }
              }}
              key={`form_btn_op_${index}`}
            >
              {text}
            </Button>
          );
        }
      });
      return (
        <Form.Item style={{ textAlign: 'right' }}>
          <Space>
            {actionElem}
          </Space>
        </Form.Item>
      );
    }

    return (
      <Form.Item style={{ textAlign: 'right' }}>
        <Space>
          <Button
            onClick={() => {
              // 重置清空
              formHook.resetFields();
            }}
          >
            {intl.getMessage('tableForm.reset', '重置')}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={submitting}
            loading={submitting}
            onClick={formSubmit}
          >
            {intl.getMessage('tableForm.submit', '提交')}
          </Button>
        </Space>
      </Form.Item>
    );
  };

  let domItemList: any;
  // 是否高级表单
  if ((columns as Object).hasOwnProperty('groups')) {
    // 特殊处理
    const useDivider = _.get(columns, 'useDivider', 'true');
    const columnList: any[] = [];
    _.forEach(_.get(columns, 'groups'), (group, groupIndex) => {
      const isLast = _.toInteger(groupIndex) >= _.get(columns, 'groups.length') - 1;
      const extra = _.get(group, 'extra');
      const shouldUpdate = _.get(group, 'shouldUpdate', false);
      const col = _.get(group, 'itemColSpan') || itemCol;
      const columnItems: any[] = _.map(_.get(group, 'columns'), (item) => {
        return buildItem({
          item,
          intl,
          formInstance: formInstanceRef.current,
          itemCol: col,
          labelCol: _.get(group, 'labelCol'),
          lock,
        });
      });
      columnList.push(
        <div style={{width: '100%'}} key={`form_group_${groupIndex}`}>
          {
            _.get(group, 'title') &&
            <div style={{fontSize: 15, color: '#333', fontWeight: 600, marginBottom: 12}}>{_.get(group, 'title')}</div>
          }
          <Row gutter={16} justify="start">
            <Form.Item shouldUpdate={shouldUpdate} noStyle>
              {columnItems}
            </Form.Item>
          </Row>
          {(!isLast && useDivider) && <Divider type="horizontal" />}
          {
            extra && <div style={{marginTop: 12}}>{extra}</div>
          }
        </div>
      );
    });
    if (_.get(columns, 'extra')) {
      // 有额外插入的，例如按钮、说明等
      columnList.push(
        <div style={{marginTop: 12}}>
          {_.get(columns, 'extra')}
        </div>
      );
    }
    domItemList = columnList;
  } else {
    const itemList = formInstanceRef.current ? _.map(columns, (item) => {
      return buildItem({
        item,
        intl,
        formInstance: formInstanceRef.current,
        itemCol,
        lock,
      });
    }) : [];
    domItemList = (
      <Row gutter={16} justify="start">
        <Form.Item shouldUpdate noStyle>
          {itemList}
        </Form.Item>
      </Row>
    );
  }


  return (
    <div>
      <Form
        {...rest}
        layout={layout}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        initialValues={initialValues}
        size={size}
        form={formHook}
        onValuesChange={(changedValues, values) => {
          if (_.isFunction(onValuesChange)) {
            onValuesChange(changedValues, values);
          }
          forceUpdate();
        }}
      >
        <Form.Item shouldUpdate noStyle>
          {(formInstance) => {
            // @ts-ignore
            formInstanceRef.current = formInstance;
            return null;
          }}
        </Form.Item>

        {
          domItemList
        }
        {renderFormAction()}
      </Form>
    </div>
  );
}
