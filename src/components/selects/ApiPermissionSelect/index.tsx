import React from 'react';
import { Checkbox, Input } from 'antd';
import { map, get, filter, includes, toUpper, isEqual } from 'lodash';
import request from '@/lib/request';

interface IProps {
  onChange: any;
  disabled: boolean;
}

export default class ApiPermissionSelect extends React.Component<IProps> {
  state = {
    data: [],
    tempData: [],
    checkedData: [],
    isUpdated: false,
  };

  async componentDidMount() {
    const data = await request.get('/api/mock/users/authorities');
    this.setState({ data, tempData: data });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { checkedData, isUpdated } = prevState;
    const { value } = nextProps;
    if (
      !isEqual(
        map(value, item => item.name),
        checkedData,
      ) &&
      value &&
      !isUpdated
    ) {
      return {
        checkedData: value,
      };
    }

    return null;
  }

  handleChange = item => e => {
    const { checkedData } = this.state;
    const { checked } = e.target;
    const { onChange } = this.props;
    let newCheckedData = [];
    if (checked) {
      checkedData.push(item);
      newCheckedData = checkedData;
      onChange(newCheckedData);
    } else {
      newCheckedData = filter(checkedData, key => key !== item);
      onChange(newCheckedData);
    }
    this.setState({ checkedData: newCheckedData, isUpdated: true });
  };

  handleFilter = async e => {
    const { data } = this.state;
    this.setState({
      tempData: filter(data, item => includes(toUpper(item), toUpper(get(e, 'target.value')))),
    });
  };

  render() {
    const { disabled } = this.props;
    const { tempData, checkedData } = this.state;
    return (
      <div style={{ background: '#fff' }}>
        <Input
          style={{ background: '#fff', margin: 8, width: '95%' }}
          
          placeholder="请输入权限名称"
          onChange={this.handleFilter}
        />
        {map(tempData, item => {
          return (
            <Checkbox
              style={{ display: 'block', marginLeft: 8 }}
              key={item}
              disabled={disabled}
              onChange={this.handleChange(item)}
              checked={includes(checkedData, item)}
            >
              {item}
            </Checkbox>
          );
        })}
      </div>
    );
  }
}
