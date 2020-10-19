import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { get } from 'lodash';
import store from 'store';
import { APP_CONFIG } from '@/lib/config/constants';
import 'antd/es/slider/style';

export default (props: any) => {
  const { onChange, value } = props;
  const [fileList, setFileList] = useState(
    value
      ? [
          {
            uid: Math.random(),
            // name: 'image.png',
            // status: 'done',
            url: value,
          },
        ]
      : [],
  );

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange && onChange(get(newFileList, '0.response.url'));
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate aspect={1.5}>
      <Upload
        action="/api/uploadImage"
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onPreview={onPreview}
        headers={{
          Authorization: `Bearer ${store.get(APP_CONFIG.TOKEN)}`,
        }}
      >
        {fileList.length < 1 && '+ 点击上传'}
      </Upload>
    </ImgCrop>
  );
};
