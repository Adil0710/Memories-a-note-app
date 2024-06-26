import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); // Add a loading state

    // Function to toggle theme mode
    const toggleTheme = (mode) => {
        setIsDarkMode(mode);
        localStorage.setItem('isDarkMode', mode ? 'true' : 'false');
        document.documentElement.classList.toggle('dark', mode); // Update the class on HTML element
    };

    // Initialize theme mode based on localStorage on component mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('isDarkMode');
        let initialMode = null
        if (storedTheme){
        initialMode = storedTheme === 'true';
        setIsDarkMode(initialMode);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches){
            setIsDarkMode(true)
        }
        document.documentElement.classList.toggle('dark', initialMode); // Set the class on mount
        setIsLoaded(true); // Set loading state to true after initial theme is set
    }, []);

    if (!isLoaded) {
        return null; // Prevent rendering until the theme is set
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
