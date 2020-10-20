import React, { Component } from 'react';
import { Layout, Dropdown, message, Menu, Select, Divider, Button } from 'antd';
import { isUndefined, get } from 'lodash';
import store from 'store';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@/components/GeneralComponents/CustomIcon';
import { APP_CONFIG } from '@/lib/config/constants';
import { doLogout } from './reducer';
import ResetPasswordModal from './components/ResetPasswordModal';
import CustomSpin from '../GeneralComponents/CustomSpin';
import light from '@/assets/less/light';
import dark from '@/assets/less/dark';
import { width } from './sider';
import './header.less';

interface IProps {
  onToggle: any;
  collapsed: boolean;
  user?: any;
}

export default class Header extends Component<IProps> {
  state = {
    resetModalVisible: false,
    theme: 'default',
    themeProcessing: false,
  };

  componentDidMount() {
    this.handleChangeTheme(store.get('theme') || 'default');
    this.handleChangeLanguage(store.get('language') || 'en_US');
  }

  handleLogout = () => {
    doLogout();
    message.success('退出登录成功');
    window.location.href = '/login';
  };

  renderTrigger = () => {
    const { onToggle, collapsed } = this.props;
    return (
      <Button
        type="text"
        shape="round"
        size="large"
        icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        onClick={onToggle}
      ></Button>
    );
  };

  handleChangeLanguage = (language) => {
    const { onChangeLanguage } = this.props;
    onChangeLanguage && onChangeLanguage(language);
  };

  handleChangeTheme = (theme: string) => {
    this.setState({
      themeProcessing: true,
    });
    store.set('theme', theme);
    this.setState({
      theme,
    });
    switch (theme) {
      case 'default':
        document.getElementById('less:color')?.remove();
        break;
      case 'light':
        window.less.modifyVars(light);
        break;
      case 'dark':
        window.less.modifyVars(dark);
        break;
      default:
        document.getElementById('less:color')?.remove();
        break;
    }
    this.setState({
      themeProcessing: false,
    });
  };

  render() {
    const { resetModalVisible, themeProcessing, theme } = this.state;
    const { user, collapsed } = this.props;
    const language = store.get('language') || 'en_US';
    return (
      <Layout.Header className="global-container-layout_header">
        {themeProcessing ? (
          <CustomSpin />
        ) : (
          <>
            <div className="global-container-layout_header-left" style={{ minWidth: collapsed ? width : '' }}>
              <div className="global-container-layout_header-left-toggle">{this.renderTrigger()}</div>
              <Divider type="vertical" />
              <span className="global-container-layout_header-left-logo-title">{APP_CONFIG.TITLE}</span>
            </div>
            <div className="global-container-layout_header-right">
              {!isUndefined(get(user, 'basicInfo')) && (
                <Dropdown
                  className="global-container-layout_header-right-dropdown"
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <Select
                          size="small"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                          }}
                          onChange={this.handleChangeTheme}
                          value={theme}
                        >
                          <Select.Option value="default">默认主题</Select.Option>
                          <Select.Option value="light">暖色主题</Select.Option>
                          {/* <Select.Option value="dark">黑色主题</Select.Option> */}
                        </Select>
                      </Menu.Item>
                      <Menu.Item>
                        <Select
                          size="small"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                          }}
                          onChange={this.handleChangeLanguage}
                          value={language}
                        >
                          <Select.Option value="en_US">English</Select.Option>
                          <Select.Option value="zh_CN">中文</Select.Option>
                        </Select>
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          this.setState({
                            resetModalVisible: true,
                          });
                        }}
                      >
                        修改密码
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item onClick={this.handleLogout}>退出登录</Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <div>
                    <img
                      className="global-container-layout_header-right-dropdown-avatar"
                      src={get(user, 'basicInfo.avatar')}
                      alt="avatar"
                    />
                    <span className="global-container-layout_header-right-dropdown-name">
                      {get(user, 'basicInfo.nickname')}
                    </span>
                  </div>
                </Dropdown>
              )}
            </div>
            {resetModalVisible && (
              <ResetPasswordModal
                visible={resetModalVisible}
                primaryKey={get(user, 'basicInfo.username')}
                onCancel={() => {
                  this.setState({
                    resetModalVisible: false,
                  });
                }}
              />
            )}
          </>
        )}
      </Layout.Header>
    );
  }
}
