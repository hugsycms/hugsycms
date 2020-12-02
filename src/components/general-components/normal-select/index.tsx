import React from 'react';
import { Select } from 'antd';
import { map, get } from 'lodash';

export const genderMapping = [
  {
    value: 1,
    title: '男',
  },
  {
    value: 2,
    title: '女',
  },
  {
    value: 3,
    title: '未知',
  },
];

export const hasOrNoMapping = [
  {
    value: 0,
    title: '无',
  },
  {
    value: 1,
    title: '有',
  },
];

export const yesOrNoMapping = [
  {
    value: 0,
    title: '否',
  },
  {
    value: 1,
    title: '是',
  },
];

export const statusMapping = {
  genderMapping,
  hasOrNoMapping,
  yesOrNoMapping,
};

interface IProps {
  type: 'genderMapping' | 'hasOrNoMapping' | 'yesOrNoMapping';
  showSearch?: true | false;
  placeholder?: string;
}

export default (props: IProps) => {
  const { type, showSearch = false } = props;
  return (
    <Select
      showSearch={showSearch}
      placeholder="please select"
      allowClear
      filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      {...props}
    >
      {map(get(statusMapping, type), (status) => (
        <Select.Option value={get(status, 'value')}>{get(status, 'title') || get(status, 'label')}</Select.Option>
      ))}
    </Select>
  );
};
