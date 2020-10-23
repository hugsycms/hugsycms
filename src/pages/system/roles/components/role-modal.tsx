import generateModalForm from '@/components/base-modal-form';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { fromApi, toApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: '/api/mock/roles',
  title: 'role',
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
