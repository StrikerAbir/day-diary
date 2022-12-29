import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import './Main.css'
const Main = () => {
    return (
      <div className='relative'>
        <div className='fixed top-0 z-10 w-full'>
          <Header></Header>
        </div>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
};

export default Main;