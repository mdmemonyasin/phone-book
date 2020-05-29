import React, { useState, useEffect } from 'react';
import SearchComponent from '../SearchComponent';
import UsersDataComponent from '../UsersDataComponent';
import styles from './index.module.scss';
import axios from 'axios';
import {notification} from 'antd';

const ContentSection = () => {
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [usedId, setUserId] = useState(undefined);

  // here while fetching the users pass the userid as parameter to get data of particular user
  const getUsers = async (page=1) => {
    try {
      setLoading(true);
      const responce = await axios.get("http://localhost:8000/getContacts/?page="+page);
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

  useEffect(() => {
    getUsers();
  }, [usedId]);

  // in search component the user who will be selected we will store its userid in then fetch data for that particular user
  return (
    <div className={styles.contentWrapper}>
      <SearchComponent setUserId={setUserId} />
      <UsersDataComponent usersData={usersData} />
    </div>
  );
};

export default ContentSection;
