import { Result } from 'antd';
import React from 'react';

export default function Error503() {
  return (
    <Result
      status="500"
      title="服务器内部发生错误"
      style={{
        background: 'none',
      }}
      subTitle="请联系系统管理员及时处理"
    />
  );
}
