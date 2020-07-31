// eslint-disable-next-line import/no-extraneous-dependencies
import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import { ColumnType } from 'antd/es/table';
import useMergeValue from 'use-merge-value';

import { RequestData, PowerColumns } from './index';
import { UseFetchDataAction } from './use-fetch-data';
import { DensitySize } from './component/tool-bar/density-icon';
import { ColumnsState } from './table';

export interface UseCounterProps {
  columnsStateMap?: {
    [key: string]: ColumnsState;
  };
  onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;
  size?: DensitySize;
  onSizeChange?: (size: DensitySize) => void;
}

function useCounter(props: UseCounterProps = {}) {
  const actionRef = useRef<UseFetchDataAction<RequestData<any>>>();
  const [columns, setColumns] = useState<ColumnType<any>[]>([]);
  // 用于排序的数组
  const [sortKeyColumns, setSortKeyColumns] = useState<(string | number)[]>([]);
  const [powerColumns, setPowerColumns] = useState<PowerColumns<any>[]>([]);

  const [tableSize, setTableSize] = useMergeValue<DensitySize>(props.size || 'middle', {
    value: props.size,
    onChange: props.onSizeChange,
  });

  const [columnsMap, setColumnsMap] = useMergeValue<{
    [key: string]: ColumnsState;
  }>(props.columnsStateMap || {}, {
    value: props.columnsStateMap,
    onChange: props.onColumnsStateChange,
  });
  return {
    action: actionRef,
    setAction: (newAction: UseFetchDataAction<RequestData<any>>) => {
      actionRef.current = newAction;
    },
    sortKeyColumns,
    setSortKeyColumns,
    columns,
    setColumns,
    columnsMap,
    setTableSize,
    tableSize,
    setColumnsMap,
    powerColumns,
    setPowerColumns,
  };
}

const Counter = createContainer<ReturnType<typeof useCounter>, UseCounterProps>(useCounter);

export default Counter;
