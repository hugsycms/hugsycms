import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { fromApi, toApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: '/api/mock/groups',
  title: '角色',
  fromApi,
  toApi,
  modalProps: {
    width: 520,
  },
  formItemLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  },
});
