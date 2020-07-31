import React, { useCallback, useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import _ from 'lodash';

interface SearchInputProps {
  // method 调用方法
  method?: string;
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
  customOptionFilter?: (data: any) => boolean;

  // onChange，暴露受控
  onChange?: (value: any) => void;
  // value，暴露受控用
  value?: any;
  // id暴露受控
  id?: any;
  // placeholder
  placeholder?: string;
  exclude?: any | any[];
}

function SearchInput(props: SearchInputProps) {
  const {
    method,
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
    const formData = {
      method: method || 'get',
    };
    // 除了get传params，其它都传data
    if (formData.method === 'get') {
      _.set(formData, 'params', searchData);
    } else {
      _.set(formData, 'data', searchData);
    }
    setLoading(true);
    // const { data } = await request(url || '', formData);
    const data: React.SetStateAction<never[]> = [];
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
      onChange={props.onChange}
      value={props.value}
      id={props.id}
      placeholder={placeholder}
    >
      {options}
    </Select>
  );
}

export default SearchInput;
