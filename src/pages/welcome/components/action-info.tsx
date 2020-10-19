import { Timeline, Card } from 'antd';
import React from 'react';
import moment from 'moment';
import { formatTimeToStandard } from '@/utils/format';

export default (props) => {
  return (
    <Card className="statistics-card" title="更新动态" extra={<a>查看更多</a>}>
      <Timeline>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(1, 'days'))} 小王登录系统</Timeline.Item>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(2, 'days'))} 小明添加了一条预约记录</Timeline.Item>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(3, 'days'))} 张三退出系统</Timeline.Item>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(4, 'days'))} 张三登录系统</Timeline.Item>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(5, 'days'))} 李四登录系统</Timeline.Item>
      </Timeline>
    </Card>
  );
};
