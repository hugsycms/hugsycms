import React from 'react';
import { get } from 'lodash';
import { Input, DatePicker, Checkbox, InputNumber, TimePicker, Radio } from 'antd';
import NormalSelect from '@/components/general-components/normal-select';

export default (props: any) => {
  const render = () => {
    const inputType = get(props, 'inputType') || get(props, 'config.inputType');
    switch (inputType) {
      case 'input':
        return <Input {...props} />;
      case 'month_picker':
        return <DatePicker.MonthPicker {...props} />;
      case 'single_date_picker':
        return <DatePicker {...props} />;
      case 'single_time_picker':
        return <TimePicker {...props} />;
      case 'checkbox':
        return <Checkbox {...props} />;
      case 'radio_group':
        return <Radio.Group {...props} />;
      case 'select':
      case 'normal_select':
        return <NormalSelect {...props} />;
      case 'input_number':
        return <InputNumber {...props} />;
      default:
        return <Input {...props} />;
    }
  };

  return <>{render()}</>;
};
