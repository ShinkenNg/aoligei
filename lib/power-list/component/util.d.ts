import React, { ReactText, DependencyList } from 'react';
import { ValueEnumMap, ValueEnumObj } from '../../columns';
/**
 * 转化 text 和 valueEnum
 * 通过 type 来添加 ProjectStatusBadge
 * @param text
 * @param valueEnum
 * @param prue 纯净模式，不增加 status
 */
export declare const parsingText: (text: string | number, valueEnum?: ValueEnumMap | undefined, pure?: boolean | undefined) => {} | null | undefined;
/**
 * 把 value 的枚举转化为数组
 * @param valueEnum
 */
export declare const parsingValueEnumToArray: (valueEnum?: ValueEnumMap | undefined) => {
    value: string | number;
    text: string;
}[];
/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */
export declare const checkUndefinedOrNull: (value: any) => boolean;
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: Object): void;
export declare function getProgressStatus(text: number): 'success' | 'exception' | 'normal' | 'active';
/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export declare const genColumnKey: (key?: React.ReactText | undefined, dataIndex?: string | number | (string | number)[] | undefined, index?: number | undefined) => string | number;
export default function get(entity: any, path: ReactText | ReactText[]): any;
export declare const usePrevious: <T, U = T>(state: T) => T | undefined;
export interface ReturnValue<T extends any[]> {
    run: (...args: T) => void;
    cancel: () => void;
}
export declare function useDebounceFn<T extends any[]>(fn: (...args: T) => any, deps: DependencyList | number, wait?: number): ReturnValue<T>;
export declare const getLang: () => string;
/**
 * 删除对象中所有的空值
 * @param obj
 */
export declare const removeObjectNull: (obj: {
    [key: string]: any;
}) => {};
export declare const ObjToMap: (value: ValueEnumObj | ValueEnumMap | undefined) => ValueEnumMap | undefined;
/**
 * 减少 width，支持 string 和 number
 */
export declare const reduceWidth: (width?: string | number | undefined) => string | number | undefined;