import React from 'react';
import { Result, Button } from 'antd';

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="抱歉，没有权限访问该页面"
    // extra={<Button type="primary">返回首页</Button>}
  />
);
