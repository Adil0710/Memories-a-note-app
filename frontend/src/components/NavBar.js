import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ConfigProvider, Divider, theme } from "antd";
import { MenuFoldOutlined } from '@ant-design/icons';
import ThemeToggle from "./ThemeToggle";
import authStore from "../stores/authStore";
import { useTheme } from "../context/ThemeProvider";
import { TinyColor } from '@ctrl/tinycolor';
import { useNavbarVisibility } from '../context/NavbarVisibilityContext'; // Import the context

const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const NavBar = ({ toggleSidebar }) => {
  const store = authStore();
  const { isDarkMode } = useTheme();
  const { isNavbarVisible } = useNavbarVisibility(); // Destructure the isNavbarVisible
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [store]);

  return (
    <div className={`navbr fixed w-full md:px-20 px-8 lg:px-40 z-20 pt-5 ${isNavbarVisible ? '' : 'hidden'}`}>
      <nav className="flex justify-between items-center px-5 py-1 nav-bar dark:bg-black dark:bg-opacity-70 dark:backdrop-filter dark:backdrop-blur-[1px] border-b-slate-200 dark:border-[#303030] border rounded-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="sm:text-2xl font-bold gradient-text">Memories <i className="ri-sparkling-2-fill gradient-text"></i></h1>
          <h1 className="text-[7px] sm:text-[10px] text-gray-500 dark:text-gray-300 lg:-mt-1">A Note Taking App</h1>
        </div>

        <div className="hidden lg:flex md:hidden items-center justify-center gap-1">
          {!store.loggedIn ? (
            <>
              <ConfigProvider
                theme={{
                  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
              >
                <Button size="small" shape='round' className='group overflow-hidden'><Link to="/"><div className=' flex flex-col'><span className=' mt-5 group-hover:-mt-6 transition-all'>Home</span><span className=''>Home</span></div></Link></Button>
                <Divider type='vertical' />
                <Button size="small" shape='round'><Link to="/signup">Sign up</Link></Button>
                <Divider type='vertical' />
              </ConfigProvider>
              <ConfigProvider
                theme={{
                  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
                <Button type="primary" size="small" shape='round'><Link to="/login">Login</Link></Button>
              </ConfigProvider>
            </>
          ) : (
            <>
              <ConfigProvider
                theme={{
                  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
              >
                <p className="text-gray-500 dark:text-gray-300 sm:text-base text-xs">👋 Hi , {userData}</p>
                <Divider type='vertical' />
                <Button size="small" shape='round'><Link to="/">Home</Link></Button>
                <Divider type='vertical' />
                <Button size="small" shape='round'><Link to="/notes">Notes</Link></Button>
                <Divider type='vertical' />
                <Button type="primary" size="small" shape='round' danger><Link to="/logout">Logout</Link></Button>
              </ConfigProvider>
            </>
          )}
        </div>
        <div className='hidden lg:flex md:hidden'><ThemeToggle /></div>
        <div className="lg:hidden md:flex flex items-center">
          <MenuFoldOutlined onClick={toggleSidebar} className="text-2xl cursor-pointer text-[#272727] dark:text-gray-300 font-bold" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
