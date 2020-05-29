import React from 'react';
import { Layout } from 'antd';
import Navbar from '../../component/Navbar';
import ContentSection from '../../component/ContentSection';
import FooterSection from '../../component/FooterSection';

const { Header, Footer, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <ContentSection />
      </Content>
      <Footer>
        <FooterSection />
      </Footer>
    </Layout>
  );
};

export default MainLayout;
