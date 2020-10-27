import React from 'react';
import request from '@/lib/request';
import { get, isFunction, map, keyBy, set, isNil, isEmpty } from 'lodash';
import { message, Popconfirm, Button, Form, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@/components/general-components/custom-icon';
import queryString from 'query-string';
import BaseTable from '@/components/base-table';
import { FormInstance } from 'antd/lib/form';
import BaseFormComponent from '../base-form-component';
import moment, { isMoment } from 'moment';
import { formatTimeToUTC } from '@/utils/format';
import { getDataSource } from './methods';
import './index.less';
import { APP_CONFIG } from '@/lib/config/constants';
import { Dimensions } from 'react-container-dimensions';

export interface IProps {
  // api url.
  baseUrl: string;
  // unique key.
  rowKey: string;
  // title.
  baseTitle: string;
  // table columns config.
  tableColumns: any[];
  // Table Component.
  Table: any;
  // if need pagination.
  needPagination?: boolean;
  // if need checked.
  needChecked?: boolean;
  // if need edit in table.
  needEditInTable?: boolean;
  // if need show add button.
  showAdd?: boolean;
  // if need show action.
  showAction?: boolean;
  // when BaseList as child component，it maybe need.
  asChildComponentQueryLabel?: string;
  // show query component, if is true, Query component is required.
  showQuery?: boolean;
  // id
  id?: boolean;
  // multiple format data from api.
  processFromApi?: (data: object[]) => object[];
  // format api when create or update data.
  toApi?: (data: object) => object;
  // other table props, more view https://ant.design/components/table-cn/#API.
  otherTableProps?: any;
  // model form component.
  ModalForm?: any;
  // query component
  Query?: any;
  // container props, from react-container-dimensions
  containerProps?: Dimensions;
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
    title: window.t('common.action'),
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
            <Button type="primary" size="small" className="table-action-btn" onClick={this.handleItemSave(rowData)}>
              {window.t('common.save')}
            </Button>
            <Button size="small" className="table-action-btn" onClick={this.handleItemCancel(rowData)}>
              {window.t('common.cancel')}
            </Button>
          </>
        );
      }

      return (
        <>
          <Button type="link" size="small" onClick={this.handleEdit(rowData)}>
            <EditOutlined className="global-table-action-icon" />
            {window.t('common.edit')}
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title={window.t('common.delete-tip', { title: this.props.baseTitle })}
            onConfirm={this.handleDelete(rowData)}
          >
            <Button className="global-table-action-delete" type="link" size="small">
              <DeleteOutlined className="global-table-action-icon" />
              {window.t('common.delete')}
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
    if (APP_CONFIG.isDev) {
      // TODO: change yourself
      message.error(window.t('common.preview-mode-tip'));
      return Promise.reject(window.t('common.preview-mode-tip'));
    }
    await request.delete(`${baseUrl}/${get(rowData, 'id')}`);
    message.success(window.t('common.delete-success', { title: baseTitle }));
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
    let title = window.t('common.update-success', { title: baseTitle });
    if (!id && showAdd && needEditInTable) {
      method = 'post';
      title = window.t('common.create-success', { title: baseTitle });
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
    const { dataSource, editKey } = this.state;
    const form = this.form as FormInstance;
    form.resetFields();
    this.setState({
      editKey: undefined,
      dataSource: typeof editKey === 'string' ? dataSource.slice(1, dataSource.length) : dataSource,
    });
  };

  handleEdit = (rowData: any) => () => {
    const { needEditInTable, tableColumns } = this.props;
    if (needEditInTable) {
      const form = this.form as FormInstance;
      // TODO: Judge field type is date, then transfer to moment. Can here optimizing ?
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

  handleAdd = async () => {
    const { needEditInTable } = this.props;
    if (needEditInTable) {
      const { dataSource, editKey } = this.state;
      if (!isNil(editKey)) {
        message.error(window.t('common.please-save-last-record-first'));
        return;
      }
      const mockKey = new Date().toString();
      await this.setState({
        editKey: mockKey,
        dataSource: [
          {
            editKey: mockKey,
          },
          ...dataSource,
        ],
      });
    } else {
      this.setState({
        visible: true,
        editable: true,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      editable: false,
      id: undefined,
    });
  };

  handleFieldsChange = () => {};

  // if something is different, can override handleQuerySearch.
  handleQuerySearch = (data: object = {}) => {
    let queryData = {};
    map(data, (value: any, key: any) => {
      if (!isNil(value) && !isEmpty(value)) {
        queryData = {
          ...queryData,
          [key]: value,
        };
      }
    });
    this.handleSearch(queryData);
  };

  formatQuery = (queryParams: object) => {
    const { asChildComponentQueryLabel = '', id: propsId } = this.props;
    const { defaultQuery } = this.state;

    // Because base list component maybe can as a child component, so can receive id from props.
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

  // Can override the function.
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

  // Can override the function, the function return some form item should be hidden.
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
                showTotal: () => `${window.t('common.total', { total })}`,
                pageSize: get(defaultQuery, 'size'),
                size: 'small',
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
