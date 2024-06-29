import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '../context/ThemeProvider';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import HomePage from '../pages/HomePage';
import NotesPage from '../pages/NotesPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import LogoutPage from '../pages/LogoutPage';
import RequireAuth from './RequireAuth';
import LocomotiveScroll from 'locomotive-scroll';
import { AnimationProvider } from '../context/AnimationContext';
import { NavbarVisibilityProvider } from '../context/NavbarVisibilityContext'; // Import the provider
import PageNotFound from './PageNotFound';

const locomotiveScroll = new LocomotiveScroll();

function App() {
  const { isDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <NavbarVisibilityProvider>
      <div className={`App ${isDarkMode ? 'dark' : ''} bg-gray-50 dark:bg-[#0b0b0b] min-h-screen w-full drk dark:drk`}>
        <AnimationProvider>
          <BrowserRouter>
            <NavBar toggleSidebar={toggleSidebar} />
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route index element={<HomePage /> } />
              <Route path="/notes" element={<RequireAuth><NotesPage /></RequireAuth>}  />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </BrowserRouter>
        </AnimationProvider>
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
    </NavbarVisibilityProvider>
  );
}

export default App;
