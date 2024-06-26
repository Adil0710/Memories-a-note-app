import React from 'react';
import Hero from '../components/Hero';
import { useAnimation } from '../context/AnimationContext';
import HowWorks from '../components/HowWorks';
import ContactUs from '../components/ContactUs';

function HomePage() {
  const { hasAnimated, markAsAnimated } = useAnimation();

  return (
    <div className=' w-full h-full'>
      <Hero hasAnimated={hasAnimated} markAsAnimated={markAsAnimated} />

      {/* Render HowWorks only after animation */}

      {hasAnimated && 
      <>
      <HowWorks />
      <ContactUs/>
      </>
      } 
    </div>
  );
}

export default HomePage;
