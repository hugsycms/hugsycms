import React from 'react';
import request from '@/lib/request';
import { get } from 'lodash';
import {
  formDescriptionsFromApi,
  formDescriptionsWithoutSectionApi,
  fromApi as defaultFromApi,
  toApi as defaultToApi,
} from '@/utils/adapter';
import { message } from 'antd';
import './less/index.less';

export interface IProps {
  routerQuery?: any;
  moduleName?: string;
  title?: string;
  baseUrl?: string;
  fromApi?: any;
  toApi?: any;
  Form?: any;
}

export default class BaseEditPanel<P extends IProps = {}> extends React.Component<IProps & P> {
  state = {
    data: {},
    formDescriptionsWithoutSection: [],
    formDescriptions: [],
  };

  async componentDidMount() {
    const { routerQuery, moduleName, baseUrl, fromApi = defaultFromApi } = this.props;
    // 优先从 props 里面获取id，因为可能作为组件，被其它页面引用使用
    const id = get(this.props, 'id') || get(routerQuery, 'id');
    // TODO: 上线的时候，考虑把配置文件放在项目中，而不是通过接口获取
    const formDescriptions = formDescriptionsFromApi(
      await request.get(`/api/mock/form-descriptions?moduleName=${moduleName}`),
    );
    const formDescriptionsWithoutSection = formDescriptionsWithoutSectionApi(formDescriptions);
    const data = id ? fromApi(await request.get(`${baseUrl}/${id}`), formDescriptionsWithoutSection) : {};
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
      await request.put(baseUrl, params);
      message.success(`修改${title}成功`);
    } else {
      await request.post(baseUrl, params);
      message.success(`新增${title}成功`);
    }
  };

  /* istanbul ignore next */ render() {
    const { Form, printTemplate = '', printResource = '', history } = this.props;
    const { formDescriptions, formDescriptionsWithoutSection, data } = this.state;
    return (
      <div className="base-edit-panel">
        <Form
          key={get(data, 'id') || Math.random()}
          printId={get(data, 'id')}
          printResource={printResource}
          printTemplate={printTemplate}
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
