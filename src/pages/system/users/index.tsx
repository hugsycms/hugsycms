import React from 'react';
import Table from './components/table';
import Query from './components/query';
import UsersModal from './components/users-modal';
import { tableColumns } from './config/table';
import { processFromApi, toApi } from './config/adapter';
import { Switch, message } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/base-list';
import request from '@/lib/request';
import { APP_CONFIG } from '@/lib/config/constants';

export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/users',
    baseTitle: window.t('system.users.title'),
    needPagination: true,
    needChecked: true,
    processFromApi,
    showAdd: true,
    showQuery: true,
    showModal: true,
    showAction: true,
    rowKey: 'id',
    tableColumns,
    Table,
    Query,
    ModalForm: UsersModal,
    otherTableProps: {
      scroll: { x: 1376 },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      defaultQuery: {
        page: 0,
        size: 50,
      },
    };
  }

  columns = [
    ...this.props.tableColumns,
    {
      title: window.t('system.users.activated'),
      dataIndex: 'activated',
      showSorter: false,
      showFilter: false,
      align: 'center',
      fixed: 'right',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      render: (value: any, rowData: any) => {
        return <Switch size="small" defaultChecked={value} onChange={this.handleDisableUser(rowData)} />;
      },
    },
    this.actionCol,
  ];

  handleDisableUser = (rowData: any) => async () => {
    const { baseUrl } = this.props;
    try {
      if (APP_CONFIG.isDev) {
        // TODO: change yourself
        message.error(window.t('common.preview-mode-tip'));
        return Promise.reject(window.t('common.preview-mode-tip'));
      }
      await request.put(
        baseUrl as string,
        toApi({
          ...rowData,
          roles: get(rowData, 'roles'),
          activated: !get(rowData, 'activated'),
        }),
      );
      message.success(window.t('common.action-success'));
    } catch (error) {
      console.log(error);
    }

    this.handleSearch();
  };
}
