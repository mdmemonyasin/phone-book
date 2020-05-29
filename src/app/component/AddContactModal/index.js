import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, notification, DatePicker } from 'antd';
import axios from 'axios';

const AddContactModal = ({ visible, onCancel, purpose, id }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    try {
      setLoading(true);
      const responce = await axios.get('https://phone-book-api-v1.herokuapp.com/getById/?id=' + id);
      if (responce) {
        setUserData(responce.data.contacts);
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
      values.userData = userData;
      console.log('for edit purpose');
      try {
        setLoading(true);
        const responce = await axios.put('https://phone-book-api-v1.herokuapp.com/editContact', values);
        if (responce) {
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
        visible = false;
        window.location.reload();
      }

    }
    if (purpose === 'add') {
      console.log('for add purpose');
      try {
        setLoading(true);
        const responce = await axios.post('https://phone-book-api-v1.herokuapp.com/addContact', values);
        console.log(responce.data);
          notification.success({
            message: responce.data.message
          })
      } catch (err) {
        console.log(err);
        notification.error({
          message: "Number is already present"
        })
      } finally {
        setLoading(false);
        visible = false;
        window.location.reload();
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
      span: 5,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <React.Fragment>
      {purpose === 'add' ? (
        <Modal
          title='Add New Contact'
          visible={visible}
          onCancel={onCancel}
          footer={null}
        >
          <Form name='Add Contact Form' {...layout} onFinish={handelSubmit} validateMessages={validateMessages}>
            <Form.Item name='name' label='Name' rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item name='dob' label='DOB'>
              <DatePicker />
            </Form.Item>
            <Form.Item name='number' label='Number' rules={[{required: true},{types: 'number', min:10, max:10}]}>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{required: true}, {types: 'email'}]}>
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
              <DatePicker value={userData.dob}/>
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
