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
    let title = '新增菜单/权限/页面成功';
    let activeMenu = {};
    if (id) {
      title = '修改菜单/权限/页面成功';
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

  renderTitle = () => {
    return (
      <div className="menus-list-card__title">
        <div>菜单/权限/页面列表</div>
        <Button size="small" type="primary" onClick={this.handleAddMenu}>
          添加菜单/权限/页面
        </Button>
      </div>
    );
  };

  renderMenuDetail = () => {
    const { activeMenu } = this.state;
    return (
      <Card title="菜单详情" size="small" bordered={false}>
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
              <Form.Item name="id" label="菜单ID">
                <Input disabled />
              </Form.Item>
              <Form.Item name="parentid" label="父级菜单">
                <ParentPermissionSelect />
              </Form.Item>
              <Form.Item name="name" label="菜单名称">
                <Input />
              </Form.Item>
              <Form.Item name="type" label="菜单类型">
                <PermissionTypeSelect />
              </Form.Item>
              <Form.Item name="key" label="菜单路径">
                <Input />
              </Form.Item>
              <Form.Item name="icon" label="菜单图标">
                {/* <Input addonBefore={<CustomIcon type={this.form.getFieldValue('icon')} />} /> */}
                <IconSelect />
              </Form.Item>
              <Form.Item name="sort" label="菜单排序">
                <InputNumber />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
                <Popconfirm
                  title="确定删除这个菜单?"
                  onConfirm={this.handleDeleteMenu}
                  okText="确定"
                  cancelText="取消"
                  disabled={isNil(activeMenu) || isEmpty(activeMenu)}
                >
                  <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    danger
                    disabled={isNil(activeMenu) || isEmpty(activeMenu)}
                  >
                    删除
                  </Button>
                </Popconfirm>
              </Form.Item>
            </>
          ) : (
            <p>在左侧选择一个菜单</p>
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
            title="菜单/权限/页面列表"
            size="small"
            extra={
              <Button type="link" size="small" ghost icon={<CustomIcon type="icon-add" />} onClick={this.handleAddMenu}>
                添加菜单/权限/页面
              </Button>
            }
            bordered={false}
          >
            {loading ? <CustomSpin /> : <Tree treeData={menus} onSelect={this.handleMenuSelect} />}
          </Card>
        </Col>
        <Col span={16}>{this.renderMenuDetail()}</Col>
      </Row>
    );
  }
}
