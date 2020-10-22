import { Timeline, Card } from 'antd';
import React from 'react';
import moment from 'moment';
import { formatTimeToStandard } from '@/utils/format';

export default (props) => {
  return (
    <Card className="statistics-card" title="Info" extra={<a>More +</a>}>
      <Timeline>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(1, 'days'))} admin login system</Timeline.Item>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(2, 'days'))} admin logout system</Timeline.Item>
        <Timeline.Item>
          {formatTimeToStandard(moment().subtract(3, 'days'))} admin create user named 'demo01'
        </Timeline.Item>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(4, 'days'))} demo01 login system</Timeline.Item>
        <Timeline.Item>{formatTimeToStandard(moment().subtract(5, 'days'))} demo02 login system</Timeline.Item>
      </Timeline>
    </Card>
  );
};
