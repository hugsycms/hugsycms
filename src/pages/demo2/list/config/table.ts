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
    title: 'Tag name',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'Sort',
    dataIndex: 'sort',
    editable: true,
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
