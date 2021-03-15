import { ColumnType } from 'antd/es/table';
import { FormItemProps, FormInstance, Rule } from 'antd/es/form';
import { ReactNode, ReactText } from 'react';
import { UseFetchDataAction, RequestData } from '../power-list/use-fetch-data';
import { StatusType } from '../power-list/component/status';
import { PowerColumnsValueType } from '../power-list';
import { PowerColumnsValueTypeFunction } from '../power-list/default-render';

export type ValueEnumObj = {
  [key: string]:
    | {
    text: ReactNode;
    status: StatusType;
    hideInForm: boolean;
  }
    | ReactNode;
};

export type ValueEnumMap = Map<ReactText,
  | {
  text: ReactNode;
  status: StatusType;
  hideInForm: boolean;
}
  | ReactNode>;

// table 支持的变形，还未完全支持完毕
export type PowerListTypes = 'form' | 'list' | 'table' | 'cardList' | undefined;

export interface PowerColumnType<T = unknown>
  extends Omit<ColumnType<T>, 'render' | 'children' | 'title'>,
    Partial<Omit<FormItemProps, 'children'>> {
  index?: number;
  title?: ReactNode | ((config: PowerColumnType<T>, type: PowerListTypes) => ReactNode);
  /**
   * 自定义 render
   */
  render?: (
    text: React.ReactNode,
    record: T,
    index: number,
    action: UseFetchDataAction<RequestData<T>>,
  ) => React.ReactNode | React.ReactNode[];

  /**
   * 自定义 render，但是需要返回 string
   */
  renderText?: (
    text: any,
    record: T,
    index: number,
    action: UseFetchDataAction<RequestData<T>>,
  ) => any;

  /**
   * 自定义搜索 form 的输入
   */
  renderFormItem?: (
    item: PowerColumns<T>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: PowerListTypes;
      defaultRender: (newItem: PowerColumns<any>) => JSX.Element | null;
    },
    form: Omit<FormInstance, 'scrollToField' | '__INTERNAL__'>,
  ) => JSX.Element | false | null;

  /**
   * 表单字段名
   * 特殊场景中，不可复用dataIndex
   * */
  formItemName?: string;

  /**
   * 搜索表单的 props
   */
  formItemProps?: { [prop: string]: any };

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

export type PowerColumns<T = {}> = PowerColumnGroupType<T> | PowerColumnType<T>;

// select框的常量值
export type SelectEnumObj = {
  [value: string]: any;
};

export interface BuildFormColumns<T> extends Omit<PowerColumns<T>, 'extra'> {
  // 控制item是否显示，但仍然提交
  buildFormHideItem?: ((form: FormInstance) => boolean) | boolean;
  // 控制item是否渲染，和上面那个配合，两者区别，如同创建 更新表单的区别
  buildFormIsRenderItem?: ((form: FormInstance) => boolean) | boolean;
  // 控制item的额外属性, 需要注意的是，这些props你应该从ant design或对应的组件库中查找
  buildFormItemExtraProps?: {
    [prop: string]: any;
  };
  // 控制item的组件类型, 可拓展, 此处独立区别于pro layout的valueType，有助于彻底剥离form
  // powerText用于表单的不可修改项(非disable,而是纯文本展示)
  buildFormValueType?:
    | 'money'
    | 'textarea'
    | 'option'
    | 'radio'
    | 'date'
    | 'dateRange'
    | 'dateTimeRange'
    | 'dateTime'
    | 'time'
    | 'text'
    | 'index'
    | 'indexBorder'
    | 'progress'
    | 'percent'
    | 'digit'
    | 'avatar'
    | 'code'
    | 'searchInput'
    | 'password'
    | 'richText'
    | 'upload'
    | 'sku'
    | 'rate'
    | 'powerText';

  // selectEnum?: SelectEnumObj;
  // 表单过滤值
  // 如远程搜索，需要对数据进行过滤的场景
  // 需要注意的是，这需要组件本身支持Filter
  buildFormFilter?: (form: FormInstance, input: any, option: any) => boolean;

  // 表单的排序值
  buildFormOrder?: number;

  // 自定义渲染方法
  renderBuildFormItem?: (
    item: BuildFormColumns<T>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      // type: PowerListTypes;
      defaultRender: (newItem: BuildFormColumns<any>) => JSX.Element | null;
      lock?: boolean;
    },
    form: Omit<FormInstance, 'scrollToField' | '__INTERNAL__'>,
  ) => JSX.Element | false | null;

  // rules验证规则
  rules?: Rule[];
  // 是否必填
  required?: boolean;
  extra?: string | ReactNode;
}
