import { Button } from "@mui/material";
import React, { ReactNode, useState } from "react";
import * as icons from "@mui/icons-material";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white p-4 w-1/6 ${
          showSideBar ? "" : "hidden"
        } `}
      >
        <Link href={"/"}>
          <h1 className="text-3xl font-bold my-4">My App</h1>
        </Link>
        <ul className="mt-8">
          <li className="mb-4">
            <a href="#" className="text-lg hover:text-blue-300">
              ss
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-lg hover:text-blue-300">
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-lg hover:text-blue-300">
              Settings
            </a>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-full p-2 overflow-y-hidden">
        {/* nav   */}
        <div className="bg-dark_conten p-4 shadow-lg mb-4">
          <div className="flex justify-between items-center">
            <a>
              <icons.ViewHeadline
                className="cursor-pointer"
                onClick={() => {
                  setShowSideBar(!showSideBar);
                }}
              ></icons.ViewHeadline>
            </a>
          </div>
        </div>
        {/* Page Content */}
        <div className="bg-dark_conten p-4 shadow-lg h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
