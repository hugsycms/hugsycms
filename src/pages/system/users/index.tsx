import React from 'react';
import Table from './components/Table';
import Query from './components/Query';
import UsersModal from './components/UsersModal';
import { tableColumns } from './config/table';
import { processFromApi, toApi } from './config/adapter';
import { Popconfirm, Switch, Button, message, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, RedoOutlined } from '@/components/GeneralComponents/CustomIcon';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import request from '@/lib/request';
import ResetPasswordModal from './components/ResetPasswordModal';
import { APP_CONFIG } from '@/lib/config/constants';

export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/users',
    baseTitle: '用户',
    needPagination: true,
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
      title: '活跃状态',
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
      title: '操作',
      align: 'center',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 186,
      render: (value: any, rowData: any, index: any) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined className="global-table-action-icon" />}
              onClick={this.handleEdit(rowData)}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              icon={<RedoOutlined className="global-table-action-icon" />}
              onClick={this.handleResetEdit(rowData)}
            >
              重置
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title={`确定要删除这个${get(this.props, 'baseTitle')}吗?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small" icon={<DeleteOutlined className="global-table-action-icon" />}>
                删除
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
      message.success('切换用户状态成功');
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
    try {
      let tip = '';
      let method = '';
      if (data.id) {
        tip = '修改用户成功';
        method = 'put';
      } else {
        tip = '添加用户成功';
        method = 'post';
      }
      await request[method]('/api/users', data);
      message.success(tip);
      this.handleCancel();
      this.handleQuerySearch();
    } catch (error) {
      if (error.status === 400) {
        message.error('该用户名已存在，请重新输入');
      }
    }
  };
}
