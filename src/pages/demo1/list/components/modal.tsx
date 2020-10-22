import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { fromApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: '/api/mock/categories',
  title: 'tag',
  fromApi,
});
