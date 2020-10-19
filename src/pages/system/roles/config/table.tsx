import React from 'react';
import { Tooltip } from 'antd';

export const tableColumns = [
  {
    title: '角色代码',
    dataIndex: 'name',
  },
  {
    title: '角色名称',
    dataIndex: 'nickname',
  },
  {
    title: '角色描述',
    dataIndex: 'groupdesc',
    width: 200,
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
export const menuColumns = [
  {
    title: '菜单/权限名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
];
