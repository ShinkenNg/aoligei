import React, { useContext } from 'react';
import zhCN from '../locale/zh_CN';
import enUS from '../locale/en_US';
import viVN from '../locale/vi_VN';
import itIT from '../locale/it_IT';
import jaJP from '../locale/ja_JP';
import esES from '../locale/es_ES';
import ruRU from '../locale/ru_RU';
import msMY from '../locale/ms_MY';
import zhTW from '../locale/zh_TW';
import { getLang } from '../power-list/component/util';

export interface IntlType {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
  formatMessage: (id: string, valueMap: {[key: string]: any}, defaultMessage: string) => string;
}

function get(source: object, path: string, defaultValue?: string): string | undefined {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  let message = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const p of paths) {
    message = Object(result)[p];
    result = Object(result)[p];
    if (message === undefined) {
      return defaultValue;
    }
  }
  return message;
}

/**
 * 创建一个操作函数
 * @param locale
 * @param localeMap
 */
const createIntl = (locale: string, localeMap: { [key: string]: any }): IntlType => ({
  getMessage: (id: string, defaultMessage: string) =>
    get(localeMap, id, defaultMessage) || defaultMessage,
  locale,
  formatMessage: (id: string, valueMap: {[key: string]: any}, defaultMessage: string) => {
    // 实现简单的可插入值的格式化语法
    const intlMsg = get(localeMap, id);
    const keys = Object.keys(valueMap);
    if (intlMsg && intlMsg.length > 0 && valueMap && Object.keys(valueMap).length > 0) {
      // 尝试进行变量变换
      let msg = intlMsg;
      keys.forEach(keyName => {
        const value = valueMap[keyName];
        const keyReg = new RegExp(`{${keyName}}`, 'g');
        msg = intlMsg.replace(keyReg, value);
      });
      return msg;
    }
    return defaultMessage;
  }
});

const zhCNIntl = createIntl('zh_CN', zhCN);
const enUSIntl = createIntl('en_US', enUS);
const viVNIntl = createIntl('vi_VN', viVN);
const itITIntl = createIntl('it_IT', itIT);
const jaJPIntl = createIntl('ja_JP', jaJP);
const esESIntl = createIntl('es_ES', esES);
const ruRUIntl = createIntl('ru_RU', ruRU);
const msMYIntl = createIntl('ms_MY', msMY);
const zhTWIntl = createIntl('zh_TW', zhTW);

const intlMap = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'js-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ru-RU': ruRUIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl,
};

export { enUSIntl, zhCNIntl, viVNIntl, itITIntl, jaJPIntl, esESIntl, ruRUIntl, msMYIntl, zhTWIntl };

const IntlContext = React.createContext<IntlType>(intlMap[getLang() || ''] || zhCNIntl);

const { Consumer: IntlConsumer, Provider: IntlProvider } = IntlContext;

export { IntlConsumer, IntlProvider, createIntl };

export function useIntl(): IntlType {
  const intl = useContext(IntlContext);
  return intl;
}

export default IntlContext;
