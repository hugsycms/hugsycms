import { formatTimeToStandard } from '@/utils/format';
import { APP_CONFIG } from '@/lib/config/constants';

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: window.t('article.title'),
    dataIndex: 'title',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: window.t('article.description'),
    dataIndex: 'description',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: window.t('article.content'),
    dataIndex: 'content',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_LARGE,
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
