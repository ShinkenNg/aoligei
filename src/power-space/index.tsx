import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import toArray from 'rc-util/lib/Children/toArray';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ConfigConsumerProps, ConfigContext } from 'antd/es/config-provider';
import { Divider } from 'antd';

export interface PowerSpaceProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | number;
  direction?: 'horizontal' | 'vertical';
  // No `stretch` since many components do not support that.
  align?: 'start' | 'end' | 'center' | 'baseline';
  divider?: boolean;
  accessible?: boolean | { accessible: boolean; key: string };
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const PowerSpace: React.FC<PowerSpaceProps> = (props) => {
  const { getPrefixCls, space, direction: directionConfig }: ConfigConsumerProps = React.useContext(
    ConfigContext,
  );

  const {
    size = space?.size || 'small',
    align,
    className,
    children,
    direction = 'horizontal',
    prefixCls: customizePrefixCls,
    divider = false,
    accessible = false,
    ...otherProps
  } = props;

  let items = toArray(children);
  if (accessible || _.get(accessible, 'accessible')) {
    items = items.filter((n) => {
      const key = _.get(accessible, 'key', 'accessible');
      const value = _.get(n, `props.${key}`);
      if (value === undefined) {
        // 未定义的可能未被授权组件包裹
        return true;
      }
      return value;
    });
  }

  const len = items.length;

  if (len === 0) {
    return null;
  }

  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  const prefixCls = getPrefixCls('space', customizePrefixCls);
  const cn = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );

  const itemClassName = `${prefixCls}-item`;

  const marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

  const end = len - 1;

  return (
    <div className={cn} {...otherProps}>
      {items.map((child, i) => {
        return (
          <div
            className={itemClassName}
            // eslint-disable-next-line react/no-array-index-key
            key={`${itemClassName}-${i}`}
            style={
              i === end || divider
                ? {}
                : {
                    [direction === 'vertical' ? 'marginBottom' : marginDirection]:
                      typeof size === 'string' ? spaceSize[size] : size,
                  }
            }
          >
            {child}
            {i !== end && divider && (
              <Divider type={direction === 'vertical' ? 'horizontal' : 'vertical'} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PowerSpace;
