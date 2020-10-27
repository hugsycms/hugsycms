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
    label: window.t('system.users.username'),
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.users.username-placeholder'),
    },
  },
  password: {
    key: 'password',
    label: window.t('system.users.password'),
    rules: [{ required: true }],
    inputType: 'password',
    inputProps: {
      placeholder: window.t('system.users.password-placeholder'),
    },
  },
  nickname: {
    key: 'nickname',
    label: window.t('system.users.nickname'),
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.users.nickname-placeholder'),
    },
  },
  email: {
    key: 'email',
    label: window.t('system.users.email'),
    inputType: 'input',
    rules: [{ required: true }],
    inputProps: {
      placeholder: window.t('system.users.email-placeholder'),
    },
  },
  roles: {
    key: 'roles',
    label: window.t('system.users.roles'),
    rules: [{ required: true }],
    inputType: 'roles',
    inputProps: {
      placeholder: window.t('system.users.roles-placeholder'),
    },
  },
};

export const resetFormDescriptions = {
  password: {
    key: 'password',
    label: window.t('system.users.password'),
    inputType: 'password',
    rules: [{ required: true }],
    inputProps: {
      placeholder: window.t('system.users.password-placeholder'),
    },
  },
};

export const queryFormDescriptions = {
  username: {
    key: 'username',
    label: window.t('system.users.username'),
  },
  nickname: {
    key: 'nickname',
    label: window.t('system.users.nickname'),
  },
};

export default {
  modalFormDescriptions,
  resetFormDescriptions,
  queryFormDescriptions,
};
