import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, notification } from 'antd';
import axios from 'axios';

const AddContactModal = ({ visible, onCancel, purpose, id }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    try {
      setLoading(true);
      const responce = await axios.get('http://localhost:8000/getById/?id=' + id);
      if (responce) {
        setUserData(responce.data.contacts);
        console.log(userData);
      }
    } catch (err) {
      notification.error({
        message: "Something Went Wrong"
      })
    } finally {
      setLoading(false);
    }
  };

  const handelSubmit = async (values) => {
    if (purpose === 'edit') {
      console.log(values);
      values.userData = userData;
      console.log('for edit purpose');
      try {
        setLoading(true);
        const responce = await axios.put('http://localhost:8000/editContact', values);
        if (responce) {
          notification.message({
            message: "Edit Successful"
          })
        }
      } catch (err) {
        notification.err({
          message: "Something Went Wrong"
        })
      } finally {
        setLoading(false);
        visible = false;
        window.location.reload();
      }

    }
    if (purpose === 'add') {
      console.log('for add purpose');
      try {
        setLoading(true);
        const responce = await axios.post('http://localhost:8000/addContact', values);
        console.log(responce);
        if (responce) {
          notification.message({
            message: responce.data.message
          })
        }
      } catch (err) {
        notification.error({
          message: "Something went wrong"
        })
      } finally {
        setLoading(false);
        visible = false;
      }
    }
  };

  useEffect(() => {
    if(purpose==='edit' && id){
      getUserData();
    }
  }, [id]);

  const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 20,
    },
  };

  // const validateMessages = {
  //   required: '${label} is required!',
  //   types: {
  //     email: '${label} is not validate email!',
  //     number: '${label} is not a validate number!',
  //   },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
  // };

  return (
    <React.Fragment>
      {purpose === 'add' ? (
        <Modal
          title='Add New Contact'
          visible={visible}
          onCancel={onCancel}
          footer={null}
        >
          <Form name='Add Contact Form' {...layout} onFinish={handelSubmit}>
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='dob' label='DOB'>
              <Input />
            </Form.Item>
            <Form.Item name='number' label='Num'>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Email'>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : (
          <Modal
            title='Edit Contact'
            visible={visible}
            onCancel={onCancel}
            footer={null}
          >
            <Form name='Edit Contact Form' {...layout} onFinish={handelSubmit}>
              <Form.Item name='name' label='Name'>
                <Input value={userData.name} />
              </Form.Item>
              <Form.Item name='dob' label='DOB'>
                <Input value={userData.dob}/>
              </Form.Item>
              <Form.Item name='number' label='Num'>
                <Input value={userData.number}/>
              </Form.Item>
              <Form.Item name='email' label='Email'>
                <Input value={userData.email}/>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
            </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}
    </React.Fragment>
  );
};

export default AddContactModal;
