import React from 'react';
import { Result, Button } from 'antd';

export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle="抱歉，内部发生错误，请刷新后重试"
    // extra={<Button type="primary">返回首页</Button>}
  />
);
