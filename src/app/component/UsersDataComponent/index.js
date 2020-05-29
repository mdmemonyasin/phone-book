import React, { useState } from 'react';
import { Collapse, Button, Card, Row, Col, notification } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import AddContactModal from '../AddContactModal';
import styles from './index.module.scss';
import Axios from 'axios';

const { Panel } = Collapse;

const UsersDataComponent = ({ usersData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading]  = useState(false);

  const handleEdit = (id) => {
    setModalVisible(true);
    setUserId(id);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const responce = await Axios.delete('https://phone-book-api-v1.herokuapp.com/removeContact/?id='+id);
      if(responce){
        notification.success({
          message: responce.data.message
        })
      }
    } catch (err) {
      notification.error({
        message: "Something Went Wrong"
      })
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <React.Fragment>
      <div className={styles.usersDataWrapper}>
        <Collapse className={styles.collapseWrapper}>

          {usersData.length > 0 &&
            usersData.map((user) => (
              <Panel header={user.name} key={user.id}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>{user.dob ? user.dob.split('T')[0] : ''}</Col>
                  <Col span={12}>
                    <Button
                      type='primary'
                      onClick={() => {
                        handleEdit(user._id);
                      }}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button type='primary' danger onClick={() =>{
                      handleDelete(user._id);
                    }}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
                <Card>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <PhoneOutlined />
                      &nbsp; {user.number}
                    </Col>
                    <Col span={12}>
                      <MailOutlined />
                      &nbsp;{user.email}
                    </Col>
                  </Row>
                </Card>
              </Panel>
            ))}
        </Collapse>
      </div>
      <AddContactModal
        visible={modalVisible}
        onCancel={handleCancel}
        purpose='edit'
        id={userId}
      />
    </React.Fragment>
  );
};

export default UsersDataComponent;
