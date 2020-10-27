import React from 'react';
import Table from './components/table';
import Query from './components/query';
import { tableColumns } from './config/table';
import BaseList from '@/components/base-list';

export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/articles',
    baseTitle: window.t('article.base-title'),
    needPagination: true,
    showQuery: true,
    showAdd: true,
    showAction: true,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1596 },
    },
  };

  handleAdd = () => {
    const { history } = this.props;
    history.push('/demo3/add');
  };

  handleEdit = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    history.push(`/demo3/edit?id=${id}`);
  };
}
