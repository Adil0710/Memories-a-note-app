import { useTheme } from '../context/ThemeProvider';
import { Form, Input, theme, ConfigProvider, Space } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, CSSPlugin, Expo } from 'gsap';
import { FaPaperPlane } from "react-icons/fa";
gsap.registerPlugin(CSSPlugin, ScrollTrigger);

const { TextArea } = Input;

function ContactUs() {
    const { isDarkMode } = useTheme();
    const formRef = useRef();

    const sendEmail = async (values) => {
      try {
          const promise = toast.promise(
              emailjs.send('service_bfw2dei', 'template_1dfl2qi', values, 'C5GQkC8rOL0eONf2-'),
              {
                  loading: 'Sending your message...', // Pending message
                  success: 'Message sent successfully!', // Success message
                  error: 'An error occurred while sending your message.', // Error message
              }
          );

          const res = await promise;
          console.log(res);
          formRef.current.resetFields(); // Reset the form fields
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
        // Animations for larger screens
        gsap.from(".contact p", {
            y: 50,
            duration: 0.7,
            stagger: 0.5,
            delay: 0.5,
            opacity: 0,
            ease: Expo.easeInOut,
            scrollTrigger: {
                trigger: ".contact",
                start: "top 10%", //5
                end: "top 90%",  //60
                toggleActions: "play none none none",
                scrub: 1,
            }
        });
    });

    mm.add("(max-width: 767px)", () => {
        // Animations for mobile screens
        gsap.from(".contact p", {
            y: 30,
            duration: 0.5,
            stagger: 0.3,
            delay: 0.3,
            opacity: 0,
            ease: Expo.easeInOut,
            scrollTrigger: {
                trigger: ".contact",
                start: "top 20%",
                end: "top 60%",
                toggleActions: "play none none none",
                scrub: 1,
            }
        });
    });

    return () => mm.revert(); // Cleanup matchMedia listeners on component unmount
}, []);

    return (
        <div className='bg-gray-50 dark:bg-[#090909] min-h-[95vh] w-full sm:min-h-screen lg:px-19 sm:px-10 px-2'>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
                componentSize="full"
            >
                <h1 className='contact font-[Prompt] dark:text-white opacity-80 flex flex-row items-center justify-center text-4xl font-medium text-center capitalize pt-14 pb-5'>
                    <p className='mx-2'>Contact</p><p className='mx-2'>us</p>
                </h1>
                <h2 className='font-normal text-center text-base text-black text-opacity-60 dark:text-gray-400'>
                    We'd Love to Hear From You
                </h2>
                <div className="flex items-center justify-center w-full px-2 py-10 pb-14">
                    <Form
                        name="feedback"
                        layout="vertical"
                        className="cform w-full sm:w-1/2"
                        ref={formRef}
                        onFinish={sendEmail}
                    >
                        <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Your Name"
                                name="user_name"
                                allowClear
                                variant='filled'
                            />
                        </Form.Item>
                        <Form.Item
                            name="user_email"
                            rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Email"
                                allowClear
                                variant='filled'
                                name="user_email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            rules={[{ required: true, message: 'Please enter your message!' }]}
                        >
                            <TextArea
                                placeholder="Your message"
                                name="message"
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
                                <div className="fancy group bg-[#f1f1f1] dark:bg-[#000] border border-gray-300 dark:border-[#242424] specialBtn">
                                    <button className="fancy-button font-semibold text-black dark:text-white px-7 py-2" type="submit">
                                        Send <FaPaperPlane className="ml-2 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 text-xs" />
                                    </button>
                                </div>
                            </Form.Item>
                        </Space>
                    </Form>
                </div>
            </ConfigProvider>
        </div>
    );
}

export default ContactUs;
