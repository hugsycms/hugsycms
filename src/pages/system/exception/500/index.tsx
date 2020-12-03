import React from 'react';
import { Result } from 'antd';

export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle={window.t('common.500-tip')}
  />
);
