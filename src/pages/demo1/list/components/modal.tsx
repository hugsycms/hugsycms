import generateModalForm from '@/components/base-modal-form';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { fromApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: '/api/mock/categories',
  title: window.t('category.base-title'),
  fromApi,
});
