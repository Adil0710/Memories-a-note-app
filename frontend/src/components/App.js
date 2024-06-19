import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import { Button, ConfigProvider } from "antd";
import authStore from "../stores/authStore";
import { Toaster } from "react-hot-toast";
import { TinyColor } from '@ctrl/tinycolor';
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeProvider";


const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function App() {
    const store = authStore()
    const { isDarkMode } = useTheme(); // Use the theme context

return (
<div className={`App ${isDarkMode ? "dark" : ""} bg-gray-100 dark:bg-[#0b0b0b] min-h-screen w-full drk dark:drk`}>


<BrowserRouter>
      <nav className=" fixed w-full flex justify-between items-center px-5 py-2 nav-bar dark:bg-black dark:bg-opacity-70 dark:backdrop-filter dark:backdrop-blur-[1px] border-b-slate-200 dark:border-[#303030] border-b z-50"> 
        <div className="flex flex-col items-center justify-center ">
       
          <h1 className="sm:text-2xl font-bold gradient-text">Memories <i className="ri-sparkling-2-fill gradient-text"></i></h1>
          
          <h1 className="text-[10px] text-gray-500 dark:text-gray-300">A Note Taking App</h1>
        </div>
        <div className=" flex items-center justify-center gap-5">
            {!store.loggedIn ? (
                <>
          <Button size="small"><Link to="/">Home</Link></Button>
          
          <ConfigProvider
                theme={{
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
          <Button type="primary" size="small"><Link to="/login">Login</Link></Button>
          </ConfigProvider>
        
          <Link to="/signup" size="small">Sign Up</Link>
          </>
        ) : (
          <>
          <p className="text-gray-500 dark:text-gray-300 sm:text-base text-xs">Welcome back, {store.userData} !</p>
          <Button type="primary" size="small" danger><Link to="/logout">Logout</Link></Button>
          </>
        )
        }
       
        <ThemeToggle />
        </div>
        
      </nav>
      

    <Routes>
      <Route index element={<RequireAuth><NotesPage /></RequireAuth>}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/logout" element={<LogoutPage />}/>
    </Routes>
  </BrowserRouter>
  <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        borderRadius: '10px',
                        background: isDarkMode ? '#141414' : '', // Conditional background color
                        color: isDarkMode ? '#fff' : '', // Conditional text color
                    },
                }}
            />
</div>
);
}

export default App;