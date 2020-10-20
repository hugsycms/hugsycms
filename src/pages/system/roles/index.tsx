import React from 'react';
import RoleTable from './components/RoleTable';
import RolesModal from './components/RolesModal';
import { tableColumns } from './config/table';
import { Popconfirm, Button, Row, Col, message, Divider } from 'antd';
import { get } from 'lodash';
import { processFromApi, toApi } from './config/adapter';
import BaseList from '@/components/BaseList';
import { EditOutlined, DeleteOutlined } from '@/components/GeneralComponents/CustomIcon';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import request from '@/lib/request';
import MenuPermissionCard from './components/MenuPermissionCard';
import './index.less';

export default class Roles extends BaseList {
  static defaultProps = {
    baseUrl: '/api/mock/roles/all',
    baseTitle: '角色',
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
      title: '操作',
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
              编辑
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
      message.success('保存 API 权限成功');
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
      message.success('保存菜单/权限成功');
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
          <Row gutter={[8, 0]} className="role-wrap">
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
