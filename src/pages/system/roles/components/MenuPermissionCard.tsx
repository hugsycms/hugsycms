import React from 'react';
import { Button, Card } from 'antd';
import { get, isEmpty } from 'lodash';
import PermissionSelect from '@/components/selects/PermissionSelect';
import './index.less';

interface IProps {
  onSaveMenuPermission?: (value: any[]) => void;
  role?: any;
}

export default class MenuPermissionCard extends React.PureComponent<IProps> {
  state = {
    checkedData: [],
  };

  handleSaveMenu = () => {
    const { onSaveMenuPermission } = this.props;
    const { checkedData } = this.state;
    onSaveMenuPermission && onSaveMenuPermission(checkedData);
  };

  handleChange = (checkedData: any[]) => {
    this.setState({ checkedData });
  };

  renderTitle = () => {
    const { role } = this.props;

    return (
      <div className={'role-permission-card__header'}>
        <div>菜单/权限</div>
        <Button type="primary" onClick={this.handleSaveMenu} disabled={isEmpty(role)}>
          保存
        </Button>
      </div>
    );
  };

  render() {
    const { role } = this.props;

    return (
      <div className="role-permission-card">
        <Card
          size="small"
          title="菜单/权限"
          extra={
            <Button type="primary" onClick={this.handleSaveMenu} disabled={isEmpty(role)}>
              保存
            </Button>
          }
        >
          <PermissionSelect
            value={get(role, 'permissions')}
            defaultExpandAll={false}
            disabled={isEmpty(role)}
            onChange={this.handleChange}
          />
        </Card>
      </div>
    );
  }
}
