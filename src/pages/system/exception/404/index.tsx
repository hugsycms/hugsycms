import React from 'react';
import { Result } from 'antd';

export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle={window.t('common.404-tip')}
  />
);
