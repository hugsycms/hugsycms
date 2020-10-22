import React, { Component } from 'react';
import { Row, Col, Card, Button, Tree, Input, Form, message, Popconfirm, InputNumber } from 'antd';
import { getAllMenus, transferMenus, getActiveMenu, updateMenu, createMenu, deleteMenu } from './methods';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import { get, isNil, isEmpty } from 'lodash';
import ParentPermissionSelect from '@/components/selects/ParentPermissionSelect';
import PermissionTypeSelect from '@/components/selects/PermissionTypeSelect';
import IconSelect from '@/components/GeneralComponents/IconSelect';
import { CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import './index.less';

export default class List extends Component {
  state = {
    loading: true,
    menus: undefined,
    activeMenu: undefined,
  };

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
      <Card title="Permission Detail" size="small" bordered={false}>
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
              <Form.Item name="id" label="Menu ID">
                <Input disabled />
              </Form.Item>
              <Form.Item name="parentid" label="Paraent">
                <ParentPermissionSelect />
              </Form.Item>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="type" label="Type">
                <PermissionTypeSelect />
              </Form.Item>
              <Form.Item name="key" label="Path">
                <Input />
              </Form.Item>
              <Form.Item name="icon" label="Icon">
                {/* <Input addonBefore={<CustomIcon type={this.form.getFieldValue('icon')} />} /> */}
                <IconSelect />
              </Form.Item>
              <Form.Item name="sort" label="Sort">
                <InputNumber />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Save
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
                    Delete
                  </Button>
                </Popconfirm>
              </Form.Item>
            </>
          ) : (
            <p>Please choose a menu in right</p>
          )}
        </Form>
      </Card>
    );
  };

  render() {
    const { loading, menus } = this.state;
    return (
      <Row gutter={[8, 0]} className="menus-list">
        <Col span={8}>
          <Card
            title="Permission List"
            size="small"
            extra={
              <Button type="link" size="small" ghost icon={<CustomIcon type="icon-add" />} onClick={this.handleAddMenu}>
                Create
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
