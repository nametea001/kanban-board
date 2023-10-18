import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  // title?: string;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar */}
      <div className="w-1/6 bg-blue-900 text-white p-4">
        <h1 className="text-2xl font-bold">My App</h1>
        <ul className="mt-4">
          <li className="mb-2">Dashboard</li>
          <li className="mb-2">Profile</li>
          <li className="mb-2">Settings</li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-4">
        {/* Navbar */}
        <div className="bg-white p-4">
          <h2 className="text-2xl font-semibold">Welcome, User!</h2>
          {/* Add any navbar content here */}
        </div>

        {/* Page Content */}
        <div className="bg-white p-4 mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
