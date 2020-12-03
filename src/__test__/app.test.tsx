// @ts-nocheck
import React from 'react';
import { App as TargetComponent } from '../app';
import { shallow } from 'enzyme';

describe('src > APP', () => {
  const defaultProps = {
    updateTabs: jest.fn(),
    user: {},
    location: {
      pathname: '/',
      search: '?test=app',
    },
    tabs: {
      tabs: {},
      tabsMapping: {},
    },
    system: {
      collapsed: false,
    },
  };

  const render = (props: {} = {}) => shallow(<TargetComponent {...defaultProps} {...props} />);

  describe('componentDidMount', () => {
    it('should direct return if no tab', () => {
      const component = render({
        user: {
          permissionsMapping: {
            '/': null,
          },
        },
      });
      const result = component.instance().componentDidMount();
      expect(result).toBeUndefined();
    });

    it('should call updateTabs with correct params if tab exist', () => {
      const component = render({
        user: {
          permissionsMapping: {
            '/': {
              name: 'tab',
              key: '/',
            },
          },
        },
      });
      const result = component.instance().componentDidMount();
      expect(component.instance().props.updateTabs).toBeCalledWith({
        title: 'tab',
        key: '/',
        path: '/',
        search: '?test=app',
        lastSearch: '?test=app',
        closable: false,
      });
      expect(component.state('queryStr')).toBe('?test=app');
      expect(component.state('path')).toBe('/');
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should do nothing if path equals nextPath', () => {
      const component = render();
      const nextProps = {
        location: {
          pathname: '/',
          search: '?test=app',
        },
      };
      const result = component.instance().componentWillReceiveProps(nextProps);
      expect(result).toBeUndefined();
    });

    it('should direct return if no nextTab and path not equals nextPath', () => {
      const nextProps = {
        location: {
          pathname: '/test',
          search: '?test=app',
        },
      };
      const component = render({
        user: {
          permissionsMapping: {
            '/test': null,
          },
        },
      });
      const result = component.instance().componentWillReceiveProps(nextProps);
      expect(result).toBeUndefined();
    });

    it('should call updateTabs with correct params if tab exist and path not equals nextPath', () => {
      const nextProps = {
        location: {
          pathname: '/test',
          search: '?test=app',
        },
      };
      const component = render({
        user: {
          permissionsMapping: {
            '/test': {
              name: 'tab2',
              key: '/test',
            },
          },
        },
        tabs: {
          tabsMapping: {
            '/test': {
              search: 'lastSearch',
            },
          },
        },
      });
      component.instance().componentWillReceiveProps(nextProps);
      expect(component.instance().props.updateTabs).toBeCalledWith({
        title: 'tab2',
        key: '/test',
        path: '/test',
        search: '?test=app',
        lastSearch: 'lastSearch',
        closable: true,
      });
      expect(component.state('queryStr')).toBe('?test=app');
      expect(component.state('path')).toBe('/test');
    });
  });

  describe('toggle', () => {
    it('should state.collapsed equals true if collapsed equal false', () => {
      const component = render();
      component.setState({ collapsed: false });
      component.instance().toggle();
      expect(component.state('collapsed')).toBe(true);
    });

    it('should state.collapsed equals false if collapsed equal true', () => {
      const component = render();
      component.setState({ collapsed: true });
      component.instance().toggle();
      expect(component.state('collapsed')).toBe(false);
    });
  });
});
