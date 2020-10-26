import React from 'react';
import RoleTable from './components/role-table';
import RolesModal from './components/role-modal';
import { tableColumns } from './config/table';
import { Popconfirm, Button, Row, Col, message, Divider } from 'antd';
import { get } from 'lodash';
import { processFromApi, toApi } from './config/adapter';
import BaseList from '@/components/base-list';
import { EditOutlined, DeleteOutlined } from '@/components/general-components/custom-icon';
import CustomSpin from '@/components/general-components/custom-spin';
import request from '@/lib/request';
import MenuPermissionCard from './components/permission-card';

export default class Roles extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/roles/all',
    baseTitle: 'role',
    needPagination: false,
    showQuery: false,
    tableColumns,
    rowKey: 'id',
    showAdd: false,
  };

  state = {
    dataSource: [],
    menuDataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    loading: true,
    defaultCheckedMenu: [],
    activeRole: {},
  };

  roleColumns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: 'Actions',
      align: 'center',
      width: 156,
      render: (value: any, rowData: any) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined className="global-table-action-icon" />}
              onClick={this.handleEdit(rowData)}
            >
              Edit
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
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  handleSearch = async () => {
    const { baseUrl, needPagination } = this.props;
    const data = get(await request.get(baseUrl), 'data');
    const dataSource = processFromApi(data);
    this.setState({ dataSource, total: 0, loading: false });
  };

  handleRowClick = (rowData: any) => (e: any) => {
    this.setState({
      defaultCheckedMenu: get(rowData, 'permissions'),
      activeRole: rowData,
    });
  };

  setRowClassName = (rowData: any) => {
    const { activeRole } = this.state;
    if (get(rowData, 'id') === get(activeRole, 'id')) {
      return 'table-row-active';
    }
    return '';
  };

  handleSaveApiPermission = async (checkedData: any[]) => {
    const { activeRole } = this.state;
    const { baseUrl } = this.props;
    try {
      await request.put(baseUrl as string, toApi({ ...activeRole, authorities: checkedData }));
      message.success(window.t('common.action-success'));
      await this.handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  handleSaveMenuPermission = async (checkedData: any[]) => {
    const { activeRole } = this.state;
    const { baseUrl } = this.props;
    try {
      await request.put(baseUrl as string, toApi({ ...activeRole, permissions: checkedData }));
      message.success(window.t('common.action-success'));
      await this.handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { baseTitle } = this.props;
    const { dataSource, visible, editable, id, loading, activeRole } = this.state;

    return (
      <>
        {loading ? (
          <CustomSpin />
        ) : (
          <Row gutter={[8, 0]}>
            <Col span={14}>
              <div>
                <RoleTable
                  columns={this.roleColumns}
                  dataSource={dataSource}
                  onAdd={this.handleAdd}
                  pagination={false}
                  rowClassName={this.setRowClassName}
                  onRow={(record: any) => {
                    return {
                      onClick: this.handleRowClick(record),
                    };
                  }}
                  baseTitle={baseTitle}
                  scroll={{}}
                />
              </div>
            </Col>
            <Col span={10}>
              <MenuPermissionCard
                key={get(activeRole, 'id')}
                role={activeRole}
                onSaveMenuPermission={this.handleSaveMenuPermission}
              />
            </Col>
          </Row>
        )}
        {visible && (
          <RolesModal
            visible={visible}
            editable={editable}
            id={id}
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
          />
        )}
      </>
    );
  }
}
