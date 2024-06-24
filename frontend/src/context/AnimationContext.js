import React, { createContext, useContext, useState, useEffect } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Clear the animation status on initial load
    localStorage.removeItem('hasAnimated');

    const animationStatus = localStorage.getItem('hasAnimated');
    if (animationStatus) {
      setHasAnimated(true);
    }
  }, []);

  const markAsAnimated = () => {
    setHasAnimated(true);
    localStorage.setItem('hasAnimated', 'true');
  };

  return (
    <AnimationContext.Provider value={{ hasAnimated, markAsAnimated }}>
      {children}
    </AnimationContext.Provider>
  );
};
