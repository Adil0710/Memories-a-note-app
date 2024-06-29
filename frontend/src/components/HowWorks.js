import React, { useEffect } from 'react'
import { useTheme } from '../context/ThemeProvider';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import darkLogin from '../assets/dark-login.png'
import darkView from '../assets/view-dark.png'
import darkCreate from '../assets/create-dark.png'
import lightLogin from '../assets/light-login.png'
import lightView from '../assets/view-light.png'
import lightCreate from '../assets/create-light.png'
import { ConfigProvider, theme } from 'antd'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { gsap, CSSPlugin, Expo } from 'gsap';
gsap.registerPlugin(CSSPlugin, ScrollTrigger);

function HowWorks() {
  const {isDarkMode} = useTheme()
  useEffect(() => {
    
    gsap.from(".subtitle p", {
      y: 50,
      duration: 0.7,
      stagger:0.5,
      delay:0.5,
      opacity: 0,
      ease: Expo.easeInOut,
      scrollTrigger: {
        trigger: ".subtitle",
        start: "top 80%", // animation starts when the top of the element hits 80% of the viewport height
        end: "top 60%",
        toggleActions: "play none none none", // play the animation on scroll
        scrub: 1
      }
    });
  },[]);
    
  return (
    <div className='bg-gray-50 w-full dark:bg-black min-h-screen lg:px-19 sm:px-10 px-2'>
     
      <h1 className='subtitle font-[Prompt] dark:text-white opacity-80 flex flex-row items-center justify-center text-4xl font-medium text-center capitalize pt-24 pb-5'><p className=' mx-2'>How</p><p className=' mx-2'>it</p> <p className=' mx-2'>works?</p></h1>

     <div className='timeline w-full py-20 sm:pb-52 pb-40 lg:px-24 xl:px-34'>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: `${isDarkMode ? '#141414' : '#f3f4f6'}`,
              color: `${isDarkMode ? '#fff' : 'black'}`,
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              padding: '2rem 2rem',
              boxShadow: `${isDarkMode ? 'none' : "0 5px 12px rgba(0, 0, 0, 0.15)"}`,
            }}
            contentArrowStyle={{ borderRight: '0.4rem solid #9ca3af' }}
            date={
              <div
                style={{
                  boxShadow: `${isDarkMode ? 'none' : "0 5px 12px rgba(0, 0, 0, 0.15)"}`,
                  borderRadius: "5px",
                  overflow: "hidden",
                  width: "95%",
                }}
              >
                <img style={{ objectFit: "cover" }} src={`${isDarkMode ? darkLogin : lightLogin}`} />
              </div>
            }
            iconStyle={{
              background: `${isDarkMode ? '#141414' : 'white'}`,
              color: `${isDarkMode ? 'white' : '#404040'}`,
              fontSize: "1.5rem",
            }}
            icon={<RiNumber1 />}
          > <h2 className=' font-bold text-4xl dark:text-gray-300 '>Step 1</h2>
            <h3 className="font-semibold !mt-2">Sign Up or Login</h3>
            <p className='!mt-4 !font-normal text-gray-700 dark:text-gray-300'>
              You can sign up by filling your details or if you're already signed up you can simply log in to your existing account with your credentials.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: `${isDarkMode ? '#141414' : '#f3f4f6'}`,
              color: `${isDarkMode ? '#fff' : 'black'}`,
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              padding: '2rem 2rem',
              boxShadow: `${isDarkMode ? 'none' : "0 5px 12px rgba(0, 0, 0, 0.15)"}`,
            }}
            contentArrowStyle={{ borderRight: '0.4rem solid #9ca3af' }}
            date={
              <div
                style={{
                  boxShadow: `${isDarkMode ? 'none' : "0 5px 12px rgba(0, 0, 0, 0.15)"}`,
                  borderRadius: "5px",
                  overflow: "hidden",
                  width: "95%",
                }}
              >
                <img style={{ objectFit: "cover" }} src={`${isDarkMode ? darkCreate : lightCreate}`} />
              </div>
            }
            iconStyle={{
              background: `${isDarkMode ? '#141414' : 'white'}`,
              color: `${isDarkMode ? 'white' : '#404040'}`,
              fontSize: "1.5rem",
            }}
            icon={<RiNumber2 />}
          >
            <h2 className=' font-bold text-4xl dark:text-gray-300 '>Step 2</h2>
            <h3 className="font-semibold !mt-2">Create and Organize</h3>
            <p className='!mt-4 !font-normal text-gray-700 dark:text-gray-300'>
              Click the "Create Note" or "+" button and start jotting down your thoughts with our user friendly interface and organize your thoughts and ideas!
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: `${isDarkMode ? '#141414' : '#f3f4f6'}`,
              color: `${isDarkMode ? '#fff' : 'black'}`,
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              padding: '2rem 2rem',
              boxShadow: `${isDarkMode ? 'none' : "0 5px 12px rgba(0, 0, 0, 0.15)"}`,
            }}
            contentArrowStyle={{ borderRight: '0.4rem solid #9ca3af' }}
            date={
              <div
                style={{
                  boxShadow: `${isDarkMode ? 'none' : "0 5px 12px rgba(0, 0, 0, 0.15)"}`,
                  borderRadius: "5px",
                  overflow: "hidden",
                  width: "95%",
                }}
              >
                <img style={{ objectFit: "cover" }} src={`${isDarkMode ? darkView : lightView}`} />
              </div>
            }
            iconStyle={{
              background: `${isDarkMode ? '#141414' : 'white'}`,
              color: `${isDarkMode ? 'white' : '#404040'}`,
              fontSize: "1.5rem",
            }}
            icon={<RiNumber3 />}
          >
            <h2 className=' font-bold text-4xl dark:text-gray-300 '>Step 3</h2>
            <h3 className="font-semibold !mt-2">Access anywhere and Download</h3>
            <p className='!mt-4 !font-normal text-gray-700 dark:text-gray-300'>
              Access your notes on any device by just logging in into your account & you can access it anytime & anywhere, You can also download your notes in text format.
            </p>
          </VerticalTimelineElement>

      </VerticalTimeline>
</div>

    
    </div>
  )
}

export default HowWorks