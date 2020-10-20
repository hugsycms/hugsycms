import React from 'react';
import { get, reduce, isEmpty } from 'lodash';
import { APP_CONFIG } from '@/lib/config/constants';
import { formatTimeToStandard } from '@/utils/format';

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '账号',
    dataIndex: 'username',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value) => {
      return <img src={value} alt="avatar" />;
    },
  },
  {
    title: '姓名',
    dataIndex: 'nickname',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '角色',
    dataIndex: 'roleString',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    // render: (value: string, rowData: any) => {
    //   const { roles } = rowData;
    //   const res = reduce(
    //     roles,
    //     (sum, group) => {
    //       return `${isEmpty(sum) ? '' : `${sum}、`}${get(group, 'nickname')}`;
    //     },
    //     '',
    //   );
    //   return <span>{res}</span>;
    // },
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
];
