import React, { useState, useEffect } from "react";
import { Collapse, notification, Spin, Button} from "antd";
import Icon, { PhoneOutlined, MailOutlined,PlusCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import AddContactModal from "./addContact";
const { Panel } = Collapse;
const Contacts = () => {
    const [contact, setContact] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchContact = async () => {
        try {
            setLoading(true);
            const responce = await axios.get("http://localhost:8000/getContacts");
            if (responce) {
                setContact(responce.data);
                console.log(responce.data);
            }
        } catch (err) {
            notification.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log(contact);
    }, [contact])
    useEffect(() => {
        fetchContact();
    }, []);
    const render = () => {
        if (loading)
            return <Spin />
        return (
            <div className="container">
                <Collapse defaultActiveKey={["1"]}>
                    {contact.map(element => (
                        <Panel key={element._id} header={element.name}>
                            <div className="card">
                                <div className="container">
                                    <h3>{element.name}</h3>
                                    <h4>{element.dob}</h4>
                                    <ul>
                                        {element.number.map(element =>
                                            <p><PhoneOutlined /> {element}</p>
                                        )}
                                    </ul>
                                    <ul>
                                        {element.email.map(element =>
                                            <p><MailOutlined /> {element}</p>
                                        )}
                                    </ul>
                                </div>
                                <div className="container">
                                    <Button className="btn-primary">Edit</Button>
                                    <Button className="btn-primary">Remove</Button>
                                </div>
                            </div>
                        </Panel>
                    ))}
                </Collapse>
                <div>
                    <p><PlusCircleOutlined onClick={<AddContactModal/>}/></p>
                </div>
            </div>
        )
    }
    return render();
};
export default Contacts