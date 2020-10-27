import { APP_CONFIG } from '@/lib/config/constants';
import { formatTimeToStandard } from '@/utils/format';

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: window.t('tag.name'),
    dataIndex: 'name',
    editable: true,
  },
  {
    title: window.t('common.sort'),
    dataIndex: 'sort',
    editable: true,
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
