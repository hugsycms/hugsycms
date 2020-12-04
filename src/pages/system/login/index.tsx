import React, { Component } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@/components/general-components/custom-icon';
import { APP_CONFIG } from '@/lib/config/constants';
import { doLogin } from './methods';
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import store from 'store';
import './index.less';

export class Login extends Component {
  state = {
    loading: false,
  };

  onFinish = async (values: any) => {
    const { location, history, doLogin, loginCallback } = this.props;
    this.setState({ loading: true });
    const { redirectTo } = queryString.parse(get(location, 'search'));
    try {
      const { expired } = await doLogin(values);
      setTimeout(() => {
        message.error(window.t('common.expired-login-tip'));
        setTimeout(() => {
          window.location.href = '/login';
          store.clearAll();
        }, 1000);
      }, expired * 1000);
      message.success(window.t('common.login-tip'));
      loginCallback(true);
      history.push(redirectTo || '/');
    } catch (error) {
      message.error(window.t('common.login-failed-tip'));
      loginCallback(false);
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <div className="login">
        <header className="login-header">
          <div className="login-header__logo">
            <img className="login-header__logo-icon" alt="logo" src={APP_CONFIG.LOGO} />
            <h3 className="login-header__logo-title">{APP_CONFIG.TITLE}</h3>
          </div>
        </header>
        <main className="login-main">
          <div className="login-main__block">
            <h3 className="login-main__block-title">{window.t('login.tip')}</h3>
            <Form onFinish={this.onFinish} initialValues={[{ username: 'admin' }, { password: 'admin' }]}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: window.t('login.please-entry-username'),
                  },
                ]}
              >
                <Input
                  allowClear
                  size="large"
                  prefix={<UserOutlined className="login-main-center-icon" />}
                  placeholder={window.t('login.please-entry-username')}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: window.t('login.please-entry-password'),
                  },
                ]}
              >
                <Input.Password
                  allowClear
                  size="large"
                  prefix={<LockOutlined className="login-main-center-icon" />}
                  placeholder={window.t('login.please-entry-password')}
                />
              </Form.Item>
              <Form.Item className="login-main__block-actions">
                <Button
                  className="login-main__block-actions_login"
                  type="primary"
                  size="large"
                  loading={loading}
                  htmlType="submit"
                >
                  {window.t('login.login')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
        <footer className="login-footer">
          {APP_CONFIG.COPYRIGHT} &nbsp;
          {APP_CONFIG.VERSION}
        </footer>
      </div>
    );
  }
}

export default connect(() => ({}), { doLogin })(withRouter(Login));
