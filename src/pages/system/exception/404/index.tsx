import React from 'react';
import { Result, Button } from 'antd';

export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle="抱歉，访问的页面不存在"
    // extra={<Button type="primary">返回首页</Button>}
  />
);
