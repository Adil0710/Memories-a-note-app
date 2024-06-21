import React, { useState } from 'react';
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import { Button, ConfigProvider, Divider, theme } from "antd";
import authStore from "../stores/authStore";
import { Toaster } from "react-hot-toast";
import { TinyColor } from '@ctrl/tinycolor';
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeProvider";
import { CloseOutlined, HomeOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';

const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function App() {
  const store = authStore();
  const { isDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : ""} bg-gray-100 dark:bg-[#0b0b0b] min-h-screen w-full drk dark:drk`}>
      <BrowserRouter>
        <nav className="fixed w-full flex justify-between items-center px-5 py-2 nav-bar dark:bg-black dark:bg-opacity-70 dark:backdrop-filter dark:backdrop-blur-[1px] border-b-slate-200 dark:border-[#303030] border-b z-50">
          <div className="flex flex-col items-center justify-center">
            <h1 className="sm:text-2xl font-bold gradient-text">Memories <i className="ri-sparkling-2-fill gradient-text"></i></h1>
            <h1 className="text-[10px] text-gray-500 dark:text-gray-300">A Note Taking App</h1>
          </div>
          <div className="hidden md:flex items-center justify-center gap-5">
            {!store.loggedIn ? (
              <>
                <Button size="small"><Link to="/">Home</Link></Button>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                        colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                        colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                        lineWidth: 0,
                      },
                    },
                  }}
                >
                  <Button type="primary" size="small"><Link to="/login">Login</Link></Button>
                </ConfigProvider>
                <Link to="/signup" size="small">Sign Up</Link>
              </>
            ) : (
              <>
                <p className="text-gray-500 dark:text-gray-300 sm:text-base text-xs">Welcome back, {store.userData}!</p>
                <Button type="primary" size="small" danger><Link to="/logout">Logout</Link></Button>
              </>
            )}
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <MenuFoldOutlined onClick={toggleSidebar} className="text-2xl cursor-pointer  text-[#272727] dark:text-gray-300 font-bold" />
          </div>
        </nav>
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
            <h2 className="text-[#272727] text-lg font-bold pl-2 dark:text-gray-300">👋 Hi , {store.userData}</h2>
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
              <p className="text-[#272727] text-sm font-semibold bg-gray-100 gap-3 py-1 pl-3 rounded-md flex dark:text-gray-300 dark:bg-[#141414]">
                Welcome back, {store.userData}!
              </p>
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

        <Routes>
          <Route index element={<RequireAuth><NotesPage /></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: isDarkMode ? '#141414' : '',
            color: isDarkMode ? '#fff' : '',
          },
        }}
      />
    </div>
  );
}

export default App;
