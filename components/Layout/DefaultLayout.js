// components/DefaultLayout.js
import React from 'react';
import Head from './Head';
import AppFooter from './Footer';
import NavBar from './NavBar';

const DefaultLayout = ({ children, title }) => {
  return (
    <div className="layout">
      <Head title={title} />
      
      <NavBar />

      <main className="main-container">
        {children}
      </main>

      <AppFooter />
    </div>
  );
};

export default DefaultLayout;
