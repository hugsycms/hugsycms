import React from 'react';
import request from '@/lib/request';
import { get } from 'lodash';
import {
  formDescriptionsFromApi,
  formDescriptionsWithoutSectionApi,
  fromApi as defaultFromApi,
  toApi as defaultToApi,
} from '@/utils/adapter';
import { History } from 'history';
import { message } from 'antd';
import './index.less';

export interface IProps {
  history: History;
  routerQuery?: any;
  moduleName?: string;
  title?: string;
  baseUrl?: string;
  fromApi?: any;
  toApi?: any;
  Form: any;
}

export default class BaseEditPanel<P extends IProps> extends React.Component<IProps & P> {
  state = {
    data: {},
    formDescriptionsWithoutSection: [],
    formDescriptions: [],
  };

  async componentDidMount() {
    const { routerQuery, moduleName, baseUrl, fromApi = defaultFromApi } = this.props;
    // base edit panel can used as component in other page.
    // so get id from props first.
    const id = get(this.props, 'id') || get(routerQuery, 'id');
    // get form config.
    const formDescriptions = formDescriptionsFromApi(
      get(await request.get(`/api/mock/form-descriptions?moduleName=${moduleName}`), 'data'),
    );
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const data = id ? fromApi(get(await request.get(`${baseUrl}/${id}`), 'data'), formDescriptionsWithoutSection) : {};
    this.setState({ formDescriptions, formDescriptionsWithoutSection, data });
  }

  handleSubmit = async (values: any) => {
    const { data, formDescriptionsWithoutSection } = this.state;
    const { toApi = defaultToApi, baseUrl, title } = this.props;
    const params = await toApi(
      {
        ...data,
        ...values,
      },
      formDescriptionsWithoutSection,
    );
    if (get(values, 'id')) {
      await request.put(baseUrl as string, params);
      message.success(window.t('common.update-success', { title }));
    } else {
      await request.post(baseUrl as string, params);
      message.success(window.t('common.create-success', { title }));
    }
  };

  /* istanbul ignore next */ render() {
    const { Form, history } = this.props;
    const { formDescriptions, formDescriptionsWithoutSection, data } = this.state;
    return (
      <div className="base-edit-panel">
        <Form
          key={get(data, 'id') || Math.random()}
          printId={get(data, 'id')}
          data={data}
          onFinish={this.handleSubmit}
          formDescriptions={formDescriptions}
          formDescriptionsWithoutSection={formDescriptionsWithoutSection}
          history={history}
        />
      </div>
    );
  }
}
