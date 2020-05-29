import React, { useState } from 'react';
import { Pagination } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import AddContactModal from '../AddContactModal';
import ContentSection from '../ContentSection';

const FooterSection = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  

  return (
    <div className={styles.footerWrapper}>
      <UserAddOutlined className={styles.addUserIcon} onClick={openModal} />
      <AddContactModal
        visible={modalVisible}
        onCancel={handleCancel}
        purpose='add'
      />
    </div>
  );
};

export default FooterSection;
