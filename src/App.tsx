import React, { Component, Suspense } from 'react';
import { APP_CONFIG } from '@/lib/config/constants';
import { compact, get, isUndefined, map } from 'lodash';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import CustomSpin from './components/general-components/custom-spin';
import { routesMapping } from '@/lib/routes';
import { Route } from 'react-router-dom';
import Header from './components/layout/header';
import Sider from './components/layout/sider';
import RouterTabs from './components/layout/components/router-tabs';
import { updateTabs } from '@/lib/redux/action/tabs';
import { updateCollapsed } from '@/lib/redux/action/system';
import queryString from 'query-string';
import ErrorBoundary from './lib/error-boundary';
import NoPermission from '@/pages/system/exception/403';
import { KeepAlive } from 'react-keep-alive-pro';
import PageNotFound from './pages/system/exception/404';
import ResizeContainer from 'react-container-dimensions';
import withAuth from './lib/auth/with-auth';

const HEADER_HEIGHT = 48;
const TAB_BUTTON_HEIGHT = 36;
const FOOT_HEIGHT = 31;

export class App extends Component<any, any> {
  caches: any[];

  constructor(props: any) {
    super(props);
    const { location } = this.props;

    this.caches = [];

    this.state = {
      path: get(location, 'pathname'),
      queryStr: get(location, 'search'),
    };
  }

  componentDidMount() {
    const { updateTabs, user, location } = this.props;
    const tab = get(user, `permissionsMapping.${location.pathname}`);
    if (!tab) return;
    updateTabs({
      title: get(tab, 'name'),
      key: get(tab, 'key'),
      path: get(tab, 'key'),
      search: location.search,
      lastSearch: location.search,
      closable: get(tab, 'key') !== '/',
    });
    this.setState({
      queryStr: location.search,
      path: location.pathname,
    });
  }

  componentDidUpdate(prevProps) {
    const { location } = prevProps;
    const { location: nextLocation, keepAliveProviderRef } = this.props;
    // 记录已缓存的 key
    if (this.caches.indexOf(`${nextLocation.pathname}.name.${nextLocation.search}`) === -1) {
      this.caches.push(`${nextLocation.pathname}.name.${nextLocation.search}`);
    }
    const path = `${location.pathname}${location.search}`;
    const nextPath = `${nextLocation.pathname}${nextLocation.search}`;
    if (path !== nextPath) {
      this.caches = compact(
        map(this.caches, (cache) => {
          if (isUndefined(cache.split('?')[1])) {
            return cache;
          }
          if (cache.indexOf(nextLocation.pathname) > -1 && cache.split('?')[1] !== nextLocation.search.slice(1)) {
            keepAliveProviderRef?.removeCache(cache);
            return;
          }
          return cache;
        }),
      );
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { location, tabs } = this.props;
    const { location: nextLocation } = nextProps;
    const path = `${location.pathname}${location.search}`;
    const nextPath = `${nextLocation.pathname}${nextLocation.search}`;
    if (path !== nextPath) {
      const { updateTabs, user } = this.props;
      const nextTab = get(user, `permissionsMapping.${nextLocation.pathname}`);
      if (!nextTab) return;
      updateTabs({
        title: get(nextTab, 'name'),
        key: get(nextTab, 'key'),
        path: get(nextTab, 'key'),
        search: nextLocation.search,
        lastSearch: get(tabs, `tabsMapping.${nextTab.key}.search`),
        closable: get(nextTab, 'key') !== '/',
      });
      this.setState({
        queryStr: nextLocation.search,
        path: nextLocation.pathname,
      });
    }
  }

  toggle = () => {
    const { updateCollapsed, system } = this.props;
    updateCollapsed(!system.collapsed);
  };

  /* istanbul ignore next */ renderComponent = () => {
    const {
      tabs: { tabsMapping },
      user: { permissionsMapping },
    } = this.props;
    const { queryStr, path: locationPath } = this.state;

    return map(tabsMapping, (tab, path) => {
      if (!get(routesMapping, locationPath)) {
        return <PageNotFound />;
      }
      if (get(permissionsMapping, locationPath)) {
        const Component = get(routesMapping, path);
        return (
          <Route
            key={path}
            exact
            path={path}
            render={(props) => {
              document.title =
                `${APP_CONFIG.APP_INDEX_TITLE} - ${get(permissionsMapping, `${path}.name`)}` ||
                get(permissionsMapping, `${path}.name`);
              return (
                <KeepAlive name={`${path}.name.${get(tab, 'search')}`}>
                  <div className="keep-alive-wrapper">
                    <ResizeContainer>
                      {(containerProps) => {
                        return (
                          <Suspense fallback={<CustomSpin />}>
                            <Component
                              {...props}
                              {...this.props}
                              containerProps={containerProps}
                              routerPath={path}
                              routerQuery={queryString.parse(queryStr)}
                            />
                          </Suspense>
                        );
                      }}
                    </ResizeContainer>
                  </div>
                </KeepAlive>
              );
            }}
          />
        );
      } else {
        return <NoPermission />;
      }
    });
  };

  render() {
    const { user, tabs, system, keepAliveProviderRef } = this.props;

    return (
      <Layout className="global-layout">
        <Header {...this.props} user={user} collapsed={system.collapsed} onToggle={this.toggle} />
        <Layout>
          <Sider {...this.props} collapsed={system.collapsed} user={user} tabs={tabs} onToggle={this.toggle} />
          <Layout.Content className="global-layout-content">
            <div className="global-layout-content-tabs">
              <RouterTabs {...this.state} keepAliveProviderRef={keepAliveProviderRef} />
            </div>
            <ErrorBoundary>
              <div
                id="global-layout-content-child"
                className="global-layout-content-child"
                style={{ height: `calc(100vh - ${HEADER_HEIGHT}px - ${TAB_BUTTON_HEIGHT}px - ${FOOT_HEIGHT}px)` }}
              >
                {this.renderComponent()}
              </div>
            </ErrorBoundary>
          </Layout.Content>
        </Layout>
        <Layout.Footer className="global-layout-footer">
          {APP_CONFIG.COPYRIGHT}
          {APP_CONFIG.VERSION}
        </Layout.Footer>
      </Layout>
    );
  }
}

// @ts-ignore
export default connect(({ tabs, system }) => ({ tabs, system }), {
  updateTabs,
  updateCollapsed,
})(withAuth(App));
