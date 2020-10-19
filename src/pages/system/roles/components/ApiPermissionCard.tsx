import React from 'react';
import { Button, Card } from 'antd';
import { get, isEmpty } from 'lodash';
import ApiPermissionSelect from '@/components/selects/ApiPermissionSelect';
import './index.less';

interface IProps {
  onSaveApiPermission?: (value: any[]) => void;
  role?: any;
}

export default class MenuPermissionCard extends React.PureComponent<IProps> {
  state = {
    checkedData: [],
  };

  handleSaveApiPermission = () => {
    const { onSaveApiPermission } = this.props;
    const { checkedData } = this.state;
    if (!isEmpty(checkedData)) {
      onSaveApiPermission && onSaveApiPermission(checkedData);
    }
  };

  handleChange = (checkedData: any[]) => {
    this.setState({
      checkedData,
    });
  };

  renderTitle = () => {
    const { role } = this.props;

    return (
      <div className={'role-permission-card__header'}>
        <div>API权限</div>
        <Button type="primary" onClick={this.handleSaveApiPermission} disabled={isEmpty(role)}>
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
          title="API权限"
          extra={
            <Button type="primary" onClick={this.handleSaveApiPermission} disabled={isEmpty(role)}>
              保存
            </Button>
          }
        >
          <ApiPermissionSelect value={get(role, 'authorities')} disabled={isEmpty(role)} onChange={this.handleChange} />
        </Card>
      </div>
    );
  }
}
