import ExtendsForm from '@/components/BaseModalForm/ExtendsForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { get } from 'lodash';
import request from '@/lib/request';
import { message } from 'antd';

export default class ModelForm extends ExtendsForm {
  constructor(props: any) {
    super(props);
    this.state = {
      formDescriptions,
      url: '/api/form-descriptions/sections',
      title: '模块配置',
      renderEditItem: null,
      formItemLayout: {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 16,
        },
      },
      data: {},
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const { url, formDescriptions, formItemLayout } = this.state;
    setTimeout(async () => {
      this.form = this.formRef.current;
      const renderEditItem = this.generateRenderEditItem(formDescriptions, {
        formItemLayout,
      });
      this.setState({ renderEditItem });
      if (id) {
        const result = await request.get(`${url}?id=${id}`);
        const values = get(result, 'data.data.0');
        this.form.setFieldsValue(values);
        this.setState({ data: values });
      }
    }, 100);
  }

  handleSubmit = async () => {
    const { data, toApi, title, url, fixedFormParams } = this.state;
    const { id, onCancel, onSearch } = this.props;
    let tip = '';
    await this.form.validateFields();
    const values = { ...data, ...this.form.getFieldsValue(), id };
    if (id) {
      await request.put(`/${url}/${id}`, {
        ...values,
        ...fixedFormParams,
      });
      tip = `修改${title}成功`;
    } else {
      await request.post(`/${url}`, {
        ...values,
        ...fixedFormParams,
      });
      tip = `添加${title}成功`;
    }

    message.success(tip);
    onCancel();
    onSearch();
  };
}
