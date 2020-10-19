import React, { Component } from 'react';
import { Row, Col, List, Tree, Input, Form, Card, Switch, Button, InputNumber, Select, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { appsConfig } from './config';
import DescriptionTable from './components/DescriptionTable';
import { descriptionTableColumns } from './config/table';
import { get, last, isEmpty } from 'lodash';
import { getFormDescriptionsBySecitonId, getFormPages, getFormDescriptionDetail, saveFormItem } from './methods';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './index.less';
import 'react-perfect-scrollbar/dist/css/styles.css';

export const inputTypeOptions = [
  {
    value: 'input',
    label: '输入框',
  },
  {
    value: 'input_number',
    label: '数字输入框',
  },
  {
    value: 'normal_select',
    label: '普通选择框',
  },
  {
    value: 'country_select',
    label: '国家选择框',
  },
  {
    value: 'address',
    label: '地址输入框',
  },
  {
    value: 'pregnant_radio',
    label: '单选框',
  },
  {
    value: 'pure_checkbox',
    label: '多选框',
  },
  {
    value: 'single_date_picker',
    label: '日期选择框',
  },
  {
    value: 'custom',
    label: '自定义组件',
  },
];

const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function wrapper(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default class FormConfig extends Component {
  state = {
    tableLoading: false,
    formLoading: false,
    activeDescriptionRow: undefined,
    formData: undefined,
    activeSectionId: undefined,
    sections: [],
    originSections: [],
    formDescriptions: [],
  };

  detailForm: any | FormInstance;

  async componentDidMount() {
    this.setState({
      tableLoading: true,
    });

    await this.getFormPages('web');

    this.setState({
      tableLoading: false,
    });
  }

  handleFilterSections = () => {};

  handleAppSelect = (type: string) => async () => {
    await this.getFormPages(type);
  };

  getFormPages = async (type: string) => {
    const { transferSections: sections, originSections } = await getFormPages(type);
    this.setState({
      sections,
      originSections,
      type,
    });
  };

  handleSectionSelect = async (selectedKeys: any[]) => {
    let { formDescriptions } = this.state;
    this.setState({
      tableLoading: true,
    });
    const activeSectionId = last(selectedKeys);
    if (activeSectionId && !isNaN(Number(activeSectionId))) {
      formDescriptions = await getFormDescriptionsBySecitonId(activeSectionId);
    }
    this.setState({
      tableLoading: false,
      formDescriptions,
      activeSectionId,
    });
  };

  setRowClassName = (rowData: any) => {
    const { activeDescriptionRow } = this.state;
    if (get(rowData, 'id') === get(activeDescriptionRow, 'id')) {
      return 'table-row-active';
    }
    return '';
  };

  handleRowClick = (record) => async () => {
    this.setState({
      formLoading: true,
    });
    const formData = await getFormDescriptionDetail(get(record, 'id'));
    this.detailForm?.setFieldsValue(formData);
    this.setState({
      activeDescriptionRow: get(record, 'id'),
      formLoading: false,
      formData,
    });
  };

  handleSave = async (data) => {
    const { formData, activeSectionId } = this.state;
    await saveFormItem({ ...formData, ...data });
    message.success('保存成功');
    if (activeSectionId && !isNaN(Number(activeSectionId))) {
      const formDescriptions = await getFormDescriptionsBySecitonId(activeSectionId);
      this.setState({
        formDescriptions,
      });
    }
  };

  handleSync = debounce((ps) => {
    ps.update();
  }, 600);

  render() {
    const { sections, formDescriptions, formLoading, tableLoading, formData, activeSectionId } = this.state;

    return (
      <div className="form-config-container">
        <Row className="form-config-container_header">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={appsConfig}
            renderItem={(item) => (
              <List.Item className="form-config-container_header-item" onClick={this.handleAppSelect(item.key)}>
                <img src={item.icon} />
              </List.Item>
            )}
          />
        </Row>
        <Row gutter={[8, 0]} className="form-config-container_body">
          <Col span={5}>
            <div className="form-config-container_body-details">
              <div className="form-config-container_body-details-search">
                <Input.Search placeholder="请输入..." onChange={this.handleFilterSections} />
              </div>
              <PerfectScrollbar
                className="form-config-container_body-details-tree"
                options={{ suppressScrollX: true }}
                onSync={this.handleSync}
              >
                <Tree
                  // onExpand={this.onExpand}
                  // expandedKeys={expandedKeys}
                  // autoExpandParent={autoExpandParent}
                  onSelect={this.handleSectionSelect}
                  treeData={sections}
                />
              </PerfectScrollbar>
            </div>
          </Col>
          <Col span={12}>
            <PerfectScrollbar
              className="form-config-container_body-items"
              options={{ suppressScrollX: true }}
              onSync={this.handleSync}
            >
              <DescriptionTable
                loading={tableLoading}
                rowClassName={this.setRowClassName}
                pagination={false}
                columns={descriptionTableColumns}
                dataSource={formDescriptions}
                scroll={{ x: 800 }}
                baseTitle="表单"
                onRow={(record: any) => {
                  return {
                    onClick: this.handleRowClick(record),
                  };
                }}
                onSearch={() => {
                  this.handleSectionSelect([activeSectionId]);
                }}
              />
            </PerfectScrollbar>
          </Col>
          <Col span={7}>
            <div className="form-config-container_body-item-props">
              <Form
                ref={(refNode) => {
                  this.detailForm = refNode;
                }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={this.handleSave}
              >
                <Card size="small" title="属性配置" loading={formLoading}>
                  <Form.Item label="名称" name="label">
                    <Input />
                  </Form.Item>
                  <Form.Item label="唯一标识" name="key">
                    <Input />
                  </Form.Item>
                  <Form.Item label="是否启用" name="isActive" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <Form.Item label="是否必填" name="isRequired" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <Form.Item label="是否独占一行" name="isNewRow" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <Form.Item label="排序值" name="sort">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item label="字段类型" name="inputType">
                    <Select options={inputTypeOptions} />
                  </Form.Item>
                  <Form.Item label="字段占比" name="span">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item label="字段间隔" name="offset">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item label="标签占比" name="labelCol">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item label="输入框占比" name="wrapperCol">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item label="组件属性" name="inputProps">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item label="特殊样式" name="styles">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item label="转换规则" name="tranferRules">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item label="特殊配置" name="specialConfig">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item label="创建时间" name="createdTime">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="修改时间" name="updatedTime">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button disabled={isEmpty(formData)} type="primary" htmlType="submit">
                      保存
                    </Button>
                  </Form.Item>
                </Card>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
