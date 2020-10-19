import React from 'react';
import { Tooltip } from 'antd';
import { APP_CONFIG } from '@/lib/config/constants';

export const tableColumns = [
  {
    title: '角色代码',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '角色名称',
    dataIndex: 'nickname',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '角色描述',
    dataIndex: 'groupdesc',
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
