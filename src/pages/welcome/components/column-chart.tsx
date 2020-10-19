import { Column } from '@antv/g2plot';
import React, { useEffect, useState } from 'react';
import request from '@/lib/request';
import { Card } from 'antd';
import { MOCK_DATA } from './mock';

export default () => {
  const [column, setColumn] = useState();

  useEffect(() => {
    request.get('/').then((data: any) => {
      const column = new Column('column-chart-container', {
        data: MOCK_DATA,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          tickCount: 5,
        },
        columnStyle: () => {
          return {
            fill: '#FF8D9F',
          };
        },
      });
      setColumn(column);
    });
  }, []);

  return (
    <Card title="Column Chart" className="statistics-card">
      <div id="column-chart-container" style={{ height: '100%' }}>
        {column && column.render()}
      </div>
    </Card>
  );
};
