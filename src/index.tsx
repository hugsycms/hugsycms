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
import store from 'store';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'document.contains';
import './global.less';

const singlePages = ['/login', '/single'];

export default class Index extends React.Component {
  keepAliveProviderRef: any;

  constructor(props) {
    super(props);
    const language = store.get('language') || 'en_US';
    const resources = {
      en_US: {
        translation: require('@/lib/config/language/en_US.json'),
      },
      zh_CN: {
        translation: require('@/lib/config/language/zh_CN.json'),
      },
    };
    i18n.use(initReactI18next).init({
      resources,
      lng: language,
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });
    let languagePackage = enUS;
    switch (language) {
      case 'en_US':
        languagePackage = enUS;
        break;
      case 'zh_CN':
        languagePackage = zhCN;
        break;
      default:
        break;
    }
    this.state = {
      isRenderApp: false,
      language,
      languagePackage,
    };
  }

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
    const { isRenderApp, language, languagePackage } = this.state;
    return (
      <Provider store={reduxStore}>
        <Translation>
          {(t) => {
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
                    {isRenderApp && <App language={language} keepAliveProviderRef={this.keepAliveProviderRef} />}
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
