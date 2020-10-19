import React from 'react';
import { keyBy, get } from 'lodash';
import { inputTypeOptions } from '../index';
import { formatTimeToDate } from '@/utils/format';
import { APP_CONFIG } from '@/lib/config/constants';

export const pageTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
];
export const sectionTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '标志',
    dataIndex: 'flag',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
];
export const descriptionTableColumns = [
  {
    title: '名称',
    dataIndex: 'label',
    width: APP_CONFIG.CELL_WIDTH_SMALL + 50,
  },
  {
    title: '唯一标识',
    dataIndex: 'key',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '字段类型',
    dataIndex: 'inputType',
    render: (value) => {
      return get(keyBy(inputTypeOptions, 'value'), `${value}.label`);
    },
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '排序值',
    dataIndex: 'sort',
    sortType: 'number',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    render: (text: string) => formatTimeToDate(text),
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedTime',
    render: (text: string) => formatTimeToDate(text),
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
];
