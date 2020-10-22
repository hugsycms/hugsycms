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
    label: 'Category name',
    rules: [{ required: true, message: 'Please entry category name' }],
    inputType: 'input',
    inputProps: {
      placeholder: 'Please entry category name',
    },
  },
  sort: {
    key: 'sort',
    label: 'Sort',
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: 'Please entry category sort',
    },
  },
};

export const queryFormDescriptions = {
  name: {
    key: 'name',
    label: 'Name',
  },
};

export default {
  modalFormDescriptions,
  queryFormDescriptions,
};
