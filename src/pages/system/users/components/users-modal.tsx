import generateModalForm from '@/components/base-modal-form';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { toApi, fromApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: '/api/mock/users',
  title: window.t('system.users.title'),
  toApi,
  fromApi,
});
