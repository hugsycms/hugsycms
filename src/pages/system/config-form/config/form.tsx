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
    label: '名称',
    rules: [{ required: true, message: '名称是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入名称',
    },
  },
  flag: {
    key: 'flag',
    label: '标志',
    rules: [{ required: true, message: '标志是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入标志',
    },
  },
  module_name: {
    key: 'module_name',
    label: '模块名',
    rules: [{ required: true, message: '模块名是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入模块名',
    },
  },
  sort: {
    key: 'sort',
    label: '排序值',
    rules: [{ required: true, message: '排序值是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入排序值',
    },
  },
};

export const queryFormDescriptions = {
  id: {
    key: 'id',
    label: 'ID',
  },
  name: {
    key: 'name',
    label: '名称',
  },
  module_name: {
    key: 'module_name',
    label: '模块名',
  },
};

export default {
  modalFormDescriptions,
  queryFormDescriptions,
};
