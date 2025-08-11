import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
    </div>
);

export default MainLayout;
