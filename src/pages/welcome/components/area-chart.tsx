import { Area } from '@antv/g2plot';
import React, { useEffect, useState } from 'react';
import request from '@/lib/request';
import { Card } from 'antd';
import { MOCK_DATA } from './mock';

export default () => {
  const [area, setArea] = useState();

  useEffect(() => {
    request.get('/').then((data: any) => {
      const area = new Area('area-chart-container', {
        data: MOCK_DATA,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          tickCount: 5,
        },
        areaStyle: () => {
          return {
            fill: '#FF8D9F',
          };
        },
      });
      setArea(area);
    });
  }, []);

  return (
    <Card title="Area Chart" className="statistics-card">
      <div id="area-chart-container" style={{ height: '100%' }}>
        {area && area.render()}
      </div>
    </Card>
  );
};
