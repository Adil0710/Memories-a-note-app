import dark from "../assets/dark.png"
import light from "../assets/light.png"
import { theme, ConfigProvider, Divider, } from 'antd';
import { useTheme } from '../context/ThemeProvider';
import React, { useEffect } from 'react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { gsap, CSSPlugin, Expo } from 'gsap';
gsap.registerPlugin(CSSPlugin, ScrollTrigger);

function FreeToUse() {

    const {isDarkMode} = useTheme()

    useEffect(() => {

        gsap.from(".container img", {
            y: 200,
            duration: 0.8,
            delay: 0.5,
            opacity: 0,
            ease: Expo.easeInOut,
            scrollTrigger: {
              trigger: ".container",
              start: "top 80%", // animation starts when the top of the element hits 80% of the viewport height
              end: "top 20%",
              toggleActions: "play none none none", // play the animation on scroll
              scrub: 2,
            }
          });
      },[]);

  return (
    <div className='bg-white w-full dark:bg-[#0b0b0b] min-h-screen lg:px-19 sm:px-10 px-2'>

        <div className='container relative px-10 flex items-center justify-center -top-20'>
         <img src={`${isDarkMode ? dark : light}`} className=' sm:w-[80%] rounded-xl sm:h-[90%] w-full h-full shadow'/>
        </div>

        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            componentSize="full"
        >
            <Divider/>
        
            </ConfigProvider>

    </div>
  )
}

export default FreeToUse