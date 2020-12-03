// @ts-nocheck
import React from 'react';
import TargetComponent from '../index';
import { shallow } from 'enzyme';
import BaseTable from '@/components/base-table';
import * as Icon from '@/components/general-components/custom-icon';

describe('src > components > BaseList', () => {
  const defaultProps = {
    baseUrl: '/test',
    rowKey: 'id',
    baseTitle: 'test',
    tableColumns: [],
    Table: BaseTable,
  };
  const render = (props: {} = {}) => shallow(<TargetComponent {...defaultProps} {...props} />);

  describe('componentDidMount', () => {
    it('should call handleSearch', () => {
      const component = render();
      component.instance().handleSearch = jest.fn();
      component.instance().componentDidMount();
      expect(component.instance().handleSearch).toBeCalled();
    });
  });

  describe('isEditing', () => {
    it('should return true if rowData.editKey equal state.editKey', () => {
      const component = render();
      component.setState({
        editKey: '10',
      });
      component.instance().isEditing({ editKey: '10' });
    });

    it('should return true if rowData.id equal state.editKey', () => {
      const component = render();
      component.setState({
        editKey: '10',
      });
      component.instance().isEditing({ id: '10' });
    });
  });

  describe('handleItemCancel', () => {
    it('should state.id equals undefined', () => {
      const component = render();
      component.instance().form = {
        resetFields: jest.fn(),
      };
      component.instance().handleItemCancel()();
      expect(component.state('id')).toBeUndefined();
    });
  });

  describe('handleAdd', () => {
    it('should state.visible equals true and editable equals true', () => {
      const component = render();
      component.instance().handleAdd();
      expect(component.state('visible')).toBe(true);
      expect(component.state('editable')).toBe(true);
    });
  });

  describe('handleCancel', () => {
    it('should state.visible equals false and editable equals false and id equals undefined', () => {
      const component = render();
      component.instance().handleCancel();
      expect(component.state('visible')).toBe(false);
      expect(component.state('editable')).toBe(false);
      expect(component.state('id')).toBe(undefined);
    });
  });

  describe('handleQuerySearch', () => {
    it('should call handleSearch with correct params', () => {
      const component = render();
      component.instance().handleSearch = jest.fn();
      component.instance().handleQuerySearch({ test: '111' });
      expect(component.instance().handleSearch).toBeCalledWith({
        test: '111',
      });
    });
  });

  describe('handlePageChange', () => {
    it('should state equals correct data', () => {
      const component = render();
      component.setState({
        defaultQuery: {},
      });
      component.instance().handleSearch = jest.fn();
      component.instance().handlePageChange(1, 20);
      expect(component.state('defaultQuery')).toEqual({
        page: 0,
        size: 20,
      });

      expect(component.instance().handleSearch).toBeCalled();
    });
  });

  describe('getColumns', () => {
    it('should return correct data', () => {
      const component = render();
      component.instance().columns = [
        {
          editable: false,
          inputType: 'input',
          inputProps: {},
          dataIndex: 'dataIndex',
          title: 'title',
        },
        {
          editable: true,
          inputType: 'input',
          inputProps: {},
          dataIndex: 'dataIndex2',
          title: 'title2',
        },
      ];
      const result = component.instance().getColumns();
      component.instance().isEditing = jest.fn().mockReturnValue(true);
      expect(result[0]).toEqual({
        editable: false,
        inputType: 'input',
        inputProps: {},
        dataIndex: 'dataIndex',
        title: 'title',
      });
      const onCellCallback = result[1].onCell;
      const onCellCallbackResult = onCellCallback({ editKey: 1 });
      expect(onCellCallbackResult).toEqual({
        record: { editKey: 1 },
        inputType: 'input',
        inputProps: {},
        dataIndex: 'dataIndex2',
        title: 'title2',
        editing: true,
      });
    });
  });
});
