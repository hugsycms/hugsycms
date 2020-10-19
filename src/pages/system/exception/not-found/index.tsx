import React from 'react';
import { Result } from 'antd';

export default (props: any) => (
  <Result
    status="404"
    style={{
      background: 'none',
    }}
    subTitle={props.subTitle || '抱歉，访问的数据不存在'}
    title={props.title || '404'}
  />
);
