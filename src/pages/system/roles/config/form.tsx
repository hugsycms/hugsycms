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
    rules: [{ required: true, message: window.t('system.roles.name-placeholder') }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.roles.name-placeholder'),
    },
  },
  code: {
    key: 'code',
    label: window.t('system.roles.code'),
    rules: [{ required: true, message: window.t('system.roles.code-placeholder') }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('system.roles.code-placeholder'),
    },
  },
  description: {
    key: 'description',
    label: window.t('system.roles.description'),
    rules: [{ required: true, message: window.t('system.roles.description-placeholder') }],
    inputType: 'text_area',
    inputProps: {
      placeholder: window.t('system.roles.description-placeholder'),
    },
  },
};

export default {
  modalFormDescriptions,
};
