import React from 'react';
import Query from './components/query';
import ModalForm from './components/modal';
import { tableColumns } from './config/table';
import BaseList from '@/components/BaseList';

export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/categories',
    baseTitle: 'category',
    needPagination: true,
    showAdd: true,
    showQuery: true,
    showAction: true,
    rowKey: 'id',
    tableColumns,
    Query,
    ModalForm,
    otherTableProps: { scroll: { x: 1 } },
  };
}
