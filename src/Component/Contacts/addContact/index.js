import React, { useState, useEffect } from "react";
import { Modal, notification, Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddContactModal = () => {
    const [visible, setVisible] = useState(true);
    const handelSubmit = async (values) => {
        try {
            const responce = await axios.post('http://localhost:8000/addContact', {

            });
        } catch (err) {
            notification.error({
                message: "Something went wrong"
            })
        }
    }
    const handelCancel = () => {
        setVisible(false);
    }
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
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
        <Modal title="Add New Contact" visible={visible} onCancel={handelCancel}>
            <Form name="Add Contact Form" {...layout} onFinish={handelSubmit}>
                <Form.Item name="name" label="Name" rules={[{
                    required: true
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="dob" label="DOB">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddContactModal;