import React, { createContext, useContext, useState } from 'react';

const NavbarVisibilityContext = createContext();

export const NavbarVisibilityProvider = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <NavbarVisibilityContext.Provider value={{ isNavbarVisible, setIsNavbarVisible }}>
      {children}
    </NavbarVisibilityContext.Provider>
  );
};

export const useNavbarVisibility = () => useContext(NavbarVisibilityContext);
