import { Line } from '@antv/g2plot';
import React, { useEffect, useState } from 'react';
import request from '@/lib/request';
import { Card } from 'antd';
import { MOCK_DATA } from './mock';

export default () => {
  const [line, setLine] = useState();

  useEffect(() => {
    request.get('/').then((data: any) => {
      const line = new Line('line-chart-container', {
        data: MOCK_DATA,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          tickCount: 5,
        },
        lineStyle: () => {
          return {
            // fill: '#FF8D9F',
          };
        },
      });
      setLine(line);
    });
  }, []);

  return (
    <Card title="Line Chart" className="statistics-card">
      <div id="line-chart-container" style={{ height: '100%' }}>
        {line && line.render()}
      </div>
    </Card>
  );
};
