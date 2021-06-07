import _ from 'lodash';

export function getParams() {
  const url = window.location.href;
  const params = {};

  const index = url.indexOf("?");

  if (index !== -1) {

    const str = url.substr(index + 1);
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

  // 以查询?号分隔url
  const splitHref = _.split(window.location.href, '?');

  if (paramCount > 0) {
    let urlPush = `${_.get(splitHref, '0', '')}?`;
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
    let urlPush = `${_.get(splitHref, '0', '')}?`;
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
