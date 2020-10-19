import React from 'react';
import { get, reduce, isEmpty } from 'lodash';
import { APP_CONFIG } from '@/lib/config/constants';
import { formatTimeToStandard } from '@/utils/format';

export const tableColumns = [
  // {
  //   title: '编号',
  //   dataIndex: 'id',
  //   key: 'id',
  //
  // },
  {
    title: '账号',
    dataIndex: 'login',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  // {
  //   title: '头像',
  //   dataIndex: 'imageUrl',
  //   key: 'imageUrl',
  //
  // },
  {
    title: '姓名',
    dataIndex: 'firstName',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  // {
  //   title: '邮箱',
  //   dataIndex: 'email',
  //   key: 'email',
  //
  // },
  {
    title: '角色',
    dataIndex: 'role',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (value: string, rowData: any) => {
      const { groups } = rowData;
      const res = reduce(
        groups,
        (sum, group) => {
          return `${isEmpty(sum) ? '' : `${sum}、`}${get(group, 'nickname')}`;
        },
        '',
      );
      return <span>{res}</span>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdDate',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value: string) => formatTimeToStandard(value),
  },
  {
    title: '创建者',
    dataIndex: 'createdBy',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '最近修改时间',
    dataIndex: 'lastModifiedDate',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value: string) => formatTimeToStandard(value),
  },
  {
    title: '最近修改者',
    dataIndex: 'lastModifiedBy',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
];
