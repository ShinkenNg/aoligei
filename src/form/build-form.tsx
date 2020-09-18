import React, { useState } from 'react';
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
} from 'antd';

import { ColProps } from 'antd/es/grid/col';
import { FormLayout } from 'antd/es/form/Form';
import { SizeType } from 'antd/es/config-provider/SizeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Store } from 'rc-field-form/es/interface';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import _ from 'lodash';
import { numberRegex } from '../utils/regex';
import PowerDatePicker from '../power-date-picker';
// import {StatusType} from "@/components/PowerList/component/status";
import {SearchInput} from '../search-input';
import PowerText from '../power-text';
import { useIntl } from '../intl-context';

import PowerRichText from '../power-richtext';
import {PowerUpload} from '../power-upload';
import PowerSKU from '../power-sku';
import {PowerInputNumber} from '../power-input-number';

import { useDeepCompareEffect } from '../power-list/component/util';
import { BuildFormColumns, PowerListTypes } from '../columns';

const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export interface BuildFormAction<T> {
  text: string;
  // 有提交和重置两种预设动作
  type: 'submit' | 'reset' | 'other';
  // 按钮对应的点击事件
  onClick: (form: FormInstance) => void;
}

export interface BuildFormProps<T> extends Omit<RcFormProps, 'form'> {
  columns: BuildFormColumns<T>[];
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
  itemColSpan?: number | typeof defaultColConfig;
  // 请求数据的方法
  request: (data: Store) => Promise<any>;
  // 获取form实例
  getInstance?: (form: FormInstance<any>) => void;
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
    request,
    ...rest
  } = props;
  const {
    layout: formLayout,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    initialValues: formInitialValues,
  } = form || {};

  const columns = _.orderBy(originColumns, 'buildFormOrder', 'desc');

  const labelCol: ColProps = formLabelCol || { span: 4 };
  const wrapperCol: ColProps = formWrapperCol || { span: 24 };
  const layout: FormLayout = formLayout || 'horizontal';
  const initialValues = formInitialValues || {};
  const size: SizeType = formSize || 'middle';

  const itemCol = _.isNumber(itemColSpan) ? { span: itemColSpan } : defaultColConfig;

  // 使用表单hooks
  const [formHook] = Form.useForm();

  // 国际化hooks
  const intl = useIntl();

  // 定义类型
  const selfType: PowerListTypes = 'form';

  // 保存表单值, 也可触发rerender
  const [formValues, setFormValues] = useState({});

  const [submitting, setSubmitting] = useState(false);

  useDeepCompareEffect(() => {
    // 初始值不同时，需要更新进form
    setFormValues(initialValues);
    formHook.resetFields();
  }, [initialValues]);

  useDeepCompareEffect(() => {
    if (_.isFunction(props.getInstance)) {
      props.getInstance(formHook);
    }
  }, [formHook]);

  // 接管表单的字段变化
  const onFormValueChange = () => {
    const values: Store = formHook.getFieldsValue();
    setFormValues(values);
    if (_.isFunction(onChange)) {
      onChange(formValues);
    }
  };

  // 暴露的外部onChange回调
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCallbackChange = (dataIndex?: string | number | (string | number)[], value?: any) => {
    const result = {};
    // @ts-ignore
    _.set(result, dataIndex, value);

    formHook.setFieldsValue(result);
    formHook.resetFields();
    onFormValueChange();
  };

  // 渲染表单项
  const renderFormItem = (item: BuildFormColumns<T>) => {
    if (_.isFunction(item.renderBuildFormItem)) {
      const { dataIndex } = item;
      const config = {
        defaultRender: (columnItem: BuildFormColumns<T>) => {
          return <span>{columnItem.label} 没有得到正确渲染，请检查代码</span>;
        },
        onChange: (value: any) => {
          onCallbackChange(dataIndex, value);
        },
        onSelect: (value: any) => {
          onCallbackChange(dataIndex, value);
        },
        type: selfType,
        value: _.get(formHook.getFieldsValue(), `${dataIndex}`),
      };
      // 调用item自己的渲染
      return item.renderBuildFormItem(item, config, formHook);
    }
    // 取extra props
    const extraProps = item.buildFormItemExtraProps || {};

    // 借助表单设定的shouldUpdate，实现表单更新时处理该字段，有助于后期剥离Antd Form
    if (item.shouldUpdate) {
      extraProps.onChange = () => {
        onFormValueChange();
      }
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
        if (item.buildFormValueType === 'radio') {
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
      if (item.buildFormValueType === 'radio') {
        GroupComp = Radio.Group;
      }
      return (
        <GroupComp {...extraProps}>
          {options}
        </GroupComp>
      );
    }

    // 取两种类型之一
    const valueType = item.buildFormValueType || item.valueType;
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
  };

  // submit动作，分用户是否自定义了submit钩子两种情况
  const formSubmit = async () => {
    // 进行表单验证
    try {
      // 设置提交loading
      setSubmitting(true);
      let values = await formHook.validateFields();

      if (_.isFunction(postData)) {
        values = postData(values);
      }

      const text = loadingText || intl.getMessage('tableForm.submitting', '提交中...');
      const hide = message.loading(text);
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
    } finally {
      setSubmitting(false);
    }
  };

  // 预设的渲染表单动作，关于表单动作，如用户不自定义，则仅有重置和提交
  const renderFormAction = () => {
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
      >
        <Row gutter={16} justify="start">
          {_.map(columns, (item) => {
            // 判断是否显示
            if (_.isFunction(item.buildFormIsRenderItem)) {
              if (!item.buildFormIsRenderItem(formHook)) {
                return false;
              }
            }
            if (_.isBoolean(item.buildFormIsRenderItem)) {
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
              hide = item.buildFormHideItem(formHook);
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
                key={`form_${item.title}_${item.dataIndex}_`}
              >
                <Form.Item
                  rules={rules}
                  required={item.required}
                  name={dataIndex}
                  label={item.title}
                  dependencies={dependencies}
                  trigger={item.trigger}
                  shouldUpdate={item.shouldUpdate}
                  validateTrigger={item.validateTrigger}
                  extra={item.extra}
                >
                  {renderFormItem(item)}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        {renderFormAction()}
      </Form>
    </div>
  );
}
