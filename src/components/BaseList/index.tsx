import React from 'react';
import request from '@/lib/request';
import { get, isFunction, map, keyBy, set, isNil, isEmpty, isNaN } from 'lodash';
import { message, Popconfirm, Button, Form, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@/components/GeneralComponents/CustomIcon';
import queryString from 'query-string';
import BaseTable from '@/components/BaseTable';
import { FormInstance } from 'antd/lib/form';
import BaseFormComponent from '../BaseFormComponent';
import moment, { isMoment } from 'moment';
import { formatTimeToUTC } from '@/utils/format';
import { getDataSource } from './methods';
import './index.less';

export interface IProps {
  // 接口 URL
  baseUrl: string;
  // 唯一 key，通常取 id
  rowKey: string;
  // 左上角标题
  baseTitle: string;
  // 列表配置
  tableColumns: any[];
  // Table 组件
  Table: any;
  // 是否需要分页
  needPagination?: boolean;
  // 需要 多选
  needChecked?: boolean;
  // 表格是否可编辑
  needEditInTable?: boolean;
  // 展示添加按钮
  showAdd?: boolean;
  // 是否展示编辑列
  showAction?: boolean;
  // 当 BaseList 作为子组件的时候，可能需要使用，参考 nursing-record
  asChildComponentQueryLabel?: string;
  // 展示搜索功能，如果为 true，则必须传 Query 组件
  showQuery?: boolean;
  // 传入的 ID
  id?: boolean;
  // 从接口获取数据，过滤函数
  processFromApi?: (data: object[]) => object[];
  toApi?: (data: object) => object;
  // 其它表格属性
  otherTableProps?: any;
  // 弹窗表单
  ModalForm?: any;
  // 搜索组件
  Query?: any;
}

export interface IState {
  total: number;
  dataSource: any[];
  defaultQuery: object;
  visible: boolean;
  editable: boolean;
  loading: boolean;
  id: any;
  editKey: any;
  selectedRowKeys: any[];
}

export const DEFAULT_HEADER_HEIGHT = 37;

export default class BaseList extends React.Component<IProps, IState> {
  state = {
    total: 0,
    defaultQuery: {
      page: 0,
      size: 20,
    },
    dataSource: [],
    selectedRowKeys: [],
    visible: false,
    editable: false,
    id: undefined,
    editKey: undefined,
    loading: true,
  };

  /* istanbul ignore next */
  actionCol = {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: 158,
    align: 'center',
    showSorter: false,
    showFilter: false,
    render: (value: any, rowData: any, index: number) => {
      const { needEditInTable } = this.props;
      const editable = this.isEditing(rowData);
      if (needEditInTable && editable) {
        return (
          <>
            <Button size="small" className="table-action-btn" onClick={this.handleItemSave(rowData)}>
              保存
            </Button>
            <Button size="small" className="table-action-btn" onClick={this.handleItemCancel(rowData)}>
              取消
            </Button>
          </>
        );
      }

      return (
        <>
          <Button type="link" size="small" onClick={this.handleEdit(rowData)}>
            <EditOutlined className="global-table-action-icon global-table-action-view" />
            编辑
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title={`确定要删除这个${get(this.props, 'baseTitle')}吗?`}
            onConfirm={this.handleDelete(rowData)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small">
              <DeleteOutlined className="global-table-action-icon global-table-action-delete" />
              删除
            </Button>
          </Popconfirm>
        </>
      );
    },
  };

  columns = !this.props.showAction ? [...this.props.tableColumns] : [...this.props.tableColumns, this.actionCol];

  form: FormInstance | null = null;

  componentDidMount() {
    this.handleSearch();
  }

  isEditing = (rowData: any) => (get(rowData, 'editKey') || get(rowData, 'id')) === this.state.editKey;

  handleDelete = (rowData: any) => async () => {
    const { baseUrl, baseTitle } = this.props;
    // TODO: change yourself
      message.error('预览模式，无法提交');
    return Promise.reject('预览模式，无法提交');
    await request.delete(`${baseUrl}/${get(rowData, 'id')}`);
    message.success(`删除${baseTitle}成功`);
    this.handleSearch();
  };

  handleItemSave = (rowData: any) => async () => {
    const { baseUrl, baseTitle, toApi, needEditInTable, showAdd } = this.props;
    const { id } = this.state;
    const form = this.form as FormInstance;
    const formData = form.getFieldsValue();
    map(formData, (data, key) => {
      if (isMoment(data)) {
        formData[key] = formatTimeToUTC(data);
      }
    });
    let method = 'put';
    let title = `编辑${baseTitle}成功`;
    if (!id && showAdd && needEditInTable) {
      method = 'post';
      title = `新增${baseTitle}成功`;
    }
    await request[method](
      baseUrl,
      isFunction(toApi)
        ? toApi({
            ...rowData,
            ...formData,
          })
        : {
            ...rowData,
            ...formData,
          },
    );
    form.resetFields();
    this.setState({
      id: undefined,
      editKey: undefined,
    });
    message.success(title);
    await this.handleSearch();
  };

  handleItemCancel = (rowData: any) => () => {
    this.setState({
      id: undefined,
    });
  };

  handleEdit = (rowData: any) => () => {
    const { needEditInTable, tableColumns } = this.props;
    if (needEditInTable) {
      const form = this.form as FormInstance;
      // TODO: 通过 tableColumns 判断字段是否为时间格式，如果是，需要转换为 moment。(是否可以优化？)
      map(rowData, (item, dataIndex) => {
        const inputType = get(keyBy(tableColumns, 'dataIndex'), `${dataIndex}.inputType`);
        if (['single_date_picker', 'single_time_picker'].indexOf(inputType) > -1) {
          set(rowData, dataIndex, moment(item));
        }
      });
      form.setFieldsValue(rowData);
      this.setState({
        id: get(rowData, 'id'),
        editKey: get(rowData, 'editKey') || get(rowData, 'id'),
      });
    } else {
      this.setState({
        visible: true,
        editable: true,
        id: get(rowData, 'id'),
      });
    }
  };

  handleAdd = () => {
    this.setState({
      visible: true,
      editable: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      editable: false,
      id: undefined,
    });
  };

  handleFieldsChange = () => {};

  // 查询组件，点击查询，由于 api 采用接口 Criteria 风格，子组件可能需要重写 handleQuerySearch
  handleQuerySearch = (data: object = {}) => {
    let queryData = {};
    map(data, (value: any, key: any) => {
      if (typeof value === 'number') {
        queryData = {
          ...queryData,
          [`${key}.equals`]: value,
        };
        return;
      }
      if (!isNil(value) && !isEmpty(value)) {
        let k = '';
        if (key.includes('.')) {
          k = key;
        } else {
          k = `${key}.contains`;
        }
        queryData = {
          ...queryData,
          [k]: value,
        };
      }
    });
    this.handleSearch(queryData);
  };

  formatQuery = (queryParams: object) => {
    const { asChildComponentQueryLabel = '', id: propsId } = this.props;
    const { defaultQuery } = this.state;

    // TODO: 有可能作为页面的子组件， propsId 是 BaseList 作为子组件从 props 传入的
    const query: object = propsId
      ? {
          ...defaultQuery,
          [asChildComponentQueryLabel]: propsId,
          ...queryParams,
        }
      : {
          ...defaultQuery,
          ...queryParams,
        };

    return query;
  };

  handleSearch = async (queryParams: any = {}) => {
    const { baseUrl, processFromApi } = this.props;
    await this.setState({
      loading: true,
    });
    const query = this.formatQuery(queryParams);
    let url = baseUrl;
    if (!isEmpty(query)) {
      url = `${baseUrl}${query ? `?${queryString.stringify(query)}` : ''}`;
    }
    const { data: dataSource, total } = await getDataSource(url, processFromApi);
    this.setState({ dataSource, total, loading: false });
  };

  handlePageChange = (page: any, pageSize: any) => {
    const { defaultQuery } = this.state;
    this.setState(
      {
        defaultQuery: {
          ...defaultQuery,
          page: page - 1,
          size: pageSize,
        },
      },
      () => {
        this.handleSearch();
      },
    );
  };

  handleRowSelected = (selectedRowKeys, selectedRows): any => {};

  getColumns = () => {
    return map(this.columns, (col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (rowData: any) => {
          return {
            record: rowData,
            inputType: col.inputType,
            inputProps: col.inputProps,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(rowData),
          };
        },
      };
    });
  };

  /* istanbul ignore next */ renderEditableCell = (cell: any) => {
    const {
      editing,
      dataIndex,
      title,
      inputType = 'input',
      inputProps,
      rules,
      record,
      index,
      children,
      inputConfig,
      ...restProps
    } = cell;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={rules}
          >
            <BaseFormComponent {...inputProps} inputType={inputType} config={inputConfig} />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  renderOthersModal = () => {
    const { ModalForm } = this.props;
    const { visible, editable, id } = this.state;

    return (
      <>
        {visible && (
          <ModalForm
            visible={visible}
            editable={editable}
            id={id}
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
          />
        )}
      </>
    );
  };

  renderHiddenItem = () => <></>;

  /* istanbul ignore next */
  render() {
    const {
      baseTitle,
      needPagination,
      rowKey,
      Query,
      Table = BaseTable,
      showQuery,
      showAdd,
      otherTableProps,
      needEditInTable,
      needChecked = false,
      containerProps,
    } = this.props;
    const { dataSource, total, defaultQuery, loading, selectedRowKeys } = this.state;
    const mergedColumns = this.getColumns();
    return (
      <div className="base-list">
        <Form
          ref={(formRef) => {
            this.form = formRef;
          }}
          component={false}
          onFieldsChange={this.handleFieldsChange}
        >
          {this.renderHiddenItem()}
          <Table
            otherTableProps={otherTableProps}
            containerProps={containerProps}
            loading={loading}
            pagination={
              needPagination && {
                position: ['bottomCenter'],
                total,
                showTotal: () => `${window.t('baselist.total', { total })}`,
                pageSize: get(defaultQuery, 'size'),
                defaultCurrent: 1,
                onChange: this.handlePageChange,
                onShowSizeChange: this.handlePageChange,
                showQuickJumper: true,
                showSizeChanger: true,
              }
            }
            components={
              needEditInTable
                ? {
                    body: {
                      cell: this.renderEditableCell,
                    },
                  }
                : {}
            }
            columns={mergedColumns}
            dataSource={dataSource}
            onAdd={showAdd && this.handleAdd}
            baseTitle={baseTitle}
            rowKey={rowKey}
            onSearch={this.handleQuerySearch}
            showQuery={showQuery}
            Query={Query}
            needChecked={needChecked}
            selectedRowKeys={selectedRowKeys}
            rowSelection={
              needChecked && {
                type: 'checkbox',
                onChange: this.handleRowSelected,
              }
            }
          />
        </Form>
        {this.renderOthersModal()}
      </div>
    );
  }
}
