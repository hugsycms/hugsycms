import React, { useEffect, useState } from 'react';
import { Button, Upload } from 'antd';
import { get } from 'lodash';
import store from 'store';
import { APP_CONFIG } from '@/lib/config/constants';
import { UploadOutlined } from '../CustomIcon';

export default (props: any) => {
  const { onChange, value } = props;
  const [fileList, setFileList] = useState([] as any);

  useEffect(() => {
    console.log(value);
    setFileList(
      value
        ? [
            {
              uid: Math.random(),
              url: value,
              name: value,
            },
          ]
        : [],
    );
  }, [value]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    get(newFileList, '0.response.url') && onChange && onChange(get(newFileList, '0.response.url'));
  };

  return (
    <Upload
      action="/api/uploadVideo"
      listType="text"
      fileList={fileList}
      onChange={handleChange}
      headers={{
        Authorization: `Bearer ${store.get(APP_CONFIG.TOKEN)}`,
      }}
    >
      <Button disabled={fileList.length > 0} icon={<UploadOutlined />}>
        选择文件
      </Button>
    </Upload>
  );
};
