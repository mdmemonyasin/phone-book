import React, { useState, useEffect } from 'react';
import SearchComponent from '../SearchComponent';
import UsersDataComponent from '../UsersDataComponent';
import styles from './index.module.scss';
import axios from 'axios';
import {notification,Pagination} from 'antd';

const ContentSection = () => {
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [usedId, setUserId] = useState(undefined);

  const getUsers = async (page=1) => {
    try {
      setLoading(true);
      const responce = await axios.get("https://phone-book-api-v1.herokuapp.com/getContacts/?page="+page);
      if (responce) {
        console.log(responce.data.contacts);
        setUsersData(responce.data.contacts);
      }
    } catch (err) {
      notification.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handelChange = (page) =>{
    getUsers(page);
  }

  useEffect(() => {
    getUsers();
  }, [usedId]);

  return (
    <div className={styles.contentWrapper}>
      <SearchComponent setUserId={setUserId} />
      <UsersDataComponent usersData={usersData} />
      <Pagination size='small' total={50} onChange={handelChange}/>
    </div>
  );
};

export default ContentSection;
