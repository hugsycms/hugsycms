import React, { useState, useEffect } from 'react';
import { Select, Cascader, Input } from 'antd';
import { map, get, isEmpty, split, isNil } from 'lodash';
import options, { getStreets } from './cascader-address-options';

export default (props: any) => {
  const [streets, setStreets] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (!isEmpty(get(props, 'value'))) {
      const addressArray = split(get(props, 'value'), ',');
      const value = {
        province: get(addressArray, 0) || '',
        city: get(addressArray, 1) || '',
        area: get(addressArray, 2) || '',
        street: get(addressArray, 3) || '',
        detail: get(addressArray, 4) || '',
      };
      try {
        setAddress(value);
        setStreets(getStreets(get(value, 'province'), get(value, 'city'), get(value, 'area')) || []);
      } catch (error) {
        setAddress({});
        setStreets([]);
      }
    }
  }, [props.value]);

  const handleProvinceChange = (data) => {
    const { onChange } = props;
    const province = get(data, 0);
    const city = get(data, 1);
    const area = get(data, 2);
    setStreets([]);
    if (province && city && area) {
      setStreets(getStreets(province, city, area) || []);
    }
    const params = {
      ...address,
      province,
      city,
      area,
    };
    setAddress(params);
    onChange &&
      onChange(
        `${params.province || ''},${params.city || ''},${params.area || ''},${params.street || ''},${
          params.detail || ''
        }`,
      );
  };

  const handleStreetChange = (data) => {
    const { onChange } = props;
    const params = {
      ...address,
      street: data,
    };
    setAddress(params);
    onChange &&
      onChange(
        `${params.province || ''},${params.city || ''},${params.area || ''},${params.street || ''},${
          params.detail || ''
        }`,
      );
  };

  const handleInputChange = (e) => {
    const { onChange } = props;
    const params = {
      ...address,
      detail: e.target.value,
    };
    setAddress(params);
    onChange &&
      onChange(
        `${params.province || ''},${params.city || ''},${params.area || ''},${params.street || ''},${
          params.detail || ''
        }`,
      );
  };

  return (
    <Input.Group compact>
      <Cascader
        options={options}
        onChange={handleProvinceChange}
        placeholder="选择省市区"
        allowClear
        value={
          isNil(get(address, 'province'))
            ? undefined
            : [get(address, 'province'), get(address, 'city'), get(address, 'area')]
        }
        style={{ width: '25%' }}
      />
      <Select
        disabled={isEmpty(address)}
        placeholder="选择街道、社区"
        onChange={handleStreetChange}
        allowClear
        value={get(address, 'street')}
        style={{ width: '25%' }}
      >
        {map(streets, (street) => (
          <Select.Option value={get(street, 'value')}>{get(street, 'label')}</Select.Option>
        ))}
      </Select>
      <Input
        disabled={isEmpty(address)}
        placeholder="详细地址"
        onChange={handleInputChange}
        allowClear
        value={get(address, 'detail')}
        style={{ width: '50%' }}
      />
    </Input.Group>
  );
};
