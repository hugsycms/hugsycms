import React from 'react';
import Table from './components/Table';
import Query from './components/Query';
import { tableColumns } from './config/table';
import BaseList from '@/components/BaseList';
import { get } from 'lodash';
import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@/components/GeneralComponents/CustomIcon';

export default class List extends BaseList {
  static defaultProps = {
    baseUrl: '/api/admissions',
    baseTitle: '入院登记',
    needPagination: true,
    showQuery: true,
    showAdd: true,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1596 },
    },
  };

  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: '操作',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 158,
      align: 'center',
      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            <EyeOutlined className="global-table-action-icon " title="查看" onClick={this.handleView(rowData)} />
            <EditOutlined className="global-table-action-icon " title="编辑" onClick={this.handleEdit(rowData)} />
            <Popconfirm
              title={`Are you sure to delete the ${get(this.props, 'baseTitle')} ?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <DeleteOutlined className="global-table-action-icon " title="删除" />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  handleAdd = () => {
    const { history } = this.props;
    history.push('/deliver-management/admission/add');
  };

  handleView = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    history.push(`/deliver-management/admission/deliver-edit?id=${id}`);
  };

  handleEdit = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    history.push(`/deliver-management/admission/edit?id=${id}`);
  };
}
