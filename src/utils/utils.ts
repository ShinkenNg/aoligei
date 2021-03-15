import _ from 'lodash';

export function getParams() {
  const url = window.location.search;
  const params = {};

  if (url.indexOf("?") !== -1) {
    const str = url.substr(1);
    const strs = str.split("&");
    for (let i = 0; i < strs.length; i += 1) {
      params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return params;
}

export function addUrlParams(params: any, clear: boolean = false) {
  const oldParams = getParams();
  const paramCount = _.get(_.entries(oldParams), 'length', 0);
  if (paramCount > 0) {
    let urlPush = `${window.location.origin + window.location.pathname}?`;
    let newParams = {};
    if (clear) {
      newParams = params;
    } else {
      newParams = {...oldParams, ...params};
    }
    _.forEach(_.entries(newParams), (item) => {
      const [name, val] = item;
      if (val) {
        urlPush += `${name}=${escape(_.toString(val))}&`;
      }
    });
    urlPush = urlPush.substring(0, urlPush.length - 1);
    // @ts-ignore
    window.history.pushState(null, null, urlPush);
  } else {
    // 无需更新
    let urlPush = `${window.location.origin + window.location.pathname}?`;
    _.forEach(_.entries(params), (item) => {
      const [name, val] = item;
      if (val) {
        urlPush += `${name}=${escape(_.toString(val))}&`;
      }
    });
    urlPush = urlPush.substring(0, urlPush.length - 1);
    // @ts-ignore
    window.history.pushState(null, null, urlPush);
  }
}
