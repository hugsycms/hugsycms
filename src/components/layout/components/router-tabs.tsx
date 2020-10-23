import React from 'react';
import { map, get, last, compact, isEmpty } from 'lodash';
import { Dropdown, Menu } from 'antd';
import { CustomIcon } from '@/components/general-components/custom-icon';
import { connect } from 'react-redux';
import TabButton, { TabIProps } from './tab-button';
import { withRouter } from 'react-router-dom';
import { updateTabs, deleteTab, deleteAllTabs } from '@/lib/redux/action/tabs';
import './router-tabs.less';

interface IProps {
  style?: any;
  dispatch?: any;
  tabs: {
    tabsMapping?: any;
  };
  queryStr?: any;
  path?: string;
}

export class RouterTabs extends React.Component<IProps> {
  handleClick = async (tabKey: any) => {
    const { tabs, updateTabs, history } = this.props;
    const { tabsMapping } = tabs;
    const queryStr = get(tabsMapping, `${tabKey}.search`);
    const asPath = `${get(tabsMapping, `${tabKey}.path`)}${queryStr}`;
    history.push(asPath, asPath);
    await updateTabs(get(tabsMapping, tabKey));
    (document.getElementById(tabKey) as HTMLElement).scrollIntoView();
  };

  handleCloseTab = async (tabKey: any) => {
    const { tabs, deleteTab, keepAliveProviderRef } = this.props;
    await deleteTab(tabKey);
    const newTabs = compact(
      map(get(tabs, 'tabs'), (item: TabIProps) => {
        if (item.key !== tabKey) {
          return item;
        }
        return null;
      }),
    );
    const lastQuery = get(last(newTabs), 'search');
    const { history } = this.props;
    history.push(`${get(last(newTabs), 'key')}${isEmpty(lastQuery) ? '' : lastQuery}`);
    const { path, search } = get(tabs, `tabsMapping.${tabKey}`);
    keepAliveProviderRef?.removeCache(`${path}.name.${search}`);
  };

  handleCloseAllTab = async () => {
    const { deleteAllTabs, history, keepAliveProviderRef, tabs } = this.props;
    const needRemovedCacheKeys: any = [];
    map(get(tabs, 'tabsMapping'), (tab) => {
      const { path, search } = tab;
      if (path !== '/') {
        needRemovedCacheKeys.push(`${path}.name.${search}`);
      }
    });
    history.push('/');
    await deleteAllTabs();
    keepAliveProviderRef?.removeCache(needRemovedCacheKeys);
  };

  renderTabMenu = () => {
    const { tabs } = this.props;
    return (
      <Menu selectedKeys={[get(tabs, 'activeKey')]}>
        <Menu.Item
          key="/"
          onClick={() => {
            this.handleClick('/');
          }}
        >
          Dashboard
        </Menu.Item>
        {map(get(tabs, 'tabs')?.slice(1), (tab, index) => {
          return (
            <Menu.Item
              key={tab.key}
              onClick={() => {
                this.handleClick(tab.key);
              }}
            >
              {tab.title}
            </Menu.Item>
          );
        })}
        <Menu.Divider />
        <Menu.Item key="close" onClick={this.handleCloseAllTab}>
          Close All
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { tabs, location } = this.props;
    return (
      <div className="routertabs">
        <div className="routertabs-btns">
          {map(get(tabs, 'tabs'), (tab: TabIProps, index) => {
            return (
              <TabButton
                key={tab.key}
                tabKey={tab.key}
                closable={tab.closable}
                isActive={get(location, 'pathname') === tab.path}
                title={tab.title}
                onClick={this.handleClick}
                onClose={this.handleCloseTab}
              />
            );
          })}
        </div>
        {/* <div className="routertabs-separator" /> */}
        <Dropdown
          className="routertabs-dropdown"
          overlayClassName="routertabs-overlay"
          overlay={this.renderTabMenu}
          trigger={['click']}
        >
          {/* <DownOutlined title="展开" /> */}
          <CustomIcon type="icon-down" style={{ fontSize: '18px' }} />
        </Dropdown>
      </div>
    );
  }
}

export const mapDisPathchToProps = { updateTabs, deleteTab, deleteAllTabs };

export default connect(
  ({ tabs }) => ({
    tabs,
  }),
  mapDisPathchToProps,
)(withRouter(RouterTabs));
