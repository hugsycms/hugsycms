import React from 'react';
import BaseTable from '@/components/BaseTable';
import { Table } from 'antd';

export default class PagesTable extends BaseTable {
  render() {
    const { columns, size } = this.state;
    const mergedColumns = this.mergedColumns(columns);

    return (
      <Table
        {...this.props}
        size={size}
        bordered
        columns={mergedColumns}
        title={this.renderTitle}
        className="global-base-table form-config-table"
      />
    );
  }
}
