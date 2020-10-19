import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from '@/lib/redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Login from './pages/system/login';
import { APP_CONFIG } from './lib/config/constants';
import { Provider as KeepAliveProvider } from 'react-keep-alive-pro';
import 'document.contains';
import './global.less';

const singlePages = ['/login', '/single'];

export default class Index extends React.Component {
  state = {
    isRenderApp: false,
  };

  keepAliveProviderRef: any;

  componentDidMount() {
    if (singlePages.indexOf(window.location.pathname) === -1) {
      this.setState({
        isRenderApp: true,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (singlePages.indexOf(window.location.pathname) === -1) {
      return {
        isRenderApp: true,
      };
    }
    return null;
  }

  /* istanbul ignore next */ render() {
    const { isRenderApp } = this.state;
    return (
      <Provider store={reduxStore}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter>
            <KeepAliveProvider
              ref={(ref) => {
                this.keepAliveProviderRef = ref;
              }}
              max={30}
            >
              <Route
                path="/login"
                render={() => {
                  document.title = `${APP_CONFIG.APP_INDEX_TITLE} - 登录`;
                  return (
                    <Login
                      loginCallback={(loginResult: boolean) => {
                        this.setState({
                          isRenderApp: loginResult,
                        });
                      }}
                    />
                  );
                }}
              />
              {isRenderApp && <App keepAliveProviderRef={this.keepAliveProviderRef} />}
            </KeepAliveProvider>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    );
  }
}
