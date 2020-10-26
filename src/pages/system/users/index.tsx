import React from 'react';
import Table from './components/table';
import Query from './components/query';
import UsersModal from './components/users-modal';
import { tableColumns } from './config/table';
import { processFromApi, toApi } from './config/adapter';
import { Popconfirm, Switch, Button, message, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, RedoOutlined } from '@/components/general-components/custom-icon';
import { get } from 'lodash';
import BaseList from '@/components/base-list';
import request from '@/lib/request';
import ResetPasswordModal from './components/reset-password-modal';

export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/users',
    baseTitle: 'user',
    needPagination: true,
    needChecked: true,
    processFromApi,
    showAdd: true,
    showQuery: true,
    rowKey: 'id',
    tableColumns,
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1376 },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      primaryKey: undefined,
      defaultQuery: {
        page: 0,
        size: 50,
      },
      resetEditable: false,
      resetVisible: false,
    };
  }

  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: 'Activated',
      dataIndex: 'activated',
      showSorter: false,
      showFilter: false,
      key: 'activated',
      align: 'center',
      width: 75,
      render: (value: any, rowData: any) => {
        return <Switch size="small" defaultChecked={value} onChange={this.handleDisableUser(rowData)} />;
      },
    },
    {
      title: 'Actions',
      align: 'center',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 256,
      render: (value: any, rowData: any, index: any) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined className="global-table-action-icon" />}
              onClick={this.handleEdit(rowData)}
            >
              {window.t('common.edit')}
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              icon={<RedoOutlined className="global-table-action-icon" />}
              onClick={this.handleResetEdit(rowData)}
            >
              {window.t('common.reset')}
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title={window.t('common.delete-tip', {title: this.props.baseTitle})}
              onConfirm={this.handleDelete(rowData)}
            >
              <Button
                className="global-table-action-delete"
                type="link"
                size="small"
                icon={<DeleteOutlined className="global-table-action-icon" />}
              >
                {window.t('common.delete')}
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  handleEdit = (rowData: any) => () => {
    this.setState({
      visible: true,
      editable: true,
      id: get(rowData, 'id'),
      primaryKey: get(rowData, 'login'),
    });
  };

  handleResetCancel = () => {
    this.setState({
      resetVisible: false,
      resetEditable: false,
    });
  };

  handleResetEdit = (rowData: any) => () => {
    this.setState({
      resetVisible: true,
      resetEditable: true,
      id: get(rowData, 'id'),
      primaryKey: get(rowData, 'login'),
    });
  };

  handleDisableUser = (rowData: any) => async () => {
    const { baseUrl } = this.props;
    try {
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

  renderOthersModal = () => {
    const { visible, editable, id, primaryKey, resetVisible } = this.state;

    return (
      <>
        {visible && (
          <UsersModal
            visible={visible}
            editable={editable}
            id={id}
            primaryKey={primaryKey}
            onCancel={this.handleCancel}
            onSearch={this.handleQuerySearch}
            onSubmit={this.handleSubmit}
          />
        )}
        {resetVisible && (
          <ResetPasswordModal
            visible={resetVisible}
            id={id}
            primaryKey={primaryKey}
            onCancel={this.handleResetCancel}
            onSearch={this.handleQuerySearch}
          />
        )}
      </>
    );
  };

  handleSubmit = async (data) => {
    const { baseTitle } = this.props;
    let tip = '';
    let method = '';
    if (data.id) {
      tip = window.t('common.update-success', { title: baseTitle });
      method = 'put';
    } else {
      tip = window.t('common.create-success', { title: baseTitle });
      method = 'post';
    }
    await request[method]('/api/users', data);
    message.success(tip);
    this.handleCancel();
    this.handleQuerySearch();
  };
}
