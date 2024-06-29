import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, theme } from 'antd';
import { useTheme } from '../context/ThemeProvider';
import { TinyColor } from '@ctrl/tinycolor';
import { gsap, CSSPlugin, Expo } from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { useAnimation } from '../context/AnimationContext';
import { useNavbarVisibility } from '../context/NavbarVisibilityContext'; // Import the context
gsap.registerPlugin(CSSPlugin);

const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Hero() { // Remove setIsNavbarVisible from props
  const { isDarkMode } = useTheme();
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { hasAnimated, markAsAnimated } = useAnimation();
  const { setIsNavbarVisible } = useNavbarVisibility(); // Destructure the setIsNavbarVisible function
  let count;

  useEffect(() => {
    const startAnimation = () => {
      const t1 = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          setIsNavbarVisible(true);
          markAsAnimated();
          document.body.style.overflow = 'auto'; // Enable scrolling
        }
      });
      t1.to(".follow", {
        width: "100%",
        duration: 1,
        delay: 0.3,
        ease: Expo.easeInOut,
      }).to(".hide", {
        opacity: 0,
        duration: 0.3
      }).to(".hide", {
        display: "none",
        duration: 0.2
      }).to(".follow", {
        height: "100%",
        duration: 0.5,
        delay: 0.3,
        ease: Expo.easeInOut,
      }).to(".follow", {
        zIndex: 0,
      }).to(".loading", {
        zIndex: 0,
        opacity: 0,
        duration: 0.3,
      }).from(".main", {
        opacity: 0.5,
        scale: 0.4,
        duration: 0.5,
        ease: Expo.easeOut,
      }).from(".title",{
        y: 20,
        duration:0.5,
        opacity: 0,
        ease: Expo.easeInOut
      }).from(".navbr",{
        y: -500,
        duration:0.7,
        opacity: 0,
        ease: Expo.easeInOut
      })
    };

    if (!hasAnimated) {
      document.body.style.overflow = 'hidden'; // Enable scrolling
      count = setInterval(() => {
        setCounter((counter) =>
          counter < 100
            ? counter + 1
            : (clearInterval(count), setCounter(100), startAnimation())
        );
      }, 15);
    } else {
      setIsLoading(false);
      setIsNavbarVisible(true);
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => clearInterval(count);

  }, [hasAnimated, setIsNavbarVisible, markAsAnimated]);

  useEffect(() => {
    return () => {
      clearInterval(count);
      document.body.style.overflow = 'auto'; // Enable scrolling
    };
  }, []);

  return (

    <div className='min-h-screen w-full flex flex-col items-center lg:px-19 sm:px-10 px-2 relative justify-center'>
      {isLoading && !hasAnimated && (
        <div className='loading w-full h-full bg-black dark:bg-white flex items-center justify-center absolute z-20 top-0'>
          <div className='hide'><p className=' russo lg:text-8xl md:text-8xl text-5xl absolute text-white text-opacity-60 sm:top-[30%] top-[40%] left-8 dark:text-opacity-80 dark:text-black'>Loading...</p></div>
          <div className='follow absolute bg-white dark:bg-[#0b0b0b] h-[3px] w-[0] left-0 z-30'></div>
          <div className='hide absolute left-0 h-[3px] gradient-bg transition delay-500 ease-out' style={{ width: counter + "%" }}></div>
          <div className='hide'><p className=' russo lg:text-8xl md:text-8xl text-5xl absolute text-white text-opacity-60 dark:text-opacity-80 dark:text-black md:translate-y-10 translate-y-10 lg:translate-y-10 sm:right-20 right-8'>{counter}%</p></div>
        </div>
      )}
      <div className="bg-[#fbe2e3] absolute top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-inherit"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-inherit"></div>

      <div className={`main w-full flex flex-col items-center justify-center`}>
        <div className='w-full flex flex-col justify-center items-center lg:mt-14 -mt-10'>
          <h1 className=' z-10 text-center font-semibold text-2xl lg:text-6xl sm:text-4xl font-[unbounded] lg:leading-tight leading-normal md:leading-normal lg:tracking-wide dark:text-white dark:opacity-90'>
            Capture Your Thoughts <br /> Cherish Your <p className='title gradient-text blueShadow'>Memories <i className="ri-sparkling-2-fill gradient-text"></i></p>
          </h1>

          <p className='text-center text-sm lg:text-lg sm:text-sm lg:px-10 mt-10 text-black opacity-60 dark:text-white dark:text-opacity-60'>
            Memories is your personal digital notebook, designed to help you capture and organize your thoughts effortlessly. Keep track of important ideas and cherished moments all in one place, accessible anytime, anywhere.
          </p>
        </div>

        <div className='flex flex-row-reverse items-center justify-center gap-5 mt-20'>
          <Link to="/signup">
            <div className="fancy group bg-[#f1f1f1] dark:bg-[#000] border border-gray-300 dark:border-[#242424] specialBtn">
              <button className="fancy-button font-semibold text-black dark:text-white px-5 py-2">
                Get started <ArrowRightOutlined className=' ml-1 transition-all group-hover:translate-x-1' />
              </button>
            </div>
          </Link>
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
            <Button type='primary' shape='round' size='large'><Link to="/login" className='font-semibold'>Log In</Link></Button>
          </ConfigProvider>
        </div>
      </div>
      
      
      
    </div>
    
    
  );
}

export default Hero;


{/* <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div> */}
