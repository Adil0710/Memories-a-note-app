import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeProvider'; // Import the useTheme hook
import { Switch } from 'antd';
import { SunFilled, MoonFilled } from '@ant-design/icons';

function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    // Function to toggle dark mode and update localStorage
    const toggleDarkMode = () => {
        const newMode = !isDarkMode; // Toggle the theme
        toggleTheme(newMode);
        localStorage.setItem('isDarkMode', newMode ? 'true' : 'false'); // Update localStorage
    };

    // Initialize dark mode state from localStorage on component mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('isDarkMode');
        if (storedTheme === 'true') {
            toggleTheme(true);
        } else {
            toggleTheme(false);
        }
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <Switch
            className=' bg-[#858585]'
            checked={isDarkMode} // Use checked instead of defaultChecked
            onChange={toggleDarkMode}
            unCheckedChildren={<SunFilled />}
            checkedChildren={<MoonFilled />}
        />
    );
}

export default ThemeToggle;
