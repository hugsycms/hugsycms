import React from 'react';
import { APP_CONFIG } from '@/lib/config/constants';
import { formatTimeToStandard } from '@/utils/format';

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value) => {
      return <img src={value} alt="avatar" />;
    },
  },
  {
    title: 'Nickname',
    dataIndex: 'nickname',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Roles',
    dataIndex: 'roleString',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: 'Created at',
    dataIndex: 'createdDate',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value: string) => formatTimeToStandard(value),
  },
  {
    title: 'Created by',
    dataIndex: 'createdBy',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
];
