import React, {useState} from 'react';
import {Button, Select, message} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import _ from 'lodash';

// import {useDeepCompareEffect} from '../power-list/component/util';
import './index.less';

export interface SkuItem {
  id: number;
  name: string;
  children: Array<SkuChildItem>;
}

export interface SkuChildItem extends Omit<SkuItem, 'children'>{
  parent_id: number;
}

export interface SKUProps<T> {
  // 顶级的sku列表
  dataSource?: Array<SkuItem>,
  // 受控
  value?: any,
  onChange?: (value: Array<any>) => void;
}

export function SKU<T>(props: SKUProps<T>) {
  const [skuList, setSkuList] = useState(props.value);
  const {dataSource, onChange} = props;

  // useDeepCompareEffect(() => {
  //   setSkuList(props.value || []);
  // }, [props.value]);

  const valueChange = (value: Array<SkuItem>) => {
    if (_.isFunction(onChange)) {
      onChange(value);
    }
  }

  // 添加一个分类
  const addCategory = () => {
    const skuMaxLen = _.get(dataSource, 'length', 0);
    const newSkuList = _.cloneDeep(skuList) || [];
    if (newSkuList.length >= skuMaxLen) {
      message.error('已达所有分类最大数量!!');
      return;
    }
    newSkuList.push({
      id: 0,
      name: '',
      children: []
    });
    setSkuList(newSkuList);
    valueChange(newSkuList);
  }

  // 移除一个分类
  const deleteCategory = (id: number) => {
    const newSkuList = _.cloneDeep(skuList) || [];
    const index = _.findIndex(skuList, {id});
    _.pullAt(newSkuList, index);
    setSkuList(newSkuList);
    valueChange(newSkuList);
  }

  // 选择分类时
  const onSelectCategory = (item: SkuItem | undefined, index: number) => {
    if (!item) {
      message.error('选择了非法规格!!');
      return;
    }
    const newSkuList = _.cloneDeep(skuList) || [];

    _.set(newSkuList, index, {
      id: item.id,
      name: item.name,
      children: [],
    });
    setSkuList(newSkuList);
    valueChange(newSkuList);
  }

  // 新建一个SKU
  const addSku = (categoryId: number) => {
    const newSkuList = _.cloneDeep(skuList) || [];
    const index = _.findIndex(skuList, {id: categoryId});
    const dataItem = _.find(dataSource, { id: categoryId });
    const newSkuItems = _.get(newSkuList, `${index}.children`) || [];
    if (_.get(dataItem, 'children.length') <= _.get(newSkuItems, `length`)) {
      message.error('已添加最大规格数量!!');
      return;
    }
    newSkuItems.push({
      id: 0,
      parent_id: categoryId,
      name: '',
    });
    _.set(newSkuList, `${index}.children`, newSkuItems);
    setSkuList(newSkuList);
    valueChange(newSkuList);
  }

  // 移除一个sku
  const deleteSku = (index: number, parentId: number) => {
    const newSkuList = _.cloneDeep(skuList) || [];
    const parentIndex = _.findIndex(skuList, {id: parentId});
    const newSkuItems = _.get(newSkuList, `${parentIndex}.children`) || [];
    _.pullAt(newSkuItems, index);
    _.set(newSkuList, `${parentIndex}.children`, newSkuItems);
    setSkuList(newSkuList);
    valueChange(newSkuList);
  }

  const onSelectSku = (item: SkuChildItem | undefined, index: number, parentId: number) => {
    if (!item) {
      message.error('选择了非法规格!!');
      return;
    }
    const newSkuList = _.cloneDeep(skuList) || [];
    const parentIndex = _.findIndex(skuList, {id: parentId});
    _.set(newSkuList, `[${parentIndex}].children.[${index}]`, {id: item.id, parent_id: item.parent_id, name: item.name});
    setSkuList(newSkuList);
    valueChange(newSkuList);
  }

  return (
    <div className="powerSkuWrap">
      <div className="addWrap">
        {
          _.map(skuList, (item, index) => {
            const dataItem = _.find(dataSource, { id: item.id });
            return (
              <div key={`category_item_${index}`} className="skuItemWrap">
                <Select
                  placeholder="请选择商品规格"
                  size="small"
                  className="selectWrap"
                  onChange={(id) => {
                    const valueItem = dataSource?.find((n) => {
                      return n.id === id;
                    });
                    onSelectCategory(valueItem, _.toInteger(index));
                  }}
                  value={_.get(skuList, `[${index}].id`) ? _.get(skuList, `[${index}].id`) : null}
                >
                  {
                    _.map(dataSource, (category) => {
                      return (
                        <Select.Option
                          value={category.id}
                          key={`category_${category.id}`}
                          disabled={_.findIndex(skuList, {id: category.id}) > -1}
                        >
                          {category.name}
                        </Select.Option>
                      );
                    })
                  }
                </Select>
                <Button type="primary" size="small" className="red-btn" onClick={() => {
                  deleteCategory(item.id);
                }}>删除</Button>
                {item.id > 0 && (
                  <div className="selectSkuWrap">
                    <div className="childrenWrap">
                      {
                        _.map(item.children, (skuItem, childIndex) => {
                          const dataItem = dataSource?.find((n) => {
                            return n.id === skuItem.parent_id;
                          });
                          const value = _.get(skuList, `${index}.children.${childIndex}.id`);
                          return (
                            <div className="childrenItem" key={`sku_item_${index}_${childIndex}_${skuItem.parent_id}_${skuItem.id}`}>
                              <DeleteOutlined className="deleteItemIcon" onClick={() => {
                                deleteSku(_.toInteger(childIndex), skuItem.parent_id);
                              }} />
                              <Select
                                placeholder="请选择规格"
                                size="small"
                                onChange={(id) => {
                                  const childItem = _.find(_.get(dataItem, 'children'), (n) => {
                                    return n.id === id;
                                  });
                                  onSelectSku(childItem, _.toInteger(childIndex), skuItem.parent_id);
                                }}
                                value={value > 0 ? value : null}
                              >
                                {
                                  _.map(_.get(dataItem, 'children'), (sku) => {
                                    return (
                                      <Select.Option
                                        value={sku.id}
                                        key={`sku_${sku.id}`}
                                        disabled={_.findIndex(item.children, {id: sku.id}) > -1}
                                      >
                                        <span className="skuName">{sku.name}</span>
                                      </Select.Option>
                                    );
                                  })
                                }
                              </Select>
                            </div>
                          );
                        })
                      }
                    </div>
                    {
                      !dataItem || _.get(item, 'children.length') < _.get(dataItem, `children.length`) && (
                        <Button className="addSkuBtn" size="small" onClick={() => {
                          addSku(item.id);
                        }}>
                          添加
                        </Button>
                      )
                    }
                  </div>
                )}
              </div>
            )
          })
        }
        {
          dataSource && _.get(skuList, 'length') < _.get(dataSource, 'length') && (
            <Button type="primary" size="small" onClick={addCategory}>添加商品规格</Button>
          )
        }

      </div>
    </div>
  );
}

export default SKU;
