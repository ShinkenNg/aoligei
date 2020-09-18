import React, { useCallback, useEffect, useState } from 'react';
import { message, Select, Spin } from 'antd';
import _ from 'lodash';

export interface SearchInputProps {
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
  customOptionRender?: (data: any) => JSX.Element | null;
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
  onDeselect?: (value?: any) => void;
  mode?: 'multiple' | 'tags';
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
  } = props;

  const [optionData, setOptionData] = useState([]);

  const [keyword, setKeyword] = useState('');

  const [loading, setLoading] = useState(false);

  const requestSearch = useCallback(async () => {
    if (!_.isFunction(request)) {
      message.error('Not Request');
      return;
    }
    // 默认搜索name
    const key = searchKey || 'name';
    const searchData = { ...extraData } || {};
    if (!_.isEmpty(keyword)) {
      // 不为空设置搜索条件
      _.set(searchData, key, keyword);
    }
    // 设置了分页条件
    if (_.isNumber(pageSize) && pageSize > 0) {
      _.set(searchData, 'pageSize', _.toInteger(pageSize));
    }
    setLoading(true);
    const { data } = await request(searchData);
    // const data: React.SetStateAction<never[]> = [];
    setLoading(false);
    setOptionData(data);
  }, [keyword]);

  useEffect(() => {
    requestSearch();
  }, [keyword]);

  const handleSearch = (value: any) => {
    // 设置关键词，触发依赖此state的effect
    setKeyword(value);
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
          value={_.get(item, valuePath) || props.value}
        >
          {_.get(item, labelPath)}
        </Select.Option>
      );
    });
  };

  const renderOptions = customOptionRender || defaultRenderOptions;

  const options = renderOptions(optionData);

  return (
    <Select
      showSearch
      filterOption={false}
      defaultActiveFirstOption={false}
      notFoundContent={loading ? <Spin size="small" /> : null}
      loading={loading}
      onSearch={handleSearch}
      onChange={(value) => {
        if (_.isFunction(props.onChange)){
          const match = {};
          _.set(match, props.valueKey || 'id', value);
          const record = _.find(optionData, match);
          props.onChange(value, record);
        }
      }}
      value={props.value}
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
