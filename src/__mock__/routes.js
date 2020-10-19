const router = require('koa-router')();

router.post('/api/mock/authenticate', (ctx) => {
  ctx.body = {
    id_token:
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfQUxMX0FETUlTU0lPTixST0xFX1NFTEVDVF9QTEFOTE9HLFJPTEVfU0VMRUNUX1BSRUdOQU5DWUhJU1RPUlksUk9MRV9TRUxFQ1RfUFJFTUFSSVRBTEVYQU0sUk9MRV9TRUxFQ1RfUFJFTUFSSVRBTFZJU0lULFJPTEVfU0VMRUNUX1BSRU5BVEFMRElBR05PU0lTLFJPTEVfU0VMRUNUX1BSRU5BVEFMRVhBTSxST0xFX1NFTEVDVF9QUkVOQVRBTFBBVElFTlQsUk9MRV9TRUxFQ1RfUFJFTkFUQUxTQ1JFRU4sUk9MRV9TRUxFQ1RfUFJFTkFUQUxWSVNJVCIsImV4cCI6MTYwMjkyOTQ4Mn0.HYp7WgTPaIlIx2xtKRfGFWMsIVo24ZZQRFLiR66X3IJdY7rkwGExspKiAPA7pTMxPS5Uze5CZtDxagRNKLRQ4w',
  };
});

router.get('/api/mock/users/admin', (ctx) => {
  ctx.body = {
    id: 3,
    login: 'admin',
    firstName: 'Administrator',
    lastName: 'Administrator',
    email: 'admin@localhost',
    imageUrl: '',
    activated: true,
    langKey: 'zh-cn',
    createdBy: 'system',
    createdDate: null,
    lastModifiedBy: 'admin',
    lastModifiedDate: '2020-08-07T07:27:29Z',
    password: null,
    authorities: null,
    groups: [
      {
        id: 1,
        name: 'ADMIN',
        nickname: '超级管理员',
        groupdesc: 'master权限',
        permissions: [
          {
            id: 2,
            type: 'menu',
            key: '/system',
            name: '系统管理',
            parentid: 0,
            icon: 'icon-setting1',
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
        ],
      },
    ],
    wards: null,
  };
});

router.get('/api/mock/users', (ctx) => {
  ctx.body = [
    {
      id: 1,
      login: 'system',
      firstName: 'System',
      lastName: 'System',
      email: 'system@localhost',
      imageUrl: '',
      activated: true,
      langKey: 'zh-cn',
      createdBy: 'system',
      createdDate: null,
      lastModifiedBy: 'admin',
      lastModifiedDate: '2020-10-13T07:59:27Z',
      password: null,
      authorities: null,
      groups: [],
      wards: null,
    },
    {
      id: 2,
      login: 'anonymoususer',
      firstName: 'Anonymous',
      lastName: 'User',
      email: 'anonymous@localhost',
      imageUrl: '',
      activated: true,
      langKey: 'zh-cn',
      createdBy: 'system',
      createdDate: null,
      lastModifiedBy: 'system',
      lastModifiedDate: null,
      password: null,
      authorities: null,
      groups: [],
      wards: null,
    },
  ];
});
router.get('/api/mock/users/count', (ctx) => {
  ctx.body = 2;
});

router.get('/api/mock/users/authorities', (ctx) => {
  ctx.body = ['ROLE_ADMIN'];
});

router.get('/api/mock/permissions/:id', (ctx) => {
  ctx.body = {
    active: null,
    icon: 'icon-healthcare',
    id: 1,
    key: '/premarital-care',
    name: '婚前保健',
    parentid: 0,
    sort: 1,
    type: 'menu',
  };
});
router.get('/api/mock/permissions', (ctx) => {
  ctx.body = [
    {
      id: 1,
      type: 'menu',
      key: '/premarital-care',
      name: '婚前保健',
      parentid: 0,
      icon: 'icon-healthcare',
      sort: 1,
      active: null,
    },
    {
      id: 2,
      type: 'menu',
      key: '/system',
      name: '系统管理',
      parentid: 0,
      icon: 'icon-setting1',
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
      key: '/system/task',
      name: '任务管理',
      parentid: 2,
      icon: '',
      sort: 6,
      active: null,
    },
    {
      id: 7,
      type: 'menu',
      key: '/system/audit',
      name: '审计管理',
      parentid: 2,
      icon: '',
      sort: null,
      active: null,
    },
    {
      id: 8,
      type: 'menu',
      key: '/system/version',
      name: '版本管理',
      parentid: 2,
      icon: '',
      sort: null,
      active: null,
    },
  ];
});

router.get('/api/mock/groups', (ctx) => {
  ctx.body = [
    {
      id: 1,
      name: 'ADMIN',
      nickname: '超级管理员',
      groupdesc: 'master权限',
      permissions: [
        {
          id: 128,
          type: 'route',
          key: '/workflow/edit2',
          name: '新工作流编辑',
          parentid: 96,
          icon: null,
          sort: null,
          active: null,
        },
        {
          id: 129,
          type: 'menu',
          key: '/highrisk-management/configuration',
          name: '高危配置',
          parentid: 58,
          icon: null,
          sort: null,
          active: null,
        },
        {
          id: 2,
          type: 'menu',
          key: '/system',
          name: '系统管理',
          parentid: 0,
          icon: 'icon-setting1',
          sort: 999,
          active: true,
        },
        {
          id: 130,
          type: 'menu',
          key: '/data-report',
          name: '数据上报',
          parentid: 0,
          icon: 'icon-securitycode',
          sort: 30,
          active: null,
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
          id: 131,
          type: 'menu',
          key: '/data-report/first-visit',
          name: '首诊上报',
          parentid: 130,
          icon: null,
          sort: null,
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
      ],
    },
  ];
});
module.exports = router;
