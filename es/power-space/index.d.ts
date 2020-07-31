import * as React from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
export interface PowerSpaceProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: SizeType | number;
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    divider?: boolean;
    accessible?: boolean | {
        accessible: boolean;
        key: string;
    };
}
declare const PowerSpace: React.FC<PowerSpaceProps>;
export default PowerSpace;
