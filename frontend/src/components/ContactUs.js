import { useTheme } from '../context/ThemeProvider';
import { Form, Input, theme, ConfigProvider, Space, Divider, } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { gsap, CSSPlugin, Expo } from 'gsap';
import { FaPaperPlane } from "react-icons/fa";
gsap.registerPlugin(CSSPlugin, ScrollTrigger);


const {TextArea} = Input

function ContactUs() {
    const {isDarkMode} = useTheme()


  

    useEffect(() => {
    
        gsap.from(".contact p", {
          y: 50,
          duration: 0.7,
          stagger:0.5,
          delay:0.5,
          opacity: 0,
          ease: Expo.easeInOut,
          scrollTrigger: {
            trigger: ".contact",
            start: "top 0%", // animation starts when the top of the element hits 80% of the viewport height
            end: "top 60%",
            toggleActions: "play none none none", // play the animation on scroll
            scrub: 2,
          }
        });

        
      },[]);

  return (
    <div className='bg-gray-50 dark:bg-[#090909] w-full sm:min-h-screen lg:px-19 sm:px-10 px-2'>
      
        
      <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            componentSize="full"
        >

        <h1 className='contact font-[Prompt] dark:text-white opacity-80 flex flex-row items-center justify-center text-4xl font-medium text-center capitalize pt-14 pb-5'><p className=' mx-2'>Contact</p><p className=' mx-2'>us</p></h1>

      
        
     
        <h2 className=' font-normal text-center text-base text-black text-opacity-60 dark:text-gray-400 '>We'd Love to Hear From You</h2>
  
        <div className=" flex items-center justify-center w-full px-2 py-10 pb-14">

        

        <Form
          name="feedback"
          layout="vertical"
          className="w-full sm:w-1/2"
        >
             <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Your Name"
              name="name" // Ensure name attribute matches field name
              allowClear
              variant='filled'
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              allowClear
              variant='filled'
              name="email" // Ensure name attribute matches field name
            />
          </Form.Item>
          <Form.Item
            name="Message"
            rules={[{ required: true, message: 'Please enter your message!' }]}
          >
            <TextArea
              placeholder="Your message"
              name="message" // Ensure name attribute matches field 
              showCount
              allowClear
              variant='filled'
              style={{
                  height: 200,
                  resize: 'none',
              }}
            />
          </Form.Item>
         
          <Space>
          <Form.Item style={{ marginBottom: '0px' }}>
            <button type="submit">
            <div className="fancy group bg-[#f1f1f1] dark:bg-[#000] border border-gray-300 dark:border-[#242424] specialBtn">
              <button className="fancy-button font-semibold text-black dark:text-white px-7 py-2">
                Send <FaPaperPlane className="ml-2 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 text-xs" />
              </button>
            </div>
            </button>
           
          </Form.Item>
          </Space>
        </Form>
        </div>

    
       
    </ConfigProvider>
                
    </div>
  )
}

export default ContactUs