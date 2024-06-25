import React from 'react';
import authStore from '../stores/authStore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Form, Grid, Input, Typography, theme, ConfigProvider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeProvider';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

function LoginForm() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const store = authStore();
  const navigate = useNavigate();
  const {isDarkMode} = useTheme()

  const handleLogin = async (values) => {

    const success = await store.login();
    if (success){
      navigate('/notes');
    }
  };

  const handleChange = (e) => {
    store.updateLoginForm(e); // Delegate form field changes to store
  };
  
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL,
      display: 'flex', // Added to center content vertically
    flexDirection: 'column', // Added to center content vertically
    alignItems: 'center', // Added to center content vertically
    textAlign: 'center', // Added for text alignment
    },
    section: {
      alignItems: "center",
      
      display: "flex",
      height: screens.sm ? "100vh" : "100vh",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "10px"
    },
    text: {
      marginTop: '16px',
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      marginTop: '16px',
    }
  };
  
  return (
    <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
      <section className=' dark:bg-[#141414]' style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
        <i className="ri-sparkling-2-fill gradient-text text-4xl"></i>

          <Title style={styles.title}>Login</Title>
          <Text style={styles.text}>
            Welcome back to <span className=' gradient-text font-bold'>Memories <i className="ri-sparkling-2-fill gradient-text"></i></span> Please enter your details below to
            login.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              onChange={handleChange} // Handle change using store method
              value={store.loginForm.email} // Bind value directly from store
              name="email" // Ensure name attribute matches field name
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              onChange={handleChange} // Handle change using store method
              value={store.loginForm.password} // Bind value directly from store
              name="password" // Ensure name attribute matches field name
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text>{' '}
              <RouterLink to="/signup"><Link>Sign up now</Link></RouterLink>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
    </ConfigProvider>
  );
}



export default LoginForm;
