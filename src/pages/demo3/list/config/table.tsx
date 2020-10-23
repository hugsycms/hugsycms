import { formatTimeToStandard } from '@/utils/format';
import { APP_CONFIG } from '@/lib/config/constants';

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: 'Content',
    dataIndex: 'content',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    sortType: 'number',
    showSorter: true,
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value: string) => formatTimeToStandard(value),
  },
  {
    title: 'Created by',
    dataIndex: 'createdBy',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
];
