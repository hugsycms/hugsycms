import React from 'react';

//
// 绕过权限认证的菜单
export const omitRoutes = [
  {
    id: 1001,
    type: 'others',
    key: '/',
    name: 'menu.dashboard',
    parentid: 0,
    isMenu: false,
    active: null,
  },
  {
    id: 1002,
    type: 'others',
    key: '/welcome',
    name: 'menu.dashboard',
    parentid: 0,
    isMenu: false,
    active: null,
  },
  {
    id: 1003,
    type: 'others',
    key: '/503',
    name: '服务器内部错误',
    parentid: 0,
    isMenu: false,
    active: null,
  },
];

//
// 路由列表
export const routesMapping =  {
  //
  // Dashboard
  '/': React.lazy(() => import('@/pages/welcome')),
  '/welcome': React.lazy(() => import('@/pages/welcome')),
  '/503': React.lazy(() => import('@/pages/welcome/503')),

  //
  // 系统管理
  '/system/user': React.lazy(() => import('@/pages/system/users')),
  '/system/menu': React.lazy(() => import('@/pages/system/menus')),
  '/system/role': React.lazy(() => import('@/pages/system/roles')),

  //
  // demo 
  '/demo1/list': React.lazy(() => import('@/pages/demo1/list')),
  '/demo2/list': React.lazy(() => import('@/pages/demo2/list')),
  '/demo3/list': React.lazy(() => import('@/pages/demo3/list')),
  '/demo3/add': React.lazy(() => import('@/pages/demo3/edit')),
  '/demo3/edit': React.lazy(() => import('@/pages/demo3/edit')),

};


export default {
    omitRoutes,
    routesMapping
}
