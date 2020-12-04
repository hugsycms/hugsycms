import React, { Component } from 'react';
import { Row, Col, Card, Button, Tree, Input, Form, message, Popconfirm, InputNumber } from 'antd';
import { getAllMenus, transferMenus, getActiveMenu, updateMenu, createMenu, deleteMenu } from './methods';
import CustomSpin from '@/components/general-components/custom-spin';
import { get, isNil, isEmpty } from 'lodash';
import ParentPermissionSelect from '@/components/general-components/parent-permission-select';
import NormalSelect from '@/components/general-components/normal-select';
import IconSelect from '@/components/general-components/icon-select';
import { PlusOutlined } from '@/components/general-components/custom-icon';
import './index.less';

export default class List extends Component {
  state = {
    loading: true,
    menus: undefined,
    activeMenu: undefined,
  };

  form: any;

  async componentDidMount() {
    const menus = transferMenus(await getAllMenus());
    this.setState({
      menus,
      loading: false,
    });
  }

  handleAddMenu = () => {
    this.form && this.form.resetFields();
    this.setState({
      activeMenu: {},
    });
  };

  handleMenuSelect = async (selectedKeys) => {
    const activeMenu = get(selectedKeys, 0) ? await getActiveMenu(get(selectedKeys, 0)) : undefined;
    this.form && this.form.setFieldsValue(activeMenu);
    this.setState({
      activeMenu,
    });
  };

  handleSubmit = async (data) => {
    const id = get(data, 'id');
    let title = 'Succeeded';
    let activeMenu = {};
    if (id) {
      title = 'Failed';
      activeMenu = await updateMenu(data);
    } else {
      activeMenu = await createMenu(data);
    }
    this.form && this.form.setFieldsValue(activeMenu);
    const menus = transferMenus(await getAllMenus());
    this.setState({
      menus,
      activeMenu,
    });
    message.success(title);
  };

  handleDeleteMenu = async () => {
    this.form && (await deleteMenu(this.form.getFieldValue('id')));
    const menus = transferMenus(await getAllMenus());
    let activeMenu = {};
    this.form && this.form.resetFields();
    this.setState({
      menus,
      activeMenu,
    });
  };

  renderPermissionDetail = () => {
    const { activeMenu } = this.state;
    return (
      <Card title={window.t('system.menu.permission-detail')} size="small" bordered={false}>
        <Form
          className="menus-list-detail"
          ref={(refNode) => {
            this.form = refNode;
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          onFinish={this.handleSubmit}
        >
          {!isNil(activeMenu) ? (
            <>
              <Form.Item name="id" label={window.t('system.menu.permission-id')}>
                <Input disabled />
              </Form.Item>
              <Form.Item name="parentid" label={window.t('system.menu.permission-parent')}>
                <ParentPermissionSelect />
              </Form.Item>
              <Form.Item name="name" label={window.t('system.menu.permission-name')}>
                <Input />
              </Form.Item>
              <Form.Item name="type" label={window.t('system.menu.permission-type')}>
                <NormalSelect type="permissionTypeMapping" />
              </Form.Item>
              <Form.Item name="key" label={window.t('system.menu.permission-path')}>
                <Input />
              </Form.Item>
              <Form.Item name="icon" label={window.t('system.menu.permission-icon')}>
                <IconSelect />
              </Form.Item>
              <Form.Item name="sort" label={window.t('system.menu.permission-sort')}>
                <InputNumber />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  {window.t('common.save')}
                </Button>
                <Popconfirm
                  title="Are you sure delete the menu?"
                  onConfirm={this.handleDeleteMenu}
                  disabled={isNil(activeMenu) || isEmpty(activeMenu)}
                >
                  <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    danger
                    disabled={isNil(activeMenu) || isEmpty(activeMenu)}
                  >
                    {window.t('common.delete')}
                  </Button>
                </Popconfirm>
              </Form.Item>
            </>
          ) : (
            <p>{window.t('system.menu.select-tip')}</p>
          )}
        </Form>
      </Card>
    );
  };

  render() {
    const { loading, menus } = this.state;
    return (
      <Row gutter={[8, 0]} className="permission-container">
        <Col span={8}>
          <Card
            title={window.t('system.menu.permission-list')}
            size="small"
            extra={
              <Button icon={<PlusOutlined />} size="small" type="primary" onClick={this.handleAddMenu}>
                {window.t('common.create')}
              </Button>
            }
            bordered={false}
          >
            {loading ? <CustomSpin /> : <Tree treeData={menus} onSelect={this.handleMenuSelect} />}
          </Card>
        </Col>
        <Col span={16}>{this.renderPermissionDetail()}</Col>
      </Row>
    );
  }
}
