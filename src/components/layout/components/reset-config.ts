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
