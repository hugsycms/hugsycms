import React, { Component } from 'react';
import { Layout, Dropdown, message, Menu, Divider, Button } from 'antd';
import { isUndefined, get } from 'lodash';
import store from 'store';
import {
  BgColorsOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@/components/general-components/custom-icon';
import { APP_CONFIG } from '@/lib/config/constants';
import { doLogout } from './method';
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
  };

  componentDidMount() {
    this.handleChangeTheme({ key: store.get('theme') || 'default' });
  }

  handleLogout = () => {
    doLogout();
    message.success(window.t('common.logout-tip'));
    window.location.href = '/login';
  };

  renderTrigger = () => {
    const { onToggle, collapsed } = this.props;
    return (
      <Button
        type="text"
        shape="round"
        size="large"
        className=""
        icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        onClick={onToggle}
      ></Button>
    );
  };

  handleChangeLanguage = ({ key: language }: any) => {
    store.set('language', language);
    window.location.reload();
  };

  handleChangeTheme = ({ key: theme }: any) => {
    if (!window.less) {
      message.warning(window.t('common.browser-theme-tip'));
      return;
    }
    store.set('theme', theme);
    switch (theme) {
      case 'default':
        document.getElementById('less:color')?.remove();
        break;
      case 'dark':
        window.less.modifyVars(dark);
        break;
      default:
        document.getElementById('less:color')?.remove();
        break;
    }
  };

  render() {
    const { user, collapsed } = this.props;
    const language = store.get('language') || 'en_US';
    const theme = store.get('theme') || 'default';
    return (
      <Layout.Header className="global-container-layout__header">
        <div className="global-container-layout__header-left" style={{ minWidth: collapsed ? width : '' }}>
          <div className="global-container-layout__header-left-toggle">{this.renderTrigger()}</div>
          <Divider type="vertical" />
          <span className="global-container-layout__header-left-title">{APP_CONFIG.TITLE}</span>
        </div>
        <div className="global-container-layout__header-right">
          {!isUndefined(get(user, 'basicInfo')) && (
            <Dropdown
              className="global-container-layout__header-right-self"
              overlay={
                <Menu>
                  <Menu.Item onClick={() => {}}>{window.t('common.account')}</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item onClick={this.handleLogout}>{window.t('common.logout')}</Menu.Item>
                </Menu>
              }
            >
              <div>
                <img
                  className="global-container-layout__header-right-self-avatar"
                  src={get(user, 'basicInfo.avatar')}
                  alt="avatar"
                />
                <span className="global-container-layout__header-right-self-name">
                  {get(user, 'basicInfo.nickname')}
                </span>
              </div>
            </Dropdown>
          )}
          <Dropdown
            className="global-container-layout__header-right-theme"
            overlay={
              <Menu activeKey={theme} onClick={this.handleChangeTheme}>
                <Menu.Item key="default">{window.t('common.theme.default')}</Menu.Item>
                <Menu.Item key="dark">{window.t('common.theme.dark')}</Menu.Item>
              </Menu>
            }
          >
            <div>
              <BgColorsOutlined />
            </div>
          </Dropdown>
          <Dropdown
            className="global-container-layout__header-right-language"
            overlay={
              <Menu activeKey={language} onClick={this.handleChangeLanguage}>
                <Menu.Item key="en_US">🇺🇸 English</Menu.Item>
                <Menu.Item key="zh_CN">🇨🇳 中文</Menu.Item>
              </Menu>
            }
          >
            <div>
              <GlobalOutlined />
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}
