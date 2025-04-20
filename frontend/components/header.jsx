import React from 'react';
import { Menu, Search } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white py-4 px-6 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 mr-4 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Library Management System</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
