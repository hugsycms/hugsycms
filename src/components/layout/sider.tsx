import React from 'react';
import { Menu, Layout } from 'antd';
import { UnorderedListOutlined, CustomIcon } from '@/components/general-components/custom-icon';
import { map, get, isEmpty, concat, filter, sortBy, keyBy, debounce } from 'lodash';
import { omitRoutes } from '@/lib/routes';
import { updateTabs } from '@/lib/redux/action/tabs';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { History, Location } from 'history';
import { TabIProps } from '@/components/layout/components/tab-button';
import './sider.less';
import 'react-perfect-scrollbar/dist/css/styles.css';

export const collapsedWidth = 61;
export const width = 228;

interface IProps {
  collapsed: boolean;
  user?: any;
  tabs?: any;
  onToggle?: () => void;
  history: History;
  updateTabs: (data: TabIProps) => any;
  location: Location;
}

interface IState {
  activeKey: string;
  openKeys: any[];
}

export class Sider extends React.Component<IProps, IState> {
  state = {
    activeKey: '',
    openKeys: [],
  };

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const { tabs, user } = nextProps;
    const activeKey = get(tabs, 'activeKey');
    if (prevState.activeKey !== activeKey) {
      const permissionsMapping = get(user, 'permissionsMapping');
      const permissions = keyBy(get(user, 'permissions'), 'id');
      const activeParentId = get(permissionsMapping, `${activeKey}.parentid`);
      const activeParent = get(permissions, activeParentId);
      return {
        activeKey,
        openKeys: [get(activeParent, 'key')],
      };
    }

    return null;
  }

  handleMenuClick = (menu: any) => async () => {
    const { history, updateTabs, location } = this.props;
    await updateTabs({
      title: get(menu, 'name'),
      key: get(menu, 'key'),
      path: get(menu, 'key'),
      search: get(location, 'search'),
      closable: true,
    });
    history.push(menu.key);
    (document.getElementById(get(menu, 'key')) as HTMLElement).scrollIntoView();
  };

  getMenus = () => {
    const { user } = this.props;
    const menus = filter(get(user, 'permissions'), (item) => get(item, 'type') === 'menu');
    const omitMenus = filter(omitRoutes, (omitMenu: any) => get(omitMenu, 'isMenu'));
    const menusPermissions = concat(menus, omitMenus);
    return sortBy(menusPermissions, (menu) => get(menu, 'sort'));
  };

  transferMenus = (menus: any, parentid = 0) => {
    const temp: any = [];
    map(menus, (item) => {
      if (item.parentid === parentid) {
        item.title = item.name;
        item.children = this.transferMenus(menus, item.id);
        if (isEmpty(item.children)) {
          item.isLeaf = true;
        } else {
          item.isLeaf = false;
        }
        temp.push(item);
      }
    });
    return temp;
  };

  renderMenu = (menusPermissions: any) => {
    const menuData = this.transferMenus(menusPermissions);

    return map(menuData, (menuItem) => {
      return [this.renderMenuItem(menuItem)];
    });
  };

  renderMenuItem = (menuItem: any) => {
    if (menuItem.children && menuItem.children.length > 0) {
      return (
        <Menu.SubMenu
          icon={get(menuItem, 'icon') ? <CustomIcon type={menuItem.icon} /> : <UnorderedListOutlined />}
          key={menuItem.key}
          popupOffset={[0, 0]}
          title={menuItem.name}
        >
          {map(menuItem.children, (menuChildItem) => {
            const results = [this.renderMenuItem(menuChildItem)];
            return results;
          })}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item
        icon={get(menuItem, 'icon') ? <CustomIcon type={menuItem.icon} /> : undefined}
        key={menuItem.key}
        onClick={this.handleMenuClick(menuItem)}
      >
        {menuItem.name}
      </Menu.Item>
    );
  };

  handleOpenChange = (openKeys: string[]) => {
    this.setState({
      openKeys,
    });
  };

  render() {
    const { activeKey, openKeys } = this.state;
    const { collapsed, onToggle } = this.props;
    const menusPermissions = this.getMenus();
    return (
      <Layout.Sider
        collapsible
        theme="dark"
        breakpoint="lg"
        collapsed={!collapsed}
        trigger={null}
        width={width}
        collapsedWidth={collapsedWidth}
        className="global-container-layout__sider"
        onBreakpoint={onToggle}
      >
        <>
          <PerfectScrollbar
            className="custom-scrollbar"
            options={{ suppressScrollX: true }}
            onSync={debounce((ps) => {
              ps.update();
            }, 600)}
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[activeKey]}
              // openKeys={openKeys}
              onOpenChange={this.handleOpenChange}
            >
              {this.renderMenu(menusPermissions)}
            </Menu>
          </PerfectScrollbar>
        </>
      </Layout.Sider>
    );
  }
}

export default connect(({ tabs, user }) => ({ tabs, user }), { updateTabs })(Sider);
