import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import { get, map, omit } from 'lodash';
import request from '@/lib/request';

export const formatMenu = (permission) => ({
  ...permission,
  name: window.t(permission.name),
});

export default (props: any) => {
  const [menus, setMenus] = useState();

  const transferMenus = (menus: any, parentid = 0) => {
    const temp: any = [];
    map(menus, (item) => {
      if (item.parentid === parentid) {
        item.title = item.name;
        item.value = item.id;
        item.children = transferMenus(menus, item.id);
        temp.push({ ...omit(item, 'key') });
      }
    });
    return temp;
  };

  useEffect(() => {
    (async () => {
      const newMenus = transferMenus(
        map(get(await request.get('/api/mock/permissions/all?type.equals=menu'), 'data'), formatMenu),
      );
      setMenus([{ id: 0, value: 0, title: window.t('common.no-parents-tip'), children: newMenus }]);
    })();
  }, []);

  return (
    <TreeSelect
      treeDefaultExpandAll
      placeholder={window.t('common.please-select')}
      allowClear
      {...props}
      treeData={menus}
      dropdownMatchSelectWidth={300}
    />
  );
};
