import React from 'react';
import classnames from 'classnames';
import { CloseOutlined } from '@/components/general-components/custom-icon';
import './tab-button.less';

export interface TabIProps {
  title: string;
  key: string;
  path: string;
  search: string;
  closable: boolean;
}

interface IProps {
  isActive?: boolean;
  title: string;
  tabKey: string;
  closable?: boolean;
  onClick?: any;
  onClose?: any;
}

export default (props: IProps) => {
  const { isActive = false, closable = true, title, onClick, onClose, tabKey } = props;

  const handleClickTab = () => {
    onClick && onClick(tabKey);
  };

  const handleCloseTab = (e: any) => {
    e.stopPropagation();
    onClose && onClose(tabKey);
  };

  return (
    <div id={tabKey} className={classnames('tab-btn', { 'tab-btn_active': isActive })} onClick={handleClickTab}>
      <div className="tab-btn-title">{title}</div>
      {closable && (
        <div onClick={handleCloseTab} className="tab-btn-close">
          <CloseOutlined style={{ fontSize: '12px' }} />
        </div>
      )}
    </div>
  );
};
