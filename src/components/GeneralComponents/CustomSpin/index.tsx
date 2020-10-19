import React from 'react';
import { Spin } from 'antd';
import './index.less';

interface IProps {
  style?: object;
  tip?: string;
}

export default (props: IProps) => {
  return <Spin style={props.style} className="spin-container" tip={props.tip || '数据加载中...'} />;
};
