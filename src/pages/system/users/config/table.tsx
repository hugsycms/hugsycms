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
    title: window.t('system.users.username'),
    dataIndex: 'username',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: window.t('system.users.avatar'),
    dataIndex: 'avatar',
    key: 'avatar',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value) => {
      return <img style={{ borderRadius: '50%' }} src={value} alt="avatar" />;
    },
  },
  {
    title: window.t('system.users.nickname'),
    dataIndex: 'nickname',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: window.t('system.users.email'),
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: window.t('system.users.roles'),
    dataIndex: 'roleString',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: window.t('common.created-at'),
    dataIndex: 'createdAt',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value: string) => formatTimeToStandard(value),
  },
  {
    title: window.t('common.created-by'),
    dataIndex: 'createdBy',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
];
