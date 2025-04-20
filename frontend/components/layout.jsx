import React, { useState } from 'react';
import Header from './header';
import Sidebar from './Sidebar';

const Layout = ({ children, activePage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} activePage={activePage} />
        
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        
        <main className="flex-1 py-6 px-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;