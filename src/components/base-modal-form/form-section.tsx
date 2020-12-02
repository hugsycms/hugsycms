import React from 'react';
import { Input, InputNumber, Radio, Row, Col, DatePicker } from 'antd';
import { map, get, isNil, isEmpty } from 'lodash';
import UploadFile from '@/components/general-components/upload-file';
import ImageUploadPreview from '@/components/general-components/image-upload-preview';
import DataSelect from '@/components/general-components/data-select';
import CascaderAddress from '@/components/general-components/cascader-address';
import NormalSelect from '@/components/general-components/normal-select';
import CountrySelect from '@/components/general-components/country-select';
import CustomEditor from '@/components/general-components/custom-editor';
import { formDescriptionsFromApi, formDescriptionsWithoutSectionApi } from '@/utils/adapter';
import request from '@/lib/request';

export const getFormDescriptionByModuleName = async (moduleName: string) => {
  return formDescriptionsWithoutSectionApi(
    formDescriptionsFromApi(await request.get(`/api/mock/form-descriptions?moduleName=${moduleName}`)),
  );
};

interface IProps {
  renderEditItem: (key: string, ReactNode: React.ReactNode, others?: object) => React.ReactNode;
  formDescriptions: any;
  id?: Number | String;
  data?: any;
  form?: any;
  products?: any;
  events?: any;
}

export class FormSection extends React.Component<IProps> {
  renderRowAndCol = (formDescriptionArr: any[] = []) => {
    return (
      <Row>
        {map(formDescriptionArr, (formDescription, index) => {
          return (
            <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
              {this.renderItem(formDescription)}
            </Col>
          );
        })}
      </Row>
    );
  };

  renderItem = (formDescription: any) => {
    const { renderEditItem, data, form } = this.props;
    const {
      inputType,
      formItemLayout: customFormItemLayout,
      styles,
      key: formDescriptionKey,
      inputProps: formDescriptionInputProps,
      special_config: formDescriptionSpecialConfig,
      path: formDescriptionPath,
    } = formDescription;

    switch (inputType) {
      case 'id':
        return renderEditItem(formDescriptionKey, <Input {...formDescriptionInputProps} />);
      case 'radio':
        return renderEditItem(
          formDescriptionKey,
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>,
          {
            customFormItemLayout,
            styles,
          },
        );
      case 'radio_group':
        return renderEditItem(get(formDescription, 'key'), <Radio.Group {...get(formDescription, 'inputProps')} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'input':
        return renderEditItem(formDescriptionKey, <Input {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
      case 'text_area':
        return renderEditItem(formDescriptionKey, <Input.TextArea {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
      case 'input_number':
        return renderEditItem(formDescriptionKey, <InputNumber min={0} {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
      case 'normal_select':
        return renderEditItem(
          formDescriptionKey,
          <NormalSelect
            type={get(JSON.parse(formDescriptionSpecialConfig), 'type')}
            showSearch={get(JSON.parse(formDescriptionSpecialConfig), 'showSearch')}
            {...formDescriptionInputProps}
          />,
          {
            customFormItemLayout,
            styles,
          },
        );
      case 'country_select':
        return renderEditItem(formDescriptionKey, <CountrySelect language="zh-CN" placeholder="请选择国籍" />, {
          customFormItemLayout,
          styles,
        });
      case 'password':
        return renderEditItem(formDescriptionKey, <Input.Password {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
      case 'roles':
        return renderEditItem(
          formDescriptionKey,
          <DataSelect url="roles/all" valueKey="id" labelKey="name" mode="multiple" {...formDescriptionInputProps} />,
          {
            customFormItemLayout,
            styles,
          },
        );
      case 'address':
        return renderEditItem(formDescriptionKey, <CascaderAddress {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
      case 'single_date_picker':
        return renderEditItem(formDescriptionKey, <DatePicker {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
      case 'image_upload_preview':
        return renderEditItem(formDescriptionKey, <ImageUploadPreview config={formDescription} form={form} />, {
          customFormItemLayout,
          styles,
        });
      case 'upload_file':
        return renderEditItem(formDescriptionKey, <UploadFile config={formDescription} form={form} />, {
          customFormItemLayout,
          styles,
        });
      case 'editor':
        return renderEditItem(formDescriptionKey, <CustomEditor {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
      case 'view_only':
        return renderEditItem(formDescriptionKey, <span>{get(data, formDescriptionPath)}</span>);
      default:
        return renderEditItem(formDescriptionKey, <Input {...formDescriptionInputProps} />, {
          customFormItemLayout,
          styles,
        });
    }
  };

  renderContent = () => {
    const { formDescriptions = [] } = this.props;
    let tempArr: any[] = [];
    let tempSpan = 0;
    const formArray: any[] = [];
    map(formDescriptions, (formDescription, index) => {
      if (!isNil(get(formDescription, 'span')) && !isNil(get(formDescription, 'offset'))) {
        if (get(formDescription, 'isNewRow')) {
          const renderArr = tempArr;
          tempSpan = 0;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
        }
        if (tempSpan < 25 && tempSpan + get(formDescription, 'span') + get(formDescription, 'offset') < 25) {
          tempSpan = tempSpan + get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
          if (Number(index) === formDescriptions.length - 1) {
            formArray.push(this.renderRowAndCol(tempArr));
            tempArr = [];
          }
        } else {
          const renderArr = tempArr;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
          tempSpan = get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
        }
      } else {
        formArray.push(this.renderItem(formDescription));
      }
    });
    if (!isEmpty(tempArr)) {
      formArray.push(this.renderRowAndCol(tempArr));
    }
    return formArray;
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

export default FormSection;
