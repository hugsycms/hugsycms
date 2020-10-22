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
    label: 'Role name',
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: 'Please entry role name',
    },
  },
  code: {
    key: 'code',
    label: 'Role code',
    rules: [{ required: true }],
    inputType: 'input',
    inputProps: {
      placeholder: 'Please entry role code',
    },
  },
  description: {
    key: 'description',
    label: 'Role description',
    rules: [{ required: true }],
    inputType: 'text_area',
    inputProps: {
      placeholder: 'Please entry role description',
    },
  },
};

export default {
  modalFormDescriptions,
};
