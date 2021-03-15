import './index.less';

import React, { useEffect, CSSProperties, useRef, useState } from 'react';
import { Table, ConfigProvider, Card, Space, Typography, Empty, Tooltip } from 'antd';
import classNames from 'classnames';
import useMergeValue from 'use-merge-value';
// eslint-disable-next-line import/no-extraneous-dependencies
import { stringify } from 'use-json-comparison';
import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import { FormProps } from 'antd/es/form';
import { TableCurrentDataSource, SorterResult, ColumnType } from 'antd/lib/table/interface';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import _ from 'lodash';
// @ts-ignore
import { Resizable } from 'react-resizable';

// eslint-disable-next-line import/no-extraneous-dependencies
import { noteOnce } from 'rc-util/lib/warning';
import { PowerColumns, PowerListTypes, PowerColumnType } from '../columns';
import { IntlProvider, IntlConsumer, IntlType, useIntl } from '../intl-context';
import useFetchData, { UseFetchDataAction, RequestData, RequestPageMeta } from './use-fetch-data';
import Container from './container';
import Toolbar, { OptionConfig, ToolBarProps } from './component/tool-bar';
import Alert from './component/alert';
import FormSearch, { SearchConfig, TableFormItem } from './form';
import get, {
  parsingText,
  // parsingValueEnumToArray,
  checkUndefinedOrNull,
  useDeepCompareEffect,
  genColumnKey,
  removeObjectNull,
  ObjToMap,
  reduceWidth,
} from './component/util';
import defaultRenderText from './default-render';
import { DensitySize } from './component/tool-bar/density-icon';
import ErrorBoundary from './component/errorboundary';
import {getParams, addUrlParams} from '../utils/utils';

type TableRowSelection = TableProps<any>['rowSelection'];

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

export interface PowerListProps<T, U extends { [key: string]: any }>
  extends Omit<TableProps<T>, 'columns' | 'rowSelection'> {
  columns?: PowerColumns<T>[];

  params?: U;

  columnsStateMap?: {
    [key: string]: ColumnsState;
  };

  onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;

  onSizeChange?: (size: DensitySize) => void;

  /**
   * 一个获得 dataSource 的方法
   */
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
    },
    sort: {
      [key: string]: 'ascend' | 'descend';
    },
    filter: { [key: string]: React.ReactText[] },
  ) => Promise<RequestData<T>>;

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
  tableAlertRender?:
    | ((props: {
        intl: IntlType;
        selectedRowKeys: (string | number)[];
        selectedRows: T[];
      }) => React.ReactNode)
    | false;
  /**
   * 自定义 table 的 alert 的操作
   * 设置或者返回false 即可关闭
   */
  tableAlertOptionRender?:
    | ((props: { intl: IntlType; onCleanSelected: () => void }) => React.ReactNode)
    | false;

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

const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="alg-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
}

const mergePagination = <T extends any[], U>(
  pagination: TablePaginationConfig | boolean | undefined = {},
  action: UseFetchDataAction<RequestData<T>>,
  intl: IntlType,
): TablePaginationConfig | false | undefined => {
  if (pagination === false) {
    return {};
  }
  let defaultPagination: TablePaginationConfig | {} = pagination || {};
  const { current, pageSize } = action;
  if (pagination === true) {
    defaultPagination = {};
  }
  return {
    showTotal: (all, range) =>
      `${intl.getMessage('pagination.total.range', '第')} ${range[0]}-${range[1]} ${intl.getMessage(
        'pagination.total.total',
        '条/总共',
      )} ${all} ${intl.getMessage('pagination.total.item', '条')}`,
    showSizeChanger: true,
    total: action.total,
    ...(defaultPagination as TablePaginationConfig),
    current,
    pageSize,
    onChange: (page: number, newPageSize?: number) => {
      // const purePathName = (window.location.pathname || '').replace(/\//g, '');

      // pageSize 改变之后就没必要切换页码
      if (newPageSize !== pageSize && current !== page) {
        action.setPageInfo({ pageSize, page });
      } else {
        if (newPageSize !== pageSize) {
          action.setPageInfo({ pageSize: newPageSize });
        }
        if (current !== page) {
          action.setPageInfo({ page });
        }
      }

      const pageInfo = {
        pageSize: newPageSize,
        page,
      };
      addUrlParams(pageInfo);
      // sessionStorage.setItem(purePathName, JSON.stringify(pageInfo));

      const { onChange } = pagination as TablePaginationConfig;
      if (onChange) {
        onChange(page, newPageSize || 20);
      }
    },

    onShowSizeChange: (page: number, showPageSize: number) => {
      action.setPageInfo({
        pageSize: showPageSize,
        page,
      });
      const { onShowSizeChange } = pagination as TablePaginationConfig;
      if (onShowSizeChange) {
        onShowSizeChange(page, showPageSize || 20);
      }
    },
  };
};

export type ColumnEmptyText = string | false;

interface ColumRenderInterface<T> {
  item: PowerColumns<T>;
  text: any;
  row: T;
  index: number;
  columnEmptyText?: ColumnEmptyText;
}

/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */
const genEllipsis = (dom: React.ReactNode, item: PowerColumns<any>, text: string) => {
  if (!item.ellipsis) {
    return dom;
  }
  return (
    <Tooltip title={text}>
      <div>{dom}</div>
    </Tooltip>
  );
};

const genCopyable = (dom: React.ReactNode, item: PowerColumns<any>) => {
  if (item.copyable || item.ellipsis) {
    return (
      <Typography.Paragraph
        style={{
          width: reduceWidth(item.width),
          margin: 0,
          padding: 0,
        }}
        copyable={item.copyable}
        ellipsis={item.ellipsis}
      >
        {dom}
      </Typography.Paragraph>
    );
  }
  return dom;
};

/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */
const columRender = <T, U = any>({
  item,
  text,
  row,
  index,
  columnEmptyText,
}: ColumRenderInterface<T>): any => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const counter = Container.useContainer();
  const { action } = counter;
  const { renderText = (val: any) => val, valueEnum = {} } = item;
  if (!action.current) {
    return null;
  }

  const renderTextStr = renderText(
    parsingText(text, ObjToMap(valueEnum)),
    row,
    index,
    action.current,
  );
  const textDom = defaultRenderText<T, {}>(
    renderTextStr,
    item.valueType || 'text',
    index,
    row,
    columnEmptyText,
  );

  const dom: React.ReactNode = genEllipsis(
    genCopyable(textDom, item),
    item,
    renderText(parsingText(text, ObjToMap(valueEnum), true), row, index, action.current),
  );

  if (item.render) {
    const renderDom = item.render(dom, row, index, action.current);

    // 如果是合并单元格的，直接返回对象
    if (
      renderDom &&
      typeof renderDom === 'object' &&
      (renderDom as { props: { colSpan: number } }).props &&
      (renderDom as { props: { colSpan: number } }).props.colSpan
    ) {
      return renderDom;
    }

    if (renderDom && item.valueType === 'option' && Array.isArray(renderDom)) {
      return <Space>{renderDom}</Space>;
    }
    return renderDom as React.ReactNode;
  }
  return checkUndefinedOrNull(dom) ? dom : null;
};

/**
 * 转化 columns 到 power list 的格式
 * 主要是 render 方法的自行实现
 * @param columns
 * @param map
 * @param columnEmptyText
 */
const genColumnList = <T, U = {}>(
  columns: PowerColumns<T>[],
  map: {
    [key: string]: ColumnsState;
  },
  columnEmptyText?: ColumnEmptyText,
): (ColumnsType<T>[number] & { index?: number })[] =>
  (columns
    .map((item) => {
      const { title } = item;
      return {
        ...item,
        title: title && typeof title === 'function' ? title(item, 'table') : title,
        valueEnum: ObjToMap(item.valueEnum),
      };
    })
    .map((item, columnsIndex) => {
      const { key, dataIndex } = item;
      const columnKey = genColumnKey(key, dataIndex, columnsIndex);
      const config = columnKey ? map[columnKey] || { fixed: item.fixed } : { fixed: item.fixed };
      const tempColumns = {
        onFilter: (value: string, record: T) => {
          let recordElement = get(record, item.dataIndex || '');
          if (typeof recordElement === 'number') {
            recordElement = recordElement.toString();
          }
          const itemValue = String(recordElement || '') as string;
          return String(itemValue) === String(value);
        },
        index: columnsIndex,
        // filters: parsingValueEnumToArray(item.valueEnum).filter(
        //   (valueItem) => valueItem && valueItem.value !== 'all',
        // ),
        ...item,
        ellipsis: false,
        fixed: config.fixed,
        width: item.width || (item.fixed ? 200 : undefined),
        // @ts-ignore
        children: item.children ? genColumnList(item.children, map, columnEmptyText) : undefined,
        render: (text: any, row: T, index: number) =>
          columRender<T>({ item, text, row, index, columnEmptyText }),
      };
      if (!tempColumns.children || !tempColumns.children.length) {
        delete tempColumns.children;
      }
      if (!tempColumns.dataIndex) {
        delete tempColumns.dataIndex;
      }
      // 如果存在点连接.符号
      if (tempColumns.dataIndex?.toString().includes('.')) {
        // 转为 ant design table接受的格式
        tempColumns.dataIndex = tempColumns.dataIndex?.toString().split('.');
      }
      if (!tempColumns.filters || !tempColumns.filters.length) {
        delete tempColumns.filters;
      }
      return tempColumns;
    })
    .filter((item) => !item.hideInTable) as unknown) as ColumnsType<T>[number] &
    {
      index?: number;
    }[];

/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
const PowerList = <T extends {}, U extends object>(
  props: PowerListProps<T, U> & {
    defaultClassName: string;
  },
) => {
  const {
    request,
    className: propsClassName,
    params = {},
    defaultData = [],
    headerTitle,
    postData,
    pagination: propsPagination,
    actionRef,
    components,
    columns: propsColumns = [],
    toolBarRender = () => [],
    onLoad,
    onRequestError,
    style,
    tableStyle,
    tableClassName,
    columnsStateMap,
    onColumnsStateChange,
    options,
    search = true,
    rowSelection: propsRowSelection = false,
    beforeSearchSubmit = (searchParams: Partial<U>) => searchParams,
    tableAlertRender,
    defaultClassName,
    formRef,
    type = 'table',
    onReset = () => {},
    columnEmptyText = '-',
    getPageMeta,
    ...rest
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useMergeValue<React.ReactText[]>([], {
    value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
  });
  const [formSearch, setFormSearch] = useState<{}>(() => rest.form?.initialValues);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [proFilter, setProFilter] = useState<{
    [key: string]: React.ReactText[];
  }>({});

  const [stateColumns, setStateColumns] = useState<ColumnType<any>[]>([]);

  const [proSort, setProSort] = useState<{
    [key: string]: 'ascend' | 'descend';
  }>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const fullScreen = useRef<() => void>();

  /**
   * 需要初始化 不然默认可能报错
   * 这里取了 defaultCurrent 和 current
   * 为了保证不会重复刷新
   */
  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

  const action = useFetchData(
    async ({ pageSize, current }) => {
      if (!request) {
        return ({
          data: props.dataSource || [],
          success: true,
        } as unknown) as RequestData<T>;
      }
      const msg = await request(
        {
          page: current,
          pageSize,
          ...formSearch,

          ...params,
        } as U,
        proSort,
        proFilter,
      );
      if (postData) {
        return { ...msg, data: postData(msg.data) };
      }
      return msg;
    },
    defaultData,
    {
      defaultCurrent: fetchPagination.current || fetchPagination.defaultCurrent,
      defaultPageSize: fetchPagination.pageSize || fetchPagination.defaultPageSize,
      onLoad,
      onRequestError,
      getMeta: getPageMeta,
      effects: [stringify(params), stringify(formSearch), stringify(proFilter), stringify(proSort)],
    },
  );

  useEffect(() => {
    fullScreen.current = () => {
      // @ts-ignore
      if (!rootRef.current || !(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled)) {
        return;
      }
      // @ts-ignore
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        if (_.isFunction(document.exitFullscreen)) {
          document.exitFullscreen();
          // @ts-ignore
        } else if (_.isFunction(document.webkitExitFullscreen)) {
          // @ts-ignore
          document.webkitExitFullscreen();
          // @ts-ignore
        } else if (_.isFunction(document.mozCancelFullScreen)) {
          // @ts-ignore
          document.mozCancelFullScreen();
        }
      } else if (_.isFunction(rootRef.current.requestFullscreen)) {
          rootRef.current.requestFullscreen();
          // @ts-ignore
        } else if(_.isFunction(rootRef.current.webkitRequestFullScreen)) {
          // @ts-ignore
          rootRef.current.webkitRequestFullScreen();
          // @ts-ignore
        } else if(_.isFunction(rootRef.current.mozRequestFullScreen)) {
        // @ts-ignore
        rootRef.current.mozRequestFullScreen();
      }
    };
  }, [rootRef.current]);

  action.fullScreen = fullScreen.current;

  const intl = useIntl();

  const pagination =
    propsPagination !== false && mergePagination<T[], {}>(propsPagination, action, intl);

  const counter = Container.useContainer();

  const onCleanSelected = () => {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], []);
    }
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  useEffect(() => {
    // 数据源更新时 取消所有选中项
    // onCleanSelected();
    setDataSource(request ? (action.dataSource as T[]) : props.dataSource || []);
  }, [props.dataSource, action.dataSource]);

  /**
   *  保存一下 propsColumns
   *  生成 form 需要用
   */
  useDeepCompareEffect(() => {
    counter.setPowerColumns(propsColumns);
  }, [propsColumns]);

  counter.setAction(action);

  /**
   * 这里生成action的映射，保证 action 总是使用的最新
   * 只需要渲染一次即可
   * 同时确定销毁之前，能保存页面信息到session中
   */
  useEffect(() => {
    const userAction: ActionType = {
      reload: async (resetPageIndex?: boolean) => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        noteOnce(!!resetPageIndex, ' reload 的 resetPageIndex 将会失效，建议使用 reloadAndRest。');
        noteOnce(
          !!resetPageIndex,
          'reload resetPageIndex will remove and reloadAndRest is recommended.',
        );

        // 如果为 true，回到第一页
        if (resetPageIndex) {
          await current.resetPageIndex();
        }
        await current.reload();
      },
      reloadAndRest: async () => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        // reload 之后大概率会切换数据，清空一下选择。
        onCleanSelected();
        // 如果为 true，回到第一页
        await current.resetPageIndex();
        await current.reload();
      },
      fetchMore: async () => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        await current.fetchMore();
      },
      reset: () => {
        const {
          action: { current },
        } = counter;
        if (!current) {
          return;
        }
        current.reset();
      },
      clearSelected: () => onCleanSelected(),
    };
    if (actionRef && typeof actionRef === 'function') {
      actionRef(userAction);
    }
    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = userAction;
    }

    // const purePathName = (window.location.pathname || '').replace(/\//g, '');

    const paramInfo = getParams();
    const page = _.toInteger(_.get(paramInfo, 'page'));
    const pageSize = _.toInteger(_.get(paramInfo, 'pageSize'));
    if (paramInfo) {
      if (page > 0) {
        // 当页码需要恢复
        action.setPageInfo({
          page,
          pageSize,
        });
      }
    }
  }, []);

  /**
   * Table Column 变化的时候更新一下，这个参数将会用于渲染
   */
  useDeepCompareEffect(() => {
    const tableColumn = genColumnList<T>(propsColumns, counter.columnsMap, columnEmptyText);
    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn);
      // 重新生成key的字符串用于排序
      counter.setSortKeyColumns(
        tableColumn.map((item, index) => {
          const key =
            genColumnKey(item.key, (item as PowerColumnType).dataIndex, index) || `${index}`;
          return `${key}_${item.index}`;
        }),
      );
    }
  }, [propsColumns]);

  /**
   * 这里主要是为了排序，为了保证更新及时，每次都重新计算
   */
  useDeepCompareEffect(() => {
    const keys = counter.sortKeyColumns.join(',');
    let tableColumn = genColumnList<T>(propsColumns, counter.columnsMap, columnEmptyText);
    if (keys.length > 0) {
      // 用于可视化的排序
      tableColumn = tableColumn.sort((a, b) => {
        const { fixed: aFixed, index: aIndex } = a;
        const { fixed: bFixed, index: bIndex } = b;
        if (
          (aFixed === 'left' && bFixed !== 'left') ||
          (bFixed === 'right' && aFixed !== 'right')
        ) {
          return -2;
        }
        if (
          (bFixed === 'left' && aFixed !== 'left') ||
          (aFixed === 'right' && bFixed !== 'right')
        ) {
          return 2;
        }
        // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
        const aKey = `${genColumnKey(a.key, (a as PowerColumnType).dataIndex, aIndex)}_${aIndex}`;
        const bKey = `${genColumnKey(b.key, (b as PowerColumnType).dataIndex, bIndex)}_${bIndex}`;
        return keys.indexOf(aKey) - keys.indexOf(bKey);
      });
    }
    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn);
    }
  }, [counter.columnsMap, counter.sortKeyColumns.join('-')]);

  /**
   * 同步 Pagination，支持受控的 页码 和 pageSize
   */
  useDeepCompareEffect(() => {
    if (propsPagination && propsPagination.current && propsPagination.pageSize) {
      action.setPageInfo({
        pageSize: propsPagination.pageSize,
        page: propsPagination.current,
      });
    }
  }, [propsPagination]);

  useDeepCompareEffect(() => {
    const newColumns = counter.columns.filter((item) => {
      // 删掉不应该显示的
      const { key, dataIndex } = item;
      const columnKey = genColumnKey(key, dataIndex);
      if (!columnKey) {
        return true;
      }
      const config = counter.columnsMap[columnKey];
      return !(config && config.show === false);
    });
    setStateColumns(newColumns);
  }, [counter.columns]);

  // 映射 selectedRowKeys 与 selectedRow
  useEffect(() => {
    if (action.loading !== false || propsRowSelection === false) {
      return;
    }
    const tableKey = rest.rowKey;

    // dataSource maybe is a null
    // eg: api has 404 error
    const duplicateRemoveMap = new Map();
    if (Array.isArray(dataSource)) {
      // 根据当前选中和当前的所有数据计算选中的行
      // 因为防止翻页以后丢失，所有还增加了当前选择选中的
      const rows = [...dataSource, ...selectedRows].filter((item, index) => {
        let rowKey = tableKey;
        if (!tableKey) {
          return (selectedRowKeys as any).includes(index);
        }
        if (typeof tableKey === 'function') {
          rowKey = tableKey(item, index) as string;
        } else {
          rowKey = item[tableKey];
        }
        if (duplicateRemoveMap.has(rowKey)) {
          return false;
        }
        duplicateRemoveMap.set(rowKey, true);
        return (selectedRowKeys as any).includes(rowKey);
      });
      setSelectedRows(rows);
      return;
    }
    setSelectedRows([]);
  }, [selectedRowKeys.join('-'), action.loading, propsRowSelection === false]);

  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    ...propsRowSelection,
    onChange: (keys, rows) => {
      if (propsRowSelection && propsRowSelection.onChange) {
        propsRowSelection.onChange(keys, rows);
      }
      setSelectedRowKeys([...keys]);
    },
  };

  useEffect(() => {
    counter.setTableSize(rest.size || 'middle');
  }, [rest.size]);

  if (counter.columns.length < 1) {
    return (
      <Card bordered={false} bodyStyle={{ padding: 50 }}>
        <Empty />
      </Card>
    );
  }

  // @ts-ignore
  const handleResize = index => (e, { size }) => {
    const nextColumns = [...stateColumns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setStateColumns(nextColumns);
  };

  const className = classNames(defaultClassName, propsClassName);

  return (
    <ConfigProvider
      getPopupContainer={() => ((rootRef.current || document.body) as any) as HTMLElement}
    >
      <div className={className} id="ant-design-pro-table" style={style} ref={rootRef}>
        {(search || type === 'form') && (
          <FormSearch<U>
            {...rest}
            type={props.type}
            formRef={formRef}
            onSubmit={(value) => {
              if (type !== 'form') {
                setFormSearch(
                  beforeSearchSubmit({
                    ...value,
                    _timestamp: Date.now(),
                  }),
                );
                // back first page
                action.resetPageIndex();
              }

              if (props.onSubmit) {
                props.onSubmit(value);
              }
            }}
            onReset={() => {
              setFormSearch(beforeSearchSubmit({}));
              // back first page
              action.resetPageIndex();
              onReset();
            }}
            dateFormatter={rest.dateFormatter}
            search={search}
          />
        )}

        {type !== 'form' && (
          <Card
            bordered={false}
            style={{
              height: '100%',
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            {toolBarRender !== false && (options !== false || headerTitle || toolBarRender) && (
              // if options= false & headerTitle=== false, hide Toolbar
              <Toolbar<T>
                options={options}
                headerTitle={headerTitle}
                action={action}
                onSearch={(keyword) => {
                  if (options && options.search) {
                    const { name = 'keyword' } =
                      options.search === true
                        ? {
                            name: 'keyword',
                          }
                        : options.search;
                    setFormSearch({
                      [name]: keyword,
                      ...formSearch,
                    });
                  }
                }}
                selectedRows={selectedRows}
                selectedRowKeys={selectedRowKeys}
                toolBarRender={toolBarRender}
              />
            )}
            {propsRowSelection !== false && (
              <Alert<T>
                selectedRowKeys={selectedRowKeys}
                selectedRows={selectedRows}
                onCleanSelected={onCleanSelected}
                alertOptionRender={rest.tableAlertOptionRender}
                alertInfoRender={tableAlertRender}
              />
            )}
            <Table<T>
              {...rest}
              size={counter.tableSize}
              scroll={{ x: 'max-content' }}
              rowSelection={!propsRowSelection ? undefined : rowSelection}
              className={tableClassName}
              components={{
                ...components,
                header: {
                  cell: ResizableTitle,
                },
              }}
              style={tableStyle}
              // @ts-ignore
              columns={stateColumns.map((col, index) => ({
                ...col,
                onHeaderCell: column => ({
                  // @ts-ignore
                  width: column.width,
                  onResize: handleResize(index),
                }),
              }))}
              loading={action.loading || props.loading}
              dataSource={dataSource}
              pagination={pagination}
              onChange={(
                changePagination: TablePaginationConfig,
                filters: {
                  [string: string]: React.ReactText[] | null;
                },
                sorter: SorterResult<T> | SorterResult<T>[],
                extra: TableCurrentDataSource<T>,
              ) => {
                if (rest.onChange) {
                  rest.onChange(changePagination, filters, sorter, extra);
                }

                // 制造筛选的数据
                setProFilter(removeObjectNull(filters));

                // 制造一个排序的数据
                if (Array.isArray(sorter)) {
                  const data = sorter.reduce<{
                    [key: string]: any;
                  }>((pre, value) => {
                    if (!value.order) {
                      return pre;
                    }
                    return {
                      ...pre,
                      [`${value.field}`]: value.order,
                    };
                  }, {});
                  setProSort(data);
                } else if (sorter.order) {
                  setProSort({ [`${sorter.field}`]: sorter.order });
                }
              }}
            />
          </Card>
        )}
      </div>
    </ConfigProvider>
  );
};

/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
const ProviderWarp = <T, U extends { [key: string]: any } = {}>(props: PowerListProps<T, U>) => (
  <Container.Provider initialState={props}>
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => (
        <IntlConsumer>
          {(value) => (
            <IntlProvider value={value}>
              <ErrorBoundary>
                <PowerList defaultClassName={getPrefixCls('pro-table')} {...props} />
              </ErrorBoundary>
            </IntlProvider>
          )}
        </IntlConsumer>
      )}
    </ConfigConsumer>
  </Container.Provider>
);

export default ProviderWarp;
