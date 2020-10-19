import React, { Component } from 'react';
import { Button, Form, Input, message, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@/components/GeneralComponents/CustomIcon';
import { APP_CONFIG } from '@/lib/config/constants';
import { doLogin } from './reducer';
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import store from 'store';
import './index.less';

export class Login extends Component {
  form: any;

  state = {
    loading: false,
  };

  onFinish = async (values: any) => {
    const { location, history, doLogin, loginCallback } = this.props;
    this.setState({ loading: true });
    const { redirectTo } = queryString.parse(get(location, 'search'));
    try {
      await doLogin(values);
      setTimeout(() => {
        message.error('登录状态已过期，请重新登录，系统将在1秒后退出');
        setTimeout(() => {
          window.location.href = '/login';
          store.clearAll();
        }, 1000);
      }, APP_CONFIG.EXPIRE_TIME * 1000);
      message.success('登录成功');
      loginCallback(true);
      history.push(redirectTo || '/');
    } catch (error) {
      message.error('账号密码不匹配，请重试');
      loginCallback(false);
      this.setState({ loading: false });
    }
  };

  onFinishFailed = (errorInfo: any) => {};

  render() {
    const { loading } = this.state;

    return (
      <div className="login">
        <header className="login-header">
          <div className="login-header-logo">
            <img alt="logo" src={APP_CONFIG.LOGO} />
            <h1 className="login-header-logo-title">{APP_CONFIG.TITLE}</h1>
          </div>
          <div className="login-header-extra"></div>
        </header>
        <main className="login-main">
          <div className="login-main-center">
            <h2 className="login-main-center-title">系 统 登 录</h2>
            <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                <Input
                  allowClear
                  size="large"
                  prefix={<UserOutlined className="login-main-center-icon" />}
                  placeholder="请输入用户名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              >
                <Input.Password
                  allowClear
                  size="large"
                  prefix={<LockOutlined className="login-main-center-icon" />}
                  placeholder="请输入密码"
                />
              </Form.Item>
              <div style={{ height: '18px' }} />
              <Form.Item>
                <Button
                  className="login-main-center-login"
                  type="primary"
                  size="large"
                  loading={loading}
                  htmlType="submit"
                  style={{ fontSize: '18px', fontWeight: 'bold' }}
                >
                  登 录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
        <footer className="login-footer">
          {APP_CONFIG.COPYRIGHT}
          {APP_CONFIG.VERSION}
        </footer>
      </div>
    );
  }
}

export default connect(() => ({}), { doLogin })(withRouter(Login));
