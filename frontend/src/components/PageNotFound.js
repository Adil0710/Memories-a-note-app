import React from 'react';
import { Button, ConfigProvider, Result, theme } from 'antd';
import { useTheme } from '../context/ThemeProvider';
import { Link } from 'react-router-dom';

function PageNotFound() {
    const {isDarkMode} = useTheme()
  return (
    <div className=' min-h-screen w-full flex items-center justify-center pt-12'>
        
         <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            componentSize="full"
        >

            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button size="small" shape='round' type='primary'><Link to="/">Home</Link></Button>}
            />

        </ConfigProvider>

    </div>
  )
}

export default PageNotFound