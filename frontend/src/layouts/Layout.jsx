import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col bg-gray-50">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 min-h-0 overflow-auto bg-gray-100 p-4 md:p-6 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
