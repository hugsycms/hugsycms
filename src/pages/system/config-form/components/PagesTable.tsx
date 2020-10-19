import React from 'react';
import BaseTable from '@/components/BaseTable';
import { Table } from 'antd';

export default class PagesTable extends BaseTable {
  render() {
    const { columns, ...rest } = this.props;
    const mergedColumns = this.mergedColumns(columns);

    return (
      <Table
        size="small"
        bordered
        columns={mergedColumns}
        title={this.renderTitle}
        className="global-base-table form-config-table"
        {...rest}
      />
    );
  }
}
