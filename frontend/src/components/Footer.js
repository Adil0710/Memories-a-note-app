import { ConfigProvider, Divider, theme } from 'antd'
import React from 'react'
import { useTheme } from '../context/ThemeProvider'
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";


function Footer() {
  const {isDarkMode} = useTheme()
  return (
    <footer className=" bg-gray-100 dark:bg-[#050505] py-6 text-center lg:px-19 sm:px-10 px-2  text-[#494949] dark:text-white dark:text-opacity-60">
      <ConfigProvider
          theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
      >
          <div className=' flex items-center sm:justify-between sm:gap-0 gap-5 sm:flex-row flex-col justify-center'>

            <div className=' flex items-center justify-center sm:flex-row flex-col gap-2'>
              <p className="sm:text-sm font-bold gradient-text">Memories <i className="ri-sparkling-2-fill gradient-text"></i></p>
              <Divider type='vertical' className=' h-5 hidden sm:flex'/>
              <p className=' text-xs'>&copy; {new Date().getFullYear()} Memories. All rights reserved.</p>
            </div>

            <div className=' flex items-center justify-center gap-5 text-xl'>
            <a href='https://www.instagram.com/code_with_adil?igsh=NTc2dTRudnc1ZnYz' target='_blank'><FaInstagram className='hover:text-rose-600 transition-all duration-200'/></a> 
              <a href='https://x.com/AdilPat21587273' target='_blank'><FaXTwitter className=' dark:hover:text-gray-50 hover:text-black transition-all duration-200'/></a>
              <a href='https://www.linkedin.com/in/adil-patel-737692252/' target='_blank'><FaLinkedin className=' hover:text-blue-500 transition-all duration-200'/></a>
              <a href='https://github.com/adil0710' target='_blank'><FaGithub className=' dark:hover:text-gray-50 hover:text-black transition-all duration-200'/></a>
            </div>

          </div>
     
      <Divider/>
        
        <div className=' flex items-center justify-center text-md'>
          <p>Developed by</p> <Divider type='vertical' className=' h-5'/> <a className=' font-semibold hover:text-black dark:hover:text-white dark:text-white dark:text-opacity-80 transition-all duration-200' href='https://adil0710.github.io' target='_blank'>Adil Patel</a>
        </div>
      </ConfigProvider>
  </footer>
  )
}

export default Footer