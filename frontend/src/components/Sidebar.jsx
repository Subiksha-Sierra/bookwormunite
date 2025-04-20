import React from 'react';
import { Book, Home, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, activePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} className="mr-3" />, href: '#dashboard' },
    { id: 'books', label: 'Books', icon: <Book size={18} className="mr-3" />, href: '#books' },
  ];

  return (
    <aside 
  className={`${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } lg:translate-x-0 fixed inset-y-0 left-0 w-64 h-full bg-gray-900 text-white transition-transform duration-300 ease-in-out z-20`}
>
  <div className="p-6">
    <div className="flex items-center">
      <Book size={24} className="text-blue-400" />
      <span className="ml-3 text-xl font-semibold">Library</span>
    </div>
  </div>
  
  <nav className="px-4 py-2">
    <ul className="space-y-1">
      {navItems.map((item) => (
        <li key={item.id}>
          <a 
            href={item.href} 
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              activePage === item.id 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  
  <div className="absolute bottom-0 w-full p-4">
    <a 
      href="#logout" 
      className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors"
    >
      <LogOut size={18} className="mr-3" />
      Log Out
    </a>
  </div>
</aside>

  );
};

export default Sidebar;