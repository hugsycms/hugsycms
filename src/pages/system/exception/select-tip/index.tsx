import React from 'react';
import { Result } from 'antd';
import FollowUpTip from '@/assets/imgs/follow-up-tip.png';
import './index.less';

export default () => <Result className="select-tip" icon={<img src={FollowUpTip} />} title="请在左侧选择一个列表" />;
