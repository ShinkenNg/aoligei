import React from 'react';
import Dialog from 'rc-dialog';
import _ from 'lodash';

import 'rc-dialog/assets/index.css';

import PowerButton from './../power-button';

export interface PowerModalProps {
  title?: string;
  visible?: boolean;
  beforeClose?: () => void;
  onClose?: () => void;
  onConfirm: () => void;
  zIndex?: number;
  align?: 'middle' | undefined;
  component?: React.ReactNode;
}

export function PowerModal(props: PowerModalProps) {
  const closeModal = () => {
    if (_.isFunction(props.beforeClose)) {
      props.beforeClose();
    }
    if (_.isFunction(props.onClose)) {
      props.onClose();
    }
  }

  const onConfirm = () => {
    if (_.isFunction(props.onConfirm)) {
      props.onConfirm();
    }
    closeModal();
  }

  const {title, visible, zIndex, align} = props;
  return (
    <Dialog
      title={title}
      onClose={closeModal}
      visible={visible}
      footer={[
        <PowerButton key='close' onClick={closeModal}>取消</PowerButton>,
        <PowerButton key='insert' onClick={onConfirm}>确认</PowerButton>
      ]}
      animation='zone'
      maskAnimation='fade'
      zIndex={zIndex}
      style={align === 'middle' ? {top: '50%', transform: 'translateY(-50%)'}: {}}
    >
      {props.component}
    </Dialog>
  )
}

export default PowerModal;
