import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { toApi, fromApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: '/api/users',
  title: 'user',
  toApi,
  fromApi,
});
