import React from 'react';
import { Result } from 'antd';

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={window.t('common.403-tip')}
  />
);
