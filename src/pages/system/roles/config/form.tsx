export const modalFormDescriptions = {
  id: {
    key: 'id',
    label: 'ID',
    inputType: 'id',
    inputProps: {
      disabled: true,
    },
  },
  name: {
    key: 'name',
    label: window.t('system.roles.name'),
    rules: [{ required: true, message: window.t('system.roles.name') }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.roles.name'),
    },
  },
  code: {
    key: 'code',
    label: window.t('system.roles.code'),
    rules: [{ required: true, message: window.t('system.roles.code') }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.roles.code'),
    },
  },
  description: {
    key: 'description',
    label: window.t('system.roles.description'),
    rules: [{ required: true, message: window.t('system.roles.description') }],
    inputType: 'text_area',
    inputProps: {
      placeholder: window.t('system.roles.description'),
    },
  },
};

export default {
  modalFormDescriptions,
};
