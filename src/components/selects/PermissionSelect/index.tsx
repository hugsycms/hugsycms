import React from 'react';
import { Tree } from 'antd';
import { map, isEmpty, get, concat, filter, compact, keys, keyBy, cloneDeep, indexOf } from 'lodash';
import request from '@/lib/request';

export default class PermissionSelect extends React.Component {
  state = {
    treeData: [],
    checkedData: [],
    isUpdated: false,
  };

  async componentDidMount() {
    const { value } = this.props;
    const nativePermissions = get(await request.get('/api/mock/permissions/all'), 'data');
    const treeData = this.transferMenus(cloneDeep(nativePermissions));
    const baseOmitKeys: any[] = this.getIsNotSelectedParentKeys(nativePermissions, value);
    const omitKeys = this.omitKeysByBaseKeys(baseOmitKeys, nativePermissions);
    this.setState({ treeData, checkedData: filter(value, (key) => omitKeys.indexOf(key) === -1) });
  }

  handleChange = (checked: any[], e: any) => {
    const { onChange } = this.props;
    const halfChecked = get(e, 'halfCheckedKeys');
    onChange && onChange(concat(halfChecked, checked));
  };

  transferMenus = (menus: any, parentid = 0) => {
    const temp: any = [];
    map(menus, (item) => {
      if (item.parentid === parentid) {
        item.title = item.name;
        item.key = item.id;
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

  // TODO: 目前仅过滤两层，是否可以递归？
  omitKeysByBaseKeys = (baseKeys: any[], nativePermissions: any) => {
    const nativePermissionsMapping = keyBy(nativePermissions, 'id');
    map(baseKeys, (key) => {
      if (get(nativePermissionsMapping, `${key}.parentid`) !== 0) {
        baseKeys.push(get(nativePermissionsMapping, `${key}.parentid`));
      }
    });
    return baseKeys;
  };

  getIsNotSelectedParentKeys = (nativePermissions: any[], selectedKeys: any) => {
    const omitParentKeys: any = [];
    const parentKeys = compact(
      Array.from(
        new Set(
          map(nativePermissions, (permission) => {
            if (get(permission, 'parentid') !== 0) {
              return get(permission, 'parentid');
            }
          }),
        ),
      ),
    );
    map(parentKeys, (parentKey) => {
      if (indexOf(selectedKeys, parentKey) > -1) {
        const childrens = filter(nativePermissions, (permission) => get(permission, 'parentid') === parentKey);
        const childrenKeys = keys(keyBy(childrens, 'id'));
        for (let index = 0; index < childrenKeys.length; index++) {
          const key = Number(childrenKeys[index]);
          if (indexOf(selectedKeys, key) === -1) {
            omitParentKeys.push(parentKey);
            break;
          }
        }
      }
    });

    return omitParentKeys;
  };

  render() {
    const { disabled } = this.props;
    const { treeData, checkedData } = this.state;
    if (treeData.length > 0) {
      return (
        <Tree
          treeData={treeData}
          defaultCheckedKeys={checkedData}
          defaultExpandAll
          checkable
          disabled={disabled}
          onCheck={this.handleChange}
          {...this.props}
        />
      );
    }
    return <span>权限加载中...</span>;
  }
}
