// @ts-nocheck
import React from 'react';
import TargetComponent from '../';
import { shallow } from 'enzyme';
import observePatientData from '@/utils/observePatientData';
import * as adapter from '@/utils/adapter';
import request from '@/lib/request';
import { message } from 'antd';

describe('src > components > BaseEditPanel', () => {
  const defaultProps = {
    routerQuery: {
      id: 1,
    },
    moduleName: 'test-module',
    baseUrl: 'test-url',
    fromApi: jest.fn(),
    toApi: jest.fn(),
    title: 'test',
  };

  const render = (props: {} = {}) => shallow(<TargetComponent {...defaultProps} {...props} />);

  beforeEach(() => {
    jest.spyOn(observePatientData, 'subscribe');
    jest.spyOn(observePatientData, 'unSubscribe');
    jest.spyOn(adapter, 'formDescriptionsFromApi');
    jest.spyOn(adapter, 'formDescriptionsWithoutSectionApi');
    jest.spyOn(request, 'get');
    jest.spyOn(request, 'put');
    jest.spyOn(request, 'post');
    jest.spyOn(message, 'success');
  });

  describe('componentDidMount', () => {
    it('should call observePatientData.subscribe & formDescriptionsFromApi& formDescriptionsWithoutSectionApi ', async () => {
      const component = render();
      request.get.mockReturnValue({ test: '333' });
      adapter.formDescriptionsWithoutSectionApi.mockReturnValue({ test: '444' });
      adapter.formDescriptionsFromApi.mockReturnValue({ test: '777' });
      const callback = observePatientData.subscribe.mock.calls[0][0];
      component.setState({});
      await component.instance().componentDidMount();
      expect(observePatientData.subscribe).toBeCalled();
      callback({ test: '111' });
      expect(component.state('data')).toEqual({ test: '111' });
      expect(request.get).toBeCalledWith('/api/form-descriptions?moduleName=test-module');
      expect(adapter.formDescriptionsFromApi).toBeCalledWith({ test: '333' });
      expect(component.instance().props.fromApi).toBeCalledWith({ test: '333' }, { test: '444' });
      component.instance().props.fromApi.mockReturnValue({ test: '666' });
      expect(component.state()).toEqual({
        formDescriptions: { test: '777' },
        formDescriptionsWithoutSection: { test: '444' },
        data: { test: '111' },
      });
    });
  });

  describe('componentWillUnmount', () => {
    it('should call unSubscribe', () => {
      const component = render();
      component.instance().componentWillUnmount();
      expect(observePatientData.unSubscribe).toBeCalled();
    });
  });

  describe('handleSubmit', () => {
    it('should call request.put', async () => {
      const component = render();
      request.put.mockReturnValue({ test: '333' });
      component.instance().props.toApi.mockReturnValue({ test: '111' });
      component.setState({
        formDescriptionsWithoutSection: { section: 'test' },
      });
      await component.instance().handleSubmit({ id: 1 });
      expect(component.instance().props.toApi).toBeCalledWith({ id: 1 }, { section: 'test' });
      expect(request.put).toBeCalledWith('test-url', { test: '111' });
      expect(message.success).toBeCalledWith('修改test成功');
    });

    it('should call request.post', async () => {
      const component = render();
      request.post.mockReturnValue({ test: '333' });
      component.instance().props.toApi.mockReturnValue({ test: '111' });
      component.setState({
        formDescriptionsWithoutSection: { section: 'test' },
      });
      await component.instance().handleSubmit({ id: null });
      expect(component.instance().props.toApi).toBeCalledWith({ id: null }, { section: 'test' });
      expect(request.post).toBeCalledWith('test-url', { test: '111' });
      expect(message.success).toBeCalledWith('新增test成功');
    });
  });
});
