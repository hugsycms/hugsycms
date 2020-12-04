import React from 'react';

//
// don't need auth
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
    name: 'menu.503',
    parentid: 0,
    isMenu: false,
    active: null,
  },
];

//
// routes
export const routesMapping =  {
  //
  // Dashboard
  '/': React.lazy(() => import('@/pages/welcome')),
  '/welcome': React.lazy(() => import('@/pages/welcome')),
  '/503': React.lazy(() => import('@/pages/welcome/503')),

  //
  // system
  '/system/user': React.lazy(() => import('@/pages/system/users')),
  '/system/menu': React.lazy(() => import('@/pages/system/permissions')),
  '/system/role': React.lazy(() => import('@/pages/system/roles')),

  //
  // demo 
  '/demo1/list': React.lazy(() => import('@/pages/demo1/list')),
  '/demo2/list': React.lazy(() => import('@/pages/demo2/list')),
  '/demo3/list': React.lazy(() => import('@/pages/demo3/list')),
  '/demo3/add': React.lazy(() => import('@/pages/demo3/edit')),
  '/demo3/edit': React.lazy(() => import('@/pages/demo3/edit')),
  '/exception/403': React.lazy(() => import('@/pages/system/exception/403')),
  '/exception/404': React.lazy(() => import('@/pages/system/exception/404')),
  '/exception/500': React.lazy(() => import('@/pages/system/exception/500')),
};


export default {
    omitRoutes,
    routesMapping
}
