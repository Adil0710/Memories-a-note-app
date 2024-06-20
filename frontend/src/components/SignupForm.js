import React from 'react';
import authStore from '../stores/authStore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, Form, Grid, Input, Typography, theme, ConfigProvider } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeProvider';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

function SignupForm() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const store = authStore();
  const navigate = useNavigate();
  const {isDarkMode} = useTheme()

  const handleSignup = async (values) => {
    try {
      await store.signup(); // Attempt to signup with form values
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const handleChange = (e) => {
    store.updateSignupForm(e); // Delegate form field changes to store
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

          <Title style={styles.title}>Sign up</Title>
          <Text style={styles.text}>
            Join us! Create an account to get started.
          </Text>
        </div>
        <Form
          name="normal_signup"
          onFinish={handleSignup}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Name"
              onChange={handleChange} // Handle change using store method
              value={store.signupForm.name} // Bind value directly from store
              name="name" // Ensure name attribute matches field name
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: 'email', required: true, message: 'Please input your Email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              onChange={handleChange} // Handle change using store method
              value={store.signupForm.email} // Bind value directly from store
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
              value={store.signupForm.password} // Bind value directly from store
              name="password" // Ensure name attribute matches field name
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Already have an account?</Text>{' '}
              <RouterLink to="/login"><Link>Log in</Link></RouterLink>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
    </ConfigProvider>
  );
}

export default SignupForm;
