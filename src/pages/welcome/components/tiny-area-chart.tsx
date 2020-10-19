import { TinyArea } from '@antv/g2plot';
import React, { useEffect, useState } from 'react';
import request from '@/lib/request';
import { Card } from 'antd';
import { MOCK_DATA } from './mock';
import { map, values } from 'lodash';

export default () => {
  const [tinyArea, setTinyArea] = useState();

  useEffect(() => {
    request.get('/').then((data: any) => {
      const tinyArea = new TinyArea('tiny-area-container', {
        data: map(MOCK_DATA, (item) => item.scales),
        autoFit: false,
      });
      setTinyArea(tinyArea);
    });
  }, []);

  return (
    <Card title="Tiny Area" className="statistics-card tiny-area">
      <div id="tiny-area-container" style={{ height: '100%' }}>
        {tinyArea && tinyArea.render()}
      </div>
    </Card>
  );
};
