export const modalFormDescriptions = {
  id: {
    key: 'id',
    label: 'ID',
    inputType: 'id',
    inputProps: {
      disabled: true,
    },
  },
  username: {
    key: 'username',
    label: window.t('system.user.username'),
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.user.username-placeholder'),
    },
  },
  password: {
    key: 'password',
    label: 'Password',
    inputType: 'password',
    inputProps: {
      placeholder: 'Please enter password',
    },
  },
  nickname: {
    key: 'nickname',
    label: window.t('system.user.nickname'),
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.user.nickname-placeholder'),
    },
  },
  email: {
    key: 'email',
    label: 'Email',
    inputType: 'input',
    rules: [{ required: true }],
    inputProps: {
      placeholder: 'Please enter email',
    },
  },
  roles: {
    key: 'roles',
    label: 'Role',
    rules: [{ required: true }],
    inputType: 'roles',
    inputProps: {
      placeholder: 'Please enter role',
    },
  },
};

export const resetFormDescriptions = {
  password: {
    key: 'password',
    label: 'Password',
    inputType: 'password',
    rules: [{ required: true }],
    inputProps: {
      placeholder: 'Please enter password',
    },
  },
};

export const queryFormDescriptions = {
  username: {
    key: 'username',
    label: window.t('system.user.username'),
  },
  nickname: {
    key: 'nickname',
    label: window.t('system.user.nickname'),
  },
};

export default {
  modalFormDescriptions,
  resetFormDescriptions,
  queryFormDescriptions,
};
