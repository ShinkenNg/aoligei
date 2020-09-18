import React, { useEffect, useState } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import _ from 'lodash';
import { useIntl } from '../../../intl-context';

const FullScreenIcon = () => {
  const intl = useIntl();
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  useEffect(() => {
    if (_.isFunction(document.onfullscreenchange)) {
      document.onfullscreenchange = () => {
        setFullscreen(!!document.fullscreenElement);
      };
      // @ts-ignore
    } else if (_.isFunction(document.onwebkitfullscreenchange)) {
      // @ts-ignore
      document.onwebkitfullscreenchange = () => {
        // @ts-ignore
        setFullscreen(!!document.webkitFullscreenElement);
      };
      // @ts-ignore
    } else if (_.isFunction(document.onmozfullscreenchange)) {
      // @ts-ignore
      document.onmozfullscreenchange = () => {
        // @ts-ignore
        setFullscreen(!!document.mozFullScreenElement);
      };
    }
  }, []);
  return fullscreen ? (
    <Tooltip title={intl.getMessage('tableToolBar.exitFullScreen', '全屏')}>
      <FullscreenExitOutlined />
    </Tooltip>
  ) : (
    <Tooltip title={intl.getMessage('tableToolBar.fullScreen', '全屏')}>
      <FullscreenOutlined />
    </Tooltip>
  );
};

export default FullScreenIcon;
