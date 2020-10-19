import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import request from '@/lib/request';

interface IProps extends SelectProps<any> {
  labelKey?: string;
  valueKey?: string;
  method?: string;
  url?: string;
  dataSource?: { [x: string]: any }[];
}
export default (props: IProps) => {
  const { valueKey = 'value', labelKey = 'label', url, method = 'get', dataSource = [] } = props;
  const Option = Select.Option;
  const [options, setOptions] = useState<{ [x: string]: any }>(dataSource);
  useEffect(() => {
    url &&
      request[method](`/api/mock/${url}`).then((r) => {
        setOptions(r);
      });
  }, []);

  return (
    <Select {...props}>{options && options.map((_) => <Option value={_[valueKey]}>{_[labelKey]}</Option>)}</Select>
  );
};
