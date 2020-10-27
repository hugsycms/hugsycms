import { APP_CONFIG } from '@/lib/config/constants';

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: window.t('system.roles.code'),
    dataIndex: 'code',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: window.t('system.roles.name'),
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: window.t('system.roles.description'),
    dataIndex: 'description',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
];
