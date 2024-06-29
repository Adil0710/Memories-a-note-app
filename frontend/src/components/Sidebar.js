import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfigProvider, Divider, theme } from "antd";
import { CloseOutlined, HomeOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import ThemeToggle from "./ThemeToggle";
import authStore from "../stores/authStore";
import { useTheme } from "../context/ThemeProvider";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const store = authStore();
  const { isDarkMode } = useTheme();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [store]);


  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#1f1f1f] bg-opacity-75 duration-300 z-40 transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-60 h-full bg-white dark:bg-[#0b0b0b] duration-300 z-50 transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform`}
      >
        {/* Header */}
        <div className="p-4 pb-0 flex justify-between items-center">
          {!store.loggedIn ? (
            <h2 className="text-[#272727] text-lg font-bold pl-2 dark:text-gray-300">Menu</h2>
          ) : (
            <h2 className="text-[#272727] text-lg font-bold pl-2 dark:text-gray-300">👋 Hi , {userData}</h2>
          )}
          <CloseOutlined onClick={toggleSidebar} className="text-2xl cursor-pointer text-[#272727] dark:text-gray-300 font-bold" />
        </div>
        
        {/* Divider */}
        <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
          <div className="px-4 pb-3"><Divider /></div>
        </ConfigProvider>

        {/* Links */}
        <div className="flex flex-col justify-center px-4 space-y-10">
          <Link to="/" onClick={toggleSidebar} className="text-[#272727] text-sm bg-gray-100 gap-3 py-1 pl-3 rounded-md flex dark:text-gray-300 dark:bg-[#141414]">
            <HomeOutlined />Home
          </Link>
          
          {!store.loggedIn ? (
            <>
              <Link to="/login" onClick={toggleSidebar} className="text-[#272727] text-sm bg-gray-100 gap-3 py-1 pl-3 rounded-md flex dark:text-gray-300 dark:bg-[#141414]">
                <LoginOutlined />Login
              </Link>
              <Link to="/signup" onClick={toggleSidebar} className="text-[#272727] text-sm bg-gray-100 gap-3 py-1 pl-3 rounded-md flex dark:text-gray-300 dark:bg-[#141414]">
                <UserAddOutlined />Sign Up
              </Link>
            </>
          ) : (
            <>
            
              <Link to="/notes" onClick={toggleSidebar} className="text-[#272727] text-sm bg-gray-100 gap-3 py-1 pl-3 rounded-md flex dark:text-gray-300 dark:bg-[#141414]">
            <HomeOutlined />Notes
          </Link>
              <Link to="/logout" onClick={toggleSidebar} className="gap-3 py-1 pl-3 text-sm rounded-md flex text-gray-100 dark:text-gray-300 bg-rose-500">
                <LogoutOutlined />Logout
              </Link>
            </>
          )}
          
          {/* Bottom Section */}
          <div className="w-[82%] absolute bottom-5 flex flex-col gap-">
            <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
              <Divider />
            </ConfigProvider>
            <div><ThemeToggle /></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
