import React from 'react';
export interface IntlType {
    locale: string;
    getMessage: (id: string, defaultMessage: string) => string;
    formatMessage: (id: string, valueMap: {
        [key: string]: any;
    }, defaultMessage: string) => string;
}
/**
 * 创建一个操作函数
 * @param locale
 * @param localeMap
 */
declare const createIntl: (locale: string, localeMap: {
    [key: string]: any;
}) => IntlType;
declare const zhCNIntl: IntlType;
declare const enUSIntl: IntlType;
declare const viVNIntl: IntlType;
declare const itITIntl: IntlType;
declare const jaJPIntl: IntlType;
declare const esESIntl: IntlType;
declare const ruRUIntl: IntlType;
declare const msMYIntl: IntlType;
declare const zhTWIntl: IntlType;
export { enUSIntl, zhCNIntl, viVNIntl, itITIntl, jaJPIntl, esESIntl, ruRUIntl, msMYIntl, zhTWIntl };
declare const IntlContext: React.Context<IntlType>;
declare const IntlConsumer: React.Consumer<IntlType>, IntlProvider: React.Provider<IntlType>;
export { IntlConsumer, IntlProvider, createIntl };
export declare function useIntl(): IntlType;
export default IntlContext;