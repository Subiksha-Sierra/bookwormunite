// src/components/Dashboard/Dashboard.jsx

import React from 'react';
import { Book, BookOpen } from 'lucide-react';
import Card from '../ui/Card';

const Dashboard = ({ books, students }) => {
  const borrowedBooks = books.filter(book => book.status === 'borrowed');
  const availableBooks = books.filter(book => book.status === 'available');

  const stats = [
    {
      label: "Total Books",
      value: books.length,
      icon: <Book size={24} className="text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      label: "Borrowed Books",
      value: borrowedBooks.length,
      icon: <BookOpen size={24} className="text-amber-600" />,
      color: "bg-amber-100",
    },
  ];

  const recentActivities = [
    {
      action: "Book Borrowed",
      item: "The Great Gatsby",
      user: "Alice Johnson",
      time: "2 hours ago",
    },
    {
      action: "Book Returned",
      item: "To Kill a Mockingbird",
      user: "Bob Smith",
      time: "5 hours ago",
    },
    {
      action: "New Student Added",
      item: "Charlie Brown",
      user: "Admin",
      time: "1 day ago",
    },
    {
      action: "Book Added",
      item: "1984",
      user: "Admin",
      time: "2 days ago",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500">Overview of your library management system</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center transition-all duration-300 hover:shadow-md">
            <div className={`${stat.color} p-4 rounded-lg mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Book Status Section */}
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold mb-4">Books Status</h3>
          <div className="space-y-4">
            {/* Available */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Available</span>
              </div>
              <div className="font-semibold">{availableBooks.length} books</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${(availableBooks.length / Math.max(books.length, 1)) * 100}%` }}
              ></div>
            </div>

            {/* Borrowed */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span>Borrowed</span>
              </div>
              <div className="font-semibold">{borrowedBooks.length} books</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-amber-500 h-2.5 rounded-full"
                style={{ width: `${(borrowedBooks.length / Math.max(books.length, 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">{activity.item}</span>
                  {activity.user && <span className="text-gray-500"> by {activity.user}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;