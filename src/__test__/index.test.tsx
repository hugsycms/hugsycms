// @ts-nocheck
import React from 'react';
import TargetComponent from '../index';
import { shallow } from 'enzyme';

describe('src > index', () => {
  const render = (props: {} = {}) => shallow(<TargetComponent {...props} />);

  describe('componentDidMount', () => {
    it('should state.isRenderApp equals true when window.location.pathname not in singlePages', () => {
      window.location.pathname = '/404';
      const component = render();
      component.instance().componentDidMount();
      expect(component.state('isRenderApp')).toBe(true);
    });

    it('should state.isRenderApp equals false when window.location.pathname in singlePages', () => {
      window.location.pathname = '/login';
      const component = render();
      component.instance().componentDidMount();
      expect(component.state('isRenderApp')).toBe(false);
    });
  });

  describe('getDerivedStateFromProps', () => {
    it('should result equals correct data when window.location.pathname not in singlePages', () => {
      window.location.pathname = '/404';
      const result = TargetComponent.getDerivedStateFromProps();
      expect(result).toEqual({ isRenderApp: true });
    });

    it('should result equals correct data when window.location.pathname in singlePages', () => {
      window.location.pathname = '/login';
      const result = TargetComponent.getDerivedStateFromProps();
      expect(result).toBeNull();
    });
  });
});
