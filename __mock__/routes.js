const router = require('koa-router')();
const { keyBy, get, filter } = require('lodash');
const Mock = require('mockjs');
const permissions = [
  {
    id: 2,
    type: 'menu',
    key: '/system',
    name: 'menu.system',
    parentid: 0,
    icon: 'icon-setting',
    sort: 999,
    active: true,
  },
  {
    id: 3,
    type: 'menu',
    key: '/system/user',
    name: 'menu.system.users',
    parentid: 2,
    icon: '',
    sort: 3,
    active: null,
  },
  {
    id: 4,
    type: 'menu',
    key: '/system/menu',
    name: 'menu.system.menus',
    parentid: 2,
    icon: '',
    sort: 4,
    active: null,
  },
  {
    id: 5,
    type: 'menu',
    key: '/system/role',
    name: 'menu.system.roles',
    parentid: 2,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 6,
    type: 'menu',
    key: '/demo',
    name: 'menu.demo',
    parentid: 0,
    icon: 'icon-appstore',
    sort: 5,
    active: null,
  },
  {
    id: 7,
    type: 'menu',
    key: '/demo1/list',
    name: 'menu.demo.categories',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 8,
    type: 'menu',
    key: '/demo2/list',
    name: 'menu.demo.tags',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 9,
    type: 'menu',
    key: '/demo3/list',
    name: 'menu.demo.articles',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 10,
    type: 'page',
    key: '/demo3/add',
    name: 'menu.demo.articles.create',
    parentid: 6,
    icon: '',
    sort: 5,
    active: null,
  },
  {
    id: 11,
    type: 'page',
    key: '/demo3/edit',
    name: 'menu.demo.articles.edit',
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
    name: 'Super Admin',
    description: 'all permission',
    permissions,
  },
  {
    id: 2,
    code: 'DEMO',
    name: 'Nomal User',
    description: 'some permission',
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
    avatar: Mock.Random.image('30x30'),
    activated: true,
    createdBy: 'admin',
    'createdAt|1': Mock.mock('@date'),
    roles: [
      {
        id: 1,
        name: 'ADMIN',
        nickname: 'Super Admin',
        description: 'all permission',
        permissions,
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
        'avatar|1': Mock.Random.image('30x30'),
        'activated|boolean': true,
        'createdBy|1': Mock.mock('@name'),
        'createdAt|1': Mock.mock('@date'),
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

router.get('/api/mock/users/:username', (ctx) => {
  const data = Mock.mock({
    id: 1,
    'username|1': Mock.mock('@word'),
    'nickname|1': Mock.mock('@name'),
    'email|1': Mock.mock('@email'),
    'avatar|1': Mock.Random.image('30x30'),
    'activated|boolean': true,
    'createdBy|1': Mock.mock('@name'),
    'createdAt|1': Mock.mock('@date'),
    roles: roles,
  });
  ctx.body = result.ok(data);
});

router.get('/api/mock/permissions/all', (ctx) => {
  let data = permissions;
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
        createdBy: 'admin',
        'createdAt|1': Mock.mock('@date'),
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
        createdBy: 'admin',
        'createdAt|1': Mock.mock('@date'),
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
        createdBy: 'admin',
        'createdAt|1': Mock.mock('@date'),
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

router.get('/api/mock/articles/:id', (ctx) => {
  const data = Mock.mock({
    id: ctx.params.id,
    'title|1': Mock.mock('@title'),
    'description|1': Mock.mock('@sentence'),
    'content|1': Mock.mock('@paragraph'),
    'sort|1-99': 1,
    createdBy: 'admin',
    'createdAt|1': Mock.mock('@date'),
  });
  ctx.body = result.ok(data);
});

router.get('/api/mock/tags/:id', (ctx) => {
  const data = Mock.mock({
    id: ctx.params.id,
    'name|1': Mock.mock('@word'),
    'sort|1-99': 1,
    createdBy: 'admin',
    'createdAt|1': Mock.mock('@date'),
  });
  ctx.body = result.ok(data);
});

router.get('/api/mock/categories/:id', (ctx) => {
  const data = Mock.mock({
    id: ctx.params.id,
    'name|1': Mock.mock('@word'),
    'sort|1-99': 1,
    createdBy: 'admin',
    'createdAt|1': Mock.mock('@date'),
  });
  ctx.body = result.ok(data);
});

router.get('/api/mock/form-descriptions', (ctx) => {
  ctx.body = result.ok([
    {
      id: 102,
      moduleName: 'article',
      name: 'Article',
      flag: 'article-edit',
      sort: 3,
      createdTime: null,
      updatedTime: null,
      deletedTime: null,
      fields: [
        {
          id: 1,
          key: 'id',
          label: 'ID',
          sort: 1,
          inputType: 'input',
          tranferRules: null,
          specialConfig: null,
          inputProps: '{"disabled": true}',
          span: 16,
          offset: 0,
          isNewRow: 1,
          formItemLayout: '{"labelCol":{"span":8},"wrapperCol":{"span":16}}',
          styles: null,
          isActive: 1,
          createdTime: '2020-05-13T04:03:29+08:00',
          updatedTime: null,
          deletedTime: null,
        },
        {
          id: 2,
          key: 'title',
          label: 'Title',
          sort: 1,
          inputType: 'input',
          tranferRules: null,
          rules: '[{"required":true}]',
          specialConfig: null,
          inputProps: '{"placeholder": "Please entry title"}',
          span: 16,
          offset: 0,
          isNewRow: 1,
          formItemLayout: '{"labelCol":{"span":8},"wrapperCol":{"span":16}}',
          styles: null,
          isActive: 1,
          createdTime: '2020-05-13T04:03:29+08:00',
          updatedTime: null,
          deletedTime: null,
        },
        {
          id: 3,
          key: 'description',
          label: 'Description',
          sort: 1,
          inputType: 'text_area',
          tranferRules: null,
          rules: '[{"required":true}]',
          specialConfig: null,
          inputProps: '{"placeholder": "Please entry description"}',
          span: 16,
          offset: 0,
          isNewRow: 1,
          formItemLayout: '{"labelCol":{"span":8},"wrapperCol":{"span":16}}',
          styles: null,
          isActive: 1,
          createdTime: '2020-05-13T04:03:29+08:00',
          updatedTime: null,
          deletedTime: null,
        },
        {
          id: 4,
          key: 'content',
          label: 'Content',
          sort: 1,
          inputType: 'editor',
          tranferRules: null,
          rules: '[{"required":true}]',
          specialConfig: null,
          inputProps: '{"placeholder": "Please entry content"}',
          span: 16,
          offset: 0,
          isNewRow: 1,
          formItemLayout: '{"labelCol":{"span":8},"wrapperCol":{"span":16}}',
          styles: null,
          isActive: 1,
          createdTime: '2020-05-13T04:03:29+08:00',
          updatedTime: null,
          deletedTime: null,
        },
        {
          id: 5,
          key: 'sort',
          label: 'Sort',
          sort: 1,
          inputType: 'input_number',
          tranferRules: null,
          rules: '[{"required":true}]',
          specialConfig: null,
          inputProps: '{"placeholder": "Please entry sort"}',
          span: 16,
          offset: 0,
          isNewRow: 1,
          formItemLayout: '{"labelCol":{"span":8},"wrapperCol":{"span":16}}',
          styles: null,
          isActive: 1,
          createdTime: '2020-05-13T04:03:29+08:00',
          updatedTime: null,
          deletedTime: null,
        },
        {
          id: 6,
          key: 'createdBy',
          label: 'Created by',
          sort: 1,
          inputType: 'input',
          tranferRules: null,
          specialConfig: null,
          inputProps: '{"disabled": true}',
          span: 16,
          offset: 0,
          isNewRow: 1,
          formItemLayout: '{"labelCol":{"span":8},"wrapperCol":{"span":16}}',
          styles: null,
          isActive: 1,
          createdTime: '2020-05-13T04:03:29+08:00',
          updatedTime: null,
          deletedTime: null,
        },
        {
          id: 7,
          key: 'createdAt',
          label: 'Created at',
          sort: 1,
          inputType: 'input',
          tranferRules: null,
          rules: '[{"required":true}]',
          specialConfig: null,
          inputProps: '{"disabled": true}',
          span: 16,
          offset: 0,
          isNewRow: 1,
          formItemLayout: '{"labelCol":{"span":8},"wrapperCol":{"span":16}}',
          styles: null,
          isActive: 1,
          createdTime: '2020-05-13T04:03:29+08:00',
          updatedTime: null,
          deletedTime: null,
        },
      ],
    },
  ]);
});

router.result = result;
module.exports = router;
