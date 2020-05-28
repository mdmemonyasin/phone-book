import React from 'react';
import {Layout} from 'antd';
import './App.css';
import Contacts from './Component/Contacts';

const {Header, Footer, Content} = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Header>
          <h1>Hello I am Yasin</h1>
        </Header>
        <Content>
          <Contacts />
        </Content>
        <Footer>
          <h2>I am Footer</h2>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
