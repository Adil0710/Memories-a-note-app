import React from 'react';
import Hero from '../components/Hero';
import { useAnimation } from '../context/AnimationContext';

function HomePage() {
  const { hasAnimated, markAsAnimated } = useAnimation();

  return (
    <div className='lg:px-19 sm:px-10 px-2'>
      <Hero hasAnimated={hasAnimated} markAsAnimated={markAsAnimated} />
    </div>
  );
}

export default HomePage;
