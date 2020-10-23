import React from 'react';
import App from './app';
import { Provider } from 'react-redux';
import reduxStore from '@/lib/redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import Login from './pages/system/login';
import { APP_CONFIG } from './lib/config/constants';
import { Provider as KeepAliveProvider } from 'react-keep-alive-pro';
import { Translation } from 'react-i18next';
import 'document.contains';
import './global.less';
import store from 'store';

const singlePages = ['/login', '/single'];

export default class Index extends React.Component {
  state = {
    isRenderApp: false,
    language: 'en_US',
    languagePackage: enUS,
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

  handleChangeLanguage = (targetLanguage: string, i18n: any) => {
    let { languagePackage } = this.state;
    console.log(targetLanguage);
    switch (targetLanguage) {
      case 'en_US':
        languagePackage = enUS;
        break;
      case 'zh_CN':
        languagePackage = zhCN;
        break;
      default:
        break;
    }
    i18n.changeLanguage(targetLanguage);
    store.set('language', targetLanguage);
    this.setState({
      language: targetLanguage,
      languagePackage,
    });
  };

  /* istanbul ignore next */ render() {
    const { isRenderApp, language, languagePackage } = this.state;
    return (
      <Provider store={reduxStore}>
        <Translation>
          {(t, { i18n }) => {
            window.t = t;
            return (
              <ConfigProvider locale={languagePackage}>
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
                        document.title = `${APP_CONFIG.APP_INDEX_TITLE} - ${t('login.head')}`;
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
                    {isRenderApp && (
                      <App
                        onChangeLanguage={(targetLanguage: string) => {
                          this.handleChangeLanguage(targetLanguage, i18n);
                        }}
                        language={language}
                        keepAliveProviderRef={this.keepAliveProviderRef}
                      />
                    )}
                  </KeepAliveProvider>
                </BrowserRouter>
              </ConfigProvider>
            );
          }}
        </Translation>
      </Provider>
    );
  }
}
