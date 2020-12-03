import React, { Component } from 'react';
import { Button, Input, Space, InputNumber, Table, Dropdown, Menu, Checkbox, Popover, Divider, Tooltip } from 'antd';
import {
  CustomIcon,
  SearchOutlined,
  RedoOutlined,
  SettingOutlined,
  ColumnHeightOutlined,
  FilterOutlined,
  PlusOutlined,
  ExportOutlined,
} from '@/components/general-components/custom-icon';
import { TableProps } from 'antd/lib/table';
import { map, get, set, compact, indexOf } from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { ResizableTitle } from './resizeable';
import './index.less';

const DEFAULT_TABLE_CELL_WIDTH = 200;

interface IProps extends TableProps<any> {
  onAdd?: () => void;
  onSearch?: () => void;
  baseTitle?: string;
}

interface IState {
  searchText?: string;
  searchedColumn?: string;
  columns: [];
  checkedColumns: [];
  size: 'small' | 'middle' | 'default';
  queryVisible?: boolean;
  queryHeight?: number;
}

export default class BaseTable extends Component<IProps, IState> {
  queryRef: any;
  searchInput: any;

  constructor(props: any) {
    super(props);
    const checkedColumns: any = compact(map(props.columns, (column) => get(column, 'dataIndex')));
    this.state = {
      searchText: '',
      searchedColumn: '',
      size: 'small',
      columns: props.columns,
      checkedColumns,
      queryVisible: false,
      queryHeight: 0,
    };
  }

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleSorter = (column: any) => (rowDataPrev: any, rowDataNext: any) => {
    const { dataIndex, sortType = 'string' } = column;
    switch (sortType) {
      case 'number':
        return Number(get(rowDataPrev, dataIndex)) - Number(get(rowDataNext, dataIndex));
      case 'date':
        return moment(get(rowDataPrev, dataIndex)).diff(moment(get(rowDataNext, dataIndex)));
      case 'string':
      default:
        return String(get(rowDataPrev, dataIndex)).localeCompare(String(get(rowDataPrev, dataIndex)));
    }
  };

  handleFilter = (column: any) => (value: any, record: any) => {
    const { dataIndex } = column;
    // TODO: just filter input now.
    return String(record[dataIndex]).toLowerCase().includes(String(value).toLowerCase());
  };

  updateTableSize = (size: any) => () => {
    this.setState({
      size,
    });
  };

  renderInputNode = (filterType: string = 'string', column: any, filterDropdownProps: FilterDropdownProps) => {
    const { setSelectedKeys, selectedKeys, confirm, clearFilters } = filterDropdownProps;
    const { title, dataIndex } = column;
    const commonProps = {
      ref: (node: any) => {
        this.searchInput = node;
      },
      placeholder: window.t('common.please-entry', { title }),
      // size: 'small',
      style: { width: 188, marginBottom: 8, display: 'block' },
      onPressEnter: () => this.handleSearch(selectedKeys, confirm, dataIndex),
    };

    switch (filterType) {
      case 'number':
        return (
          <InputNumber {...commonProps} onChange={(inputNumber) => setSelectedKeys(inputNumber ? [inputNumber] : [])} />
        );
      case 'string':
      default:
        return <Input {...commonProps} onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])} />;
    }
  };

  renderFilterDown = (column: any) => (filterDropdownProps: FilterDropdownProps) => {
    const { setSelectedKeys, selectedKeys, confirm, clearFilters } = filterDropdownProps;
    const { dataIndex, filterType = 'string', title } = column;

    return (
      <div style={{ padding: 8 }}>
        {this.renderInputNode(filterType, column, filterDropdownProps)}
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            style={{ width: 90 }}
          >
            {window.t('common.submit')}
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} style={{ width: 90 }}>
            {window.t('common.reset')}
          </Button>
        </Space>
      </div>
    );
  };

  handleResize = (index) => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  mergedColumns = (columns: any) => {
    return map(columns, (column: any, index) => {
      const { width, showSorter, showFilter, showResize = true } = column;
      const cellHeaderAction = {};
      if (showResize) {
        set(cellHeaderAction, 'onHeaderCell', (column) => ({
          width: width || DEFAULT_TABLE_CELL_WIDTH,
          onResize: this.handleResize(index),
        }));
      }
      if (showSorter) {
        set(cellHeaderAction, 'sorter', this.handleSorter(column));
      }
      if (showFilter) {
        set(cellHeaderAction, 'filterDropdown', this.renderFilterDown(column));
        set(cellHeaderAction, 'onFilter', this.handleFilter(column));
        set(
          cellHeaderAction,
          'filterIcon',
          <div className="filter-block">
            <FilterOutlined />
          </div>,
        );
      }
      return {
        align: 'center',
        ...column,
        ...cellHeaderAction,
        width: width || DEFAULT_TABLE_CELL_WIDTH,
      };
    });
  };

  renderAdd = () => {
    const { onAdd } = this.props;
    if (onAdd) {
      return (
        <Button icon={<PlusOutlined />} size="small" type="primary" onClick={onAdd}>
          {window.t('common.create')}
        </Button>
      );
    }
    return;
  };

  handleColumnsChange = (checkedColumns: any) => {
    const { columns } = this.props;
    const newColumns: any = compact(
      map(columns, (column) => {
        if (get(column, 'dataIndex')) {
          if (indexOf(checkedColumns, get(column, 'dataIndex')) > -1) {
            return column;
          }
          return;
        }
        return column;
      }),
    );

    this.setState({
      checkedColumns,
      columns: newColumns,
    });
  };

  handleQueryClick = () => {
    const { queryVisible } = this.state;
    this.setState(
      {
        queryVisible: !queryVisible,
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  renderOtherActions = (): any => {};

  renderColumnsConfig = () => {
    const { columns } = this.props;
    const { checkedColumns } = this.state;
    const options = compact(
      map(columns, (column) => {
        if (get(column, 'dataIndex')) {
          return {
            label: get(column, 'title'),
            value: get(column, 'dataIndex'),
          };
        }
        return;
      }),
    );

    return <Checkbox.Group options={options} value={checkedColumns} onChange={this.handleColumnsChange} />;
  };

  renderTableConfig = () => {
    const { size } = this.state;

    return (
      <div className="global-base-table__header-operations__right-config">
        <Divider type="vertical" />
        <Tooltip title={window.t('common.refresh')}>
          <RedoOutlined
            className="global-base-table__header-operations__right-config-icon"
            onClick={() => {
              this.props.onSearch && this.props.onSearch();
            }}
          />
        </Tooltip>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu selectedKeys={[size]}>
              <Menu.Item key="small" onClick={this.updateTableSize('small')}>
                {window.t('common.small')}
              </Menu.Item>
              <Menu.Item key="middle" onClick={this.updateTableSize('middle')}>
                {window.t('common.middle')}
              </Menu.Item>
              <Menu.Item key="default" onClick={this.updateTableSize('default')}>
                {window.t('common.large')}
              </Menu.Item>
            </Menu>
          }
        >
          <Tooltip title={window.t('common.padding')}>
            <ColumnHeightOutlined className="global-base-table__header-operations__right-config-icon" />
          </Tooltip>
        </Dropdown>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item>{window.t('common.export-selected')}</Menu.Item>
              <Menu.Item>{window.t('common.export-current-page')}</Menu.Item>
              <Menu.Item>{window.t('common.export-all')}</Menu.Item>
            </Menu>
          }
        >
          <Tooltip title={window.t('common.export')}>
            <ExportOutlined className="global-base-table__header-operations__right-config-icon" />
          </Tooltip>
        </Dropdown>
        <Popover
          overlayClassName="global-base-table__header-operations__right-config__columns"
          content={this.renderColumnsConfig()}
          trigger="click"
        >
          <Tooltip title={window.t('common.column')}>
            <SettingOutlined className="global-base-table__header-operations__right-config-icon" />
          </Tooltip>
        </Popover>
      </div>
    );
  };

  renderTitle = () => {
    const { Query, showQuery, onSearch } = this.props;
    const { queryVisible } = this.state;
    return (
      <div
        ref={(queryRef) => {
          this.queryRef = queryRef;
        }}
        className="global-base-table__header"
      >
        <div className="global-base-table__header-operations">
          <div className="global-base-table__header-operations__left">
            {showQuery && (
              <Button type="link" size="small" icon={<FilterOutlined />} onClick={this.handleQueryClick}>
                {window.t('common.filter')}
                {queryVisible ? <CustomIcon type="icon-down" /> : <CustomIcon type="icon-right" />}
              </Button>
            )}
            {this.renderOtherActions()}
          </div>
          <div className="global-base-table__header-operations__right">
            {this.renderAdd()}
            {this.renderTableConfig()}
          </div>
        </div>
        <Divider style={{ margin: 0, paddingBottom: 0 }} />
        {queryVisible && showQuery && (
          <div className="global-base-table__header-query">
            <Query onSearch={onSearch} />
          </div>
        )}
      </div>
    );
  };

  render() {
    const { className, otherTableProps, containerProps, scroll, components, style, ...rest } = this.props;
    const { columns, size } = this.state;
    const mergedColumns = this.mergedColumns(columns);

    const thead = size === 'small' ? 31 : size === 'middle' ? 39 : 55;
    const tfoot = 48;
    const yScroll = get(containerProps, 'height') - this.queryRef?.clientHeight - thead - tfoot;

    return (
      <>
        {this.renderTitle()}
        <Table
          size={size}
          bordered={false}
          {...otherTableProps}
          {...rest}
          components={{
            header: {
              cell: ResizableTitle,
            },
            ...components,
          }}
          scroll={
            scroll || {
              x: get(otherTableProps, 'scroll.x') || '100vw',
              y: get(otherTableProps, 'scroll.y') || yScroll,
            }
          }
          style={{
            height: `calc(100% - ${this.queryRef?.clientHeight}px)`,
            overflow: 'hidden',
            ...style,
          }}
          columns={mergedColumns}
          title={undefined}
          className={classnames('global-base-table', className)}
        />
      </>
    );
  }
}
