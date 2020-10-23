import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import { get } from 'lodash';
import './index.less';
import 'react-quill/dist/quill.snow.css';
import { Upload } from 'antd';
import { APP_CONFIG } from '@/lib/config/constants';
import store from 'store';

Quill.register('modules/ImageResize', ImageResize);

const modules = {
  toolbar: [
    [{ size: [] }],
    // [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }, { align: [] }],
    // [{ list: 'ordered' }, { indent: '-1' }, { indent: '+1' }],
    [{ list: 'ordered' }],
    ['link', 'image', 'video'],
    // ['clean'],
  ],
  ImageResize: {},
};

const formats = [
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'align',
  'list',
  'indent',
  'link',
  'image',
  'video',
  'clean',
];

export default class MobileEditor extends Component {
  uploadRef: any;
  constructor(props) {
    super(props);
    this.state = {
      value: get(props, 'value'),
    };
  }

  quillRef: any;

  componentDidMount() {
    const quillEditor = this.quillRef.getEditor();
    const quillEditorToolbar = quillEditor.getModule('toolbar');
    quillEditorToolbar.addHandler('image', () => {
      this.uploadRef.click();
    });
  }

  handleChange = (data) => {
    const { onChange } = this.props;
    onChange && onChange(data);
  };

  handleUploadImage = (data) => {
    if (get(data, 'file.status') === 'done') {
      const imageUrl = get(data, 'file.response.url');
      const quillEditor = this.quillRef.getEditor();
      let range = quillEditor.selection.savedRange.index;
      if (range || range == 0) {
        quillEditor.insertEmbed(range, 'image', imageUrl);
      }
      quillEditor.setSelection(quillEditor.getSelection().index + 1);
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className="mobile-editor">
        <ReactQuill
          ref={(ref) => {
            this.quillRef = ref;
          }}
          className="mobile-editor_quill"
          theme="snow"
          modules={modules}
          defaultValue={value}
          onChange={this.handleChange}
          formats={formats}
        />
        <Upload
          action="/api/mock/uploadImage"
          listType="text"
          accept=".png,.jpg,.jpeg,gif,.svg"
          style={{ display: 'none' }}
          onChange={this.handleUploadImage}
          headers={{
            Authorization: `Bearer ${store.get(APP_CONFIG.TOKEN)}`,
          }}
        >
          <span
            ref={(ref) => {
              this.uploadRef = ref;
            }}
          ></span>
        </Upload>
      </div>
    );
  }
}
