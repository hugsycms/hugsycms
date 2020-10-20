const router = require('koa-router')();
const { keyBy, get, filter } = require('lodash');
const Mock = require('mockjs');
const permissions = [
  {
    id: 2,
    type: 'menu',
    key: '/system',
    name: '系统管理',
    parentid: 0,
    icon: 'icon-setting',
    sort: 999,
    active: true,
  },
  {
    id: 3,
    type: 'menu',
    key: '/system/user',
    name: '用户管理',
    parentid: 2,
    icon: '',
    sort: 3,
    active: null,
  },
  {
    id: 4,
    type: 'menu',
    key: '/system/menu',
    name: '菜单管理',
    parentid: 2,
    icon: '',
    sort: 4,
    active: null,
  },
  {
    id: 5,
    type: 'menu',
    key: '/system/role',
    name: '角色管理',
    parentid: 2,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 6,
    type: 'menu',
    key: '/demo',
    name: '三种页面',
    parentid: 0,
    icon: 'icon-unorderedlist',
    sort: 5,
    active: null,
  },
  {
    id: 7,
    type: 'menu',
    key: '/demo1/list',
    name: '弹窗编辑',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 8,
    type: 'menu',
    key: '/demo2/list',
    name: '表格内编辑',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 9,
    type: 'menu',
    key: '/demo3/list',
    name: '新页面编辑',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 10,
    type: 'page',
    key: '/demo3/add',
    name: '新页面编辑-添加',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 11,
    type: 'page',
    key: '/demo3/edit',
    name: '新页面编辑-修改',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
];

const roles = [
  {
    id: 1,
    code: 'ADMIN',
    name: '超级管理员',
    description: '所有权限',
    permissions,
  },
  {
    id: 2,
    code: 'DEMO',
    name: '普通用户',
    description: '部分权限',
    permissions: permissions.slice(5),
  },
];

const result = {
  ok: (data) => {
    return {
      code: 1,
      message: 'success',
      data,
    };
  },
};
router.post('/api/mock/authenticate', (ctx) => {
  ctx.body = result.ok({
    loginTime: Date.parse(new Date()) / 1000,
    expired: 3600,
    token: 'eyJhbGciOiJIUzUxMiJ9.eyUlTU0lPTixST0xFX1NFTEVDVF9QTEFOTE9HLFJPTEVfU0VMRUNUX1BSRUdOQU5DWLRQ4w',
  });
});

router.get('/api/mock/users/admin', (ctx) => {
  ctx.body = result.ok({
    id: 3,
    username: 'admin',
    nickname: 'Administrator',
    email: 'admin@localhost',
    avatar: Mock.Random.image('50x50'),
    activated: true,
    createdBy: 'system',
    createdDate: null,
    roles: [
      {
        id: 1,
        name: 'ADMIN',
        nickname: '超级管理员',
        description: 'master权限',
        permissions: [
          {
            id: 2,
            type: 'menu',
            key: '/system',
            name: '系统管理',
            parentid: 0,
            icon: 'icon-setting',
            sort: 999,
            active: true,
          },
          {
            id: 3,
            type: 'menu',
            key: '/system/user',
            name: '用户管理',
            parentid: 2,
            icon: '',
            sort: 3,
            active: null,
          },
          {
            id: 4,
            type: 'menu',
            key: '/system/menu',
            name: '菜单管理',
            parentid: 2,
            icon: '',
            sort: 4,
            active: null,
          },
          {
            id: 5,
            type: 'menu',
            key: '/system/role',
            name: '角色管理',
            parentid: 2,
            icon: '',
            sort: 5,
            active: null,
          },
          {
            id: 6,
            type: 'menu',
            key: '/demo',
            name: '三种页面',
            parentid: 0,
            icon: 'icon-unorderedlist',
            sort: 5,
            active: null,
          },
          {
            id: 7,
            type: 'menu',
            key: '/demo1/list',
            name: '弹窗编辑',
            parentid: 6,
            icon: '',
            sort: 5,
            active: null,
          },
          {
            id: 8,
            type: 'menu',
            key: '/demo2/list',
            name: '表格内编辑',
            parentid: 6,
            icon: '',
            sort: 5,
            active: null,
          },
          {
            id: 9,
            type: 'menu',
            key: '/demo3/list',
            name: '新页面编辑',
            parentid: 6,
            icon: '',
            sort: 5,
            active: null,
          },
          {
            id: 9,
            type: 'page',
            key: '/demo3/add',
            name: '新页面编辑-添加',
            parentid: 6,
            icon: '',
            sort: 5,
            active: null,
          },
          {
            id: 9,
            type: 'page',
            key: '/demo3/edit',
            name: '新页面编辑-修改',
            parentid: 6,
            icon: '',
            sort: 5,
            active: null,
          },
        ],
      },
    ],
  });
});

router.get('/api/mock/users', (ctx) => {
  const data = [];
  for (let index = 0; index < 50; index++) {
    data.push(
      Mock.mock({
        id: index + 1,
        'username|1': Mock.mock('@word'),
        'nickname|1': Mock.mock('@name'),
        'email|1': Mock.mock('@email'),
        'avatar|1': Mock.Random.image('50x50'),
        'activated|boolean': true,
        'createdBy|1': Mock.mock('@name'),
        'createdDate|1': Mock.mock('@date'),
        roles: roles,
      }),
    );
  }
  ctx.body = result.ok({
    total: 50,
    per_page: 10,
    current_page: 1,
    last_page: 5,
    data,
  });
});

router.get('/api/mock/permissions/all', (ctx) => {
  let data = permissions;
  console.log(ctx.query.type);
  if (ctx.query.type === 'menu') {
    data = filter(data, (item) => item.type === 'menu');
  }
  ctx.body = result.ok(data);
});

router.get('/api/mock/permissions/:id', (ctx) => {
  const permission = get(keyBy(permissions, 'id'), ctx.params.id);
  ctx.body = result.ok(permission);
});

router.get('/api/mock/roles/all', (ctx) => {
  ctx.body = result.ok(roles);
});

router.get('/api/mock/roles/:id', (ctx) => {
  const role = get(keyBy(roles, 'id'), ctx.params.id);
  ctx.body = result.ok(role);
});

router.get('/api/mock/tags', (ctx) => {
  const data = [];
  for (let index = 0; index < 99; index++) {
    data.push(
      Mock.mock({
        id: index + 1,
        'name|1': Mock.mock('@word'),
        'sort|1-99': 1,
      }),
    );
  }
  ctx.body = result.ok({
    total: 99,
    per_page: 10,
    current_page: 1,
    last_page: 10,
    data,
  });
});

router.get('/api/mock/categories', (ctx) => {
  const data = [];
  for (let index = 0; index < 99; index++) {
    data.push(
      Mock.mock({
        id: index + 1,
        'name|1': Mock.mock('@word'),
        'sort|1-99': 1,
      }),
    );
  }
  ctx.body = result.ok({
    total: 99,
    per_page: 10,
    current_page: 1,
    last_page: 10,
    data,
  });
});

router.get('/api/mock/articles', (ctx) => {
  const data = [];
  for (let index = 0; index < 99; index++) {
    data.push(
      Mock.mock({
        id: index + 1,
        'title|1': Mock.mock('@title'),
        'description|1': Mock.mock('@sentence'),
        'content|1': Mock.mock('@paragraph'),
        'sort|1-99': 1,
      }),
    );
  }
  ctx.body = result.ok({
    total: 99,
    per_page: 10,
    current_page: 1,
    last_page: 10,
    data,
  });
});

router.result = result;
module.exports = router;
