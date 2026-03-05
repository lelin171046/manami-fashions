import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const Layout = () => (
    <div>
        <Header />
       <div className='pt-[100px] min-h-[calc(100vh-306px)]'>
  <Outlet />
</div>
        <Footer></Footer>
    </div>
);

export default Layout;