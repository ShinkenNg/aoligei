import React, { useCallback, useEffect, useState } from 'react';
import { message, Select, Spin } from 'antd';
import _ from 'lodash';
import { SelectProps } from 'antd/es/select';

// 250毫秒延迟
const TIMEOUT_DELAY = 250;

export interface SearchInputProps extends SelectProps<any> {
  request?: (data: any) => Promise<any>;
  // 调用接口的额外参数 kv
  extraData?: {
    [key: string]: any;
  };
  // searchKey 搜索字段名
  searchKey?: string;
  // labelKey
  labelKey?: string;
  // valueKey
  valueKey?: string;
  // 分页大小
  pageSize?: number;
  // 渲染选择项
  customOptionRender?: (data: any) => JSX.Element | JSX.Element[] | null;
  // 过滤选择项
  customOptionFilter?: (data: any) => any;

  // onChange，暴露受控
  onChange?: (value: any, record?: any) => void;
  // value，暴露受控用
  value?: any;
  // id暴露受控
  id?: any;
  // placeholder
  placeholder?: string;
  exclude?: any | any[];
  // 必须包含的
  include?: any[];
  initLoad?: boolean | {
    initData?: {
      [key: string]: any;
    }
  };
  onDeselect?: (value?: any) => void;
  mode?: 'multiple' | 'tags';
  // 与exclude不同,此属性直接排除对应value值
  excludeValue?: any;
}

export function SearchInput(props: SearchInputProps) {
  const {
    request,
    searchKey,
    labelKey,
    valueKey,
    extraData,
    pageSize,
    customOptionRender,
    customOptionFilter,
    placeholder,
    exclude,
    include,
    onFocus,
    initLoad,
    excludeValue,
    ...rest
  } = props;

  let timer:any = null;

  const [optionData, setOptionData] = useState([]);

  const [keywordCache, setKeywordCache] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestSearch = useCallback(async (keyword: any, extra?: {[key: string]: any}) => {
    if (!_.isFunction(request)) {
      message.error('Search Input: Not Request');
      return;
    }
    // 默认搜索name
    const key = searchKey || 'name';
    const searchData = { ...extraData, ...extra } || {};
    if (!_.isEmpty(keyword)) {
      // 不为空设置搜索条件
      _.set(searchData, key, keyword);
    }
    // 设置了分页条件
    if (_.isNumber(pageSize) && pageSize > 0) {
      _.set(searchData, 'pageSize', _.toInteger(pageSize));
    }
    setLoading(true);
    try {
      const { data } = await request(searchData);
      setOptionData(data);
      setKeywordCache(keyword);
    } finally {
      setLoading(false);
    }
    // const data: React.SetStateAction<never[]> = [];
  }, []);

  useEffect(() => {
    // 需要初始化加载
    if (initLoad) {
      requestSearch('', _.get(initLoad, 'initData', {}));
    }
  }, []);

  const handleSearch = (value: any) => {
    clearTimeout(timer);
    // 设置关键词，延时触发依赖此state的effect
    timer = setTimeout(() => {
      if (value !== keywordCache) {
        requestSearch(value);
      }
    }, TIMEOUT_DELAY);
  };

  const defaultRenderOptions = (originData: any) => {
    let data = originData;
    // 需要过滤数据
    if (_.isFunction(customOptionFilter)) {
      data = customOptionFilter(originData);
    }
    // 需要排除值
    if (exclude) {
      if (_.isArray(exclude)) {
        data = _.pickBy(data, (n) => {
          return !_.includes(exclude, _.get(n, _.toString(valueKey)));
        });
      } else {
        data = _.pickBy(data, (n) => {
          return _.get(n, _.toString(valueKey)) !== exclude;
        });
      }
    }
    const valuePath = valueKey || 'id';
    const labelPath = labelKey || searchKey || 'name';
    return _.map(data, (item) => {
      return (
        <Select.Option
          key={`${_.get(props, 'id')}_${_.get(item, valuePath)}`}
          value={_.toString(_.get(item, valuePath) || props.value)}
        >
          {_.get(item, labelPath)}
        </Select.Option>
      );
    });
  };

  const renderOptions = customOptionRender || defaultRenderOptions;

  let newOptionData:any = _.cloneDeep(optionData);
  if (_.isArray(include)) {
    newOptionData = _.uniqBy(_.concat(optionData, include), valueKey || 'id');
  }

  const options = renderOptions(newOptionData);

  return (
    <Select
      {...rest}
      showSearch
      filterOption={false}
      defaultActiveFirstOption={false}
      notFoundContent={loading ? <Spin size="small" /> : null}
      loading={loading}
      onSearch={handleSearch}
      onFocus={(e) => {
        if (_.isFunction(onFocus)) {
          onFocus(e);
        }
        // 传入空字符串进行搜索
        handleSearch('');
      }}
      onChange={(value) => {
        if (_.isFunction(props.onChange)){
          if (_.isArray(value)) {
            // 对数组的特殊处理
            const records: any[] = [];
            _.forEach(value, (item) => {
              const recordTmp = _.find(newOptionData, (data) => {
                return _.toString(_.get(data, props.valueKey || 'id')) === _.toString(item);
              });
              records.push(recordTmp);
            });
            props.onChange(value, records);
          } else {
            const record = _.find(newOptionData, (data) => {
              return _.toString(_.get(data, props.valueKey || 'id')) === _.toString(value);
            });
            props.onChange(value, record);
          }
        }
      }}
      value={props.mode === 'multiple' ? _.map(_.toArray(props.value), item => _.toString(item)) : _.toString(props.value)}
      id={props.id}
      onDeselect={props.onDeselect}
      placeholder={placeholder}
      mode={props.mode}
    >
      {options}
    </Select>
  );
}

export default SearchInput;
