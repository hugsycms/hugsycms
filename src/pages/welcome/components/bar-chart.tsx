import { Bar } from '@antv/g2plot';
import React, { useEffect, useState } from 'react';
import request from '@/lib/request';
import { Card } from 'antd';
import { MOCK_DATA } from './mock';

export default () => {
  const [bar, setBar] = useState();

  useEffect(() => {
    request.get('/').then((data: any) => {
      const bar = new Bar('bar-chart-container', {
        data: MOCK_DATA,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          tickCount: 5,
        },
        barStyle: () => {
          return {
            fill: '#FF8D9F',
          };
        },
      });
      setBar(bar);
    });
  }, []);

  return (
    <Card title="Bar Chart" className="statistics-card">
      <div id="bar-chart-container" style={{ height: '100%' }}>
        {bar && bar.render()}
      </div>
    </Card>
  );
};
