import React from 'react';
import Hero from '../components/Hero';
import { useAnimation } from '../context/AnimationContext';
import HowWorks from '../components/HowWorks';

function HomePage() {
  const { hasAnimated, markAsAnimated } = useAnimation();

  return (
    <div className=' w-full h-full'>
      <Hero hasAnimated={hasAnimated} markAsAnimated={markAsAnimated} />
      {hasAnimated && <HowWorks />} {/* Render HowWorks only after animation */}
    </div>
  );
}

export default HomePage;
