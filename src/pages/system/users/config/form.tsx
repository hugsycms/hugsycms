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
    label: 'Username',
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: 'Please enter username',
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
    label: 'Nickname',
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: 'Please enter nickname',
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
    label: 'Username',
  },
  nickname: {
    key: 'nickname',
    label: 'Nickname',
  },
};

export default {
  modalFormDescriptions,
  resetFormDescriptions,
  queryFormDescriptions,
};
