import React from 'react';
import { Tooltip } from 'antd';
import { APP_CONFIG } from '@/lib/config/constants';

export const tableColumns = [
  {
    title: 'Role code',
    dataIndex: 'code',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: 'Role name',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: 'Role description',
    dataIndex: 'description',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (text: string, record: any) => {
      return (
        <Tooltip placement="topLeft" title={text}>
          <span className="text-overflow" style={{ width: 185 }}>
            {text}
          </span>
        </Tooltip>
      );
    },
  },
];
