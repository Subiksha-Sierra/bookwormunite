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
      </div>
    </header>
  );
};

export default Header