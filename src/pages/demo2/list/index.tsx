import Query from './components/query';
import { tableColumns } from './config/table';
import BaseList from '@/components/BaseList';

export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/tags',
    baseTitle: 'tags',
    needPagination: true,
    needEditInTable: true,
    showAction: true,
    showAdd: true,
    showQuery: true,
    rowKey: 'id',
    tableColumns,
    Query,
    otherTableProps: { scroll: { x: 1 } },
  };
}
