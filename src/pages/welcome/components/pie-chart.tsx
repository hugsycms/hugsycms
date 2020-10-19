import { Pie } from '@antv/g2plot';
import React, { useEffect, useState } from 'react';
import request from '@/lib/request';
import { Card } from 'antd';
import { MOCK_DATA2 } from './mock';

export default () => {
  const [pie, setPie] = useState();

  useEffect(() => {
    request.get('/').then((data: any) => {
      const pie = new Pie('pie-chart-container', {
        appendPadding: 10,
        radius: 0.8,
        innerRadius: 0.6,
        data: MOCK_DATA2,
        colorField: 'Date',
        angleField: 'scales',
        statistic: {
          title: false,
          content: {
            formatter: () => '高危产妇\n123,224',
          },
        },
        pieStyle: {
          lineWidth: 15,
        },
      });
      setPie(pie);
    });
  }, []);

  return (
    <Card title="Pie Chart" className="statistics-card pie-chart">
      <div id="pie-chart-container" style={{ height: '100%' }}>
        {pie && pie.render()}
      </div>
    </Card>
  );
};
