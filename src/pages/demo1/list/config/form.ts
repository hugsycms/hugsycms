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
    label: window.t('category.name'),
    rules: [{ required: true, message: window.t('category.name-placeholder') }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('category.name-placeholder'),
    },
  },
  sort: {
    key: 'sort',
    label: window.t('common.sort'),
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: window.t('common.sort-placeholder'),
    },
  },
};

export const queryFormDescriptions = {
  name: {
    key: 'name',
    label: window.t('category.name'),
  },
};

export default {
  modalFormDescriptions,
  queryFormDescriptions,
};
