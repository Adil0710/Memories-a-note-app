import dark from "../assets/dark.png"
import light from "../assets/light.png"
import { theme, ConfigProvider, Divider, Card } from 'antd';
import { CheckOutlined, CrownOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeProvider';
import React, { useEffect } from 'react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { gsap, CSSPlugin, Expo } from 'gsap';
gsap.registerPlugin(CSSPlugin, ScrollTrigger);

function FreeToUse() {

    const {isDarkMode} = useTheme()

      useEffect(() => {
        const mm = gsap.matchMedia();

        gsap.from(".container img", {
          y: 100,
          duration: 1,
          opacity: 0,
          ease: Expo.easeInOut,
          scrollTrigger: {
            trigger: ".container",
            start: "top 80%", // animation starts when the top of the element hits 80% of the viewport height
            end: "top 20%",
            toggleActions: "play none none none", // play the animation on scroll
            scrub: true,
          }
        });

        mm.add("(min-width: 768px)", () => {
            // Animations for larger screens
            gsap.from(".price p", {
                y: 50,
                duration: 0.7,
                stagger: 0.5,
                delay: 0.5,
                opacity: 0,
                ease: Expo.easeInOut,
                scrollTrigger: {
                    trigger: ".price",
                    start: "top 10%", //5
                    end: "top 90%",   //70
                    toggleActions: "play none none none",
                    scrub: 1,
                }
            });
        });

        mm.add("(min-width: 768px)", () => {
          // Animations for larger screens
          gsap.from(".card", {
              scale: 0.5,
              duration: 0.5,
              opacity: 0,
              ease: Expo.easeInOut,
              scrollTrigger: {
                  trigger: ".card",
                  start: "top 10%",  //10
                  end: "top 90%",  //60
                  toggleActions: "play none none none",
                  scrub: 1,
              }
          });
      });

        mm.add("(max-width: 767px)", () => {
            // Animations for mobile screens
            gsap.from(".price p", {
                y: 30,
                duration: 0.5,
                stagger: 0.3,
                delay: 0.3,
                opacity: 0,
                ease: Expo.easeInOut,
                scrollTrigger: {
                    trigger: ".price",
                    start: "top 20%",
                    end: "top 60%",
                    toggleActions: "play none none none",
                    scrub: 1,
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
          // Animations for mobile screens
          gsap.from(".card", {
              scale: 0.5,
              duration: 0.5,
              opacity: 0,
              ease: Expo.easeInOut,
              scrollTrigger: {
                  trigger: ".card",
                  start: "top 30%",
                  end: "top 60%",
                  toggleActions: "play none none none",
                  scrub: 1,
              }
          });
      });
        return () => mm.revert(); // Cleanup matchMedia listeners on component unmount
    }, []);

  return (
    <div className='bg-white w-full dark:bg-[#0b0b0b] min-h-screen lg:px-19 sm:px-10 px-2 pb-32'>

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
            <h1 className='price font-[Prompt] dark:text-white opacity-80 flex flex-row items-center justify-center text-4xl font-medium text-center capitalize pt-14 pb-5'>
                    <p className='mx-2'>Premium</p> <p className='mx-2'>Access?</p>
                </h1>
            </ConfigProvider>

            <div className="sm:px-5 flex items-center justify-center px-8 mt-20">

              <Card className="card pb-5 sm:w-[50%] shadow w-full gradient-card text-black text-opacity-80"
              >
                <div className=" pb-10 sm:pt-6 pt-8 relative">
                  <h2 className="text-center font-bold text-3xl">Free</h2>
                  <h2 className="font-bold text-2xl line-through text-[#535353] absolute top-6 right-12 sm:right-[35%] sm:top-4">$10</h2>
                  <h2 className="font-bold text-md px-2 rounded-full absolute -top-3 left-0 border border-black border-opacity-70">Premium <CrownOutlined/></h2>
                </div>

                <div className=" flex items-center w-full justify-center sm:flex-row flex-col">
                  <div className=" sm:w-[50%] sm:h-40 sm:pr-5 text-center sm:text-left">
                    <p className=" text-lg font-medium">Turn messy thoughts into actionable notes</p>
                    <p className="mt-5">Write your ideas and turn you ramblings into usable content. Create unlimited notes, and access it or download it from anywhere and anytime.</p>
                  </div>
                  
                  <Divider type="vertical" className="sm:flex hidden h-52" style={{borderLeft: '1px solid #757575'}} />
                  <Divider className="flex sm:hidden text-black text-opacity-80" style={{borderTop: '1px solid #757575'}} />
               
                  <div className="sm:w-[50%] sm:h-40 sm:pl-10 text-center sm:text-left">
                      <p className=" text-lg font-medium">Memories include:</p>
                      <p className=" mt-5"><CheckOutlined/> Unlimited notes</p>
                      <p><CheckOutlined/> Lifetime access</p>
                      <p><CheckOutlined/> Download notes</p>
                     
                      <p><CheckOutlined/> Cross-Device sync</p>
                      <p><CheckOutlined/> Modern Ui and UX</p>
                      <p><CheckOutlined/> Secure cloud storage</p>
                  </div>
                </div>
              </Card>

            </div>
        
        

    </div>
  )
}

export default FreeToUse