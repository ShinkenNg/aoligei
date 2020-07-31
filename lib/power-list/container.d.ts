/// <reference types="react" />
import { ColumnType } from 'antd/es/table';
import { RequestData, PowerColumns } from './index';
import { UseFetchDataAction } from './use-fetch-data';
import { DensitySize } from './component/tool-bar/density-icon';
import { ColumnsState } from './table';
export interface UseCounterProps {
    columnsStateMap?: {
        [key: string]: ColumnsState;
    };
    onColumnsStateChange?: (map: {
        [key: string]: ColumnsState;
    }) => void;
    size?: DensitySize;
    onSizeChange?: (size: DensitySize) => void;
}
declare const Counter: import("unstated-next").Container<{
    action: import("react").MutableRefObject<UseFetchDataAction<RequestData<any>> | undefined>;
    setAction: (newAction: UseFetchDataAction<RequestData<any>>) => void;
    sortKeyColumns: (string | number)[];
    setSortKeyColumns: import("react").Dispatch<import("react").SetStateAction<(string | number)[]>>;
    columns: ColumnType<any>[];
    setColumns: import("react").Dispatch<import("react").SetStateAction<ColumnType<any>[]>>;
    columnsMap: {
        [key: string]: ColumnsState;
    };
    setTableSize: (value: DensitySize) => void;
    tableSize: DensitySize;
    setColumnsMap: (value: {
        [key: string]: ColumnsState;
    }) => void;
    powerColumns: PowerColumns<any>[];
    setPowerColumns: import("react").Dispatch<import("react").SetStateAction<PowerColumns<any>[]>>;
}, UseCounterProps>;
export default Counter;
