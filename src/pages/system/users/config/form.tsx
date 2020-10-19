export const modalFormDescriptions = {
  // id: {
  //   key: 'id',
  //   label: '编号',
  //   inputType: 'id',
  //   inputProps: {
  //     disabled: true,
  //   },
  // },
  login: {
    key: 'login',
    label: '登录账号',
    rules: [{ required: true, message: '登录账号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入登录账号',
    },
  },
  password: {
    key: 'password',
    label: '登录密码',
    inputType: 'password',
    inputProps: {
      placeholder: '请输入登录密码',
    },
  },
  // imageUrl: {
  //   key: 'imageUrl',
  //   label: '头像',
  //   rules: [{ required: true, message: '头像是必填项' }],
  //   inputType: 'input',
  //   inputProps: {
  //     placeholder: '请输入头像',
  //   },
  // },
  firstName: {
    key: 'firstName',
    label: '姓名',
    rules: [{ required: true, message: '姓名是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入姓名',
    },
  },
  // email: {
  //   key: 'email',
  //   label: '邮箱',
  //   rules: [{ required: true, message: '邮箱是必填项' }],
  //   inputType: 'input',
  //   inputProps: {
  //     placeholder: '请输入邮箱',
  //   },
  // },
  roles: {
    key: 'roles',
    label: '角色',
    rules: [{ required: true, message: '角色是必选项' }],
    inputType: 'roles',
    inputProps: {
      placeholder: '请选择角色',
    },
  },
};

export const resetFormDescriptions = {
  password: {
    key: 'password',
    label: '登录密码',
    inputType: 'password',
    rules: [{ required: true, message: '密码是必填项' }],
    inputProps: {
      placeholder: '请输入登录密码',
    },
  },
};

export const queryFormDescriptions = {
  login: {
    key: 'login',
    label: '账号',
  },
  firstName: {
    key: 'firstName',
    label: '姓名',
  },
};

export default {
  modalFormDescriptions,
  resetFormDescriptions,
  queryFormDescriptions,
};
