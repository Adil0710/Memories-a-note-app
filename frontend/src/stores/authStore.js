import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const authStore = create((set) => ({
    loggedIn: null,
    userData: null,
    loginForm: {
        email:"",
        password:""
    },

    signupForm: {
        name:"",
        email:"",
        password:""
    },

    updateLoginForm: (e) => {
        const  {name, value} = e.target
        
        set((state) => {
            return{
                loginForm:{
                    ...state.loginForm,
                [name]: value,
                }
            }
        })
    },

    login: async() => {

        try {
            const { loginForm} = authStore.getState()

            const promise = toast.promise(
                axios.post('/login', loginForm),
                {
                    loading: 'Logging in...', // Loading message
                    success: (res) => {
                        return `${res.data.user}, ${res.data.msg}`; // Success message
                    },
                    error: (error) => {
                        return error.response?.data?.msg || 'An error occurred while logging in.'; // Error message
                    },
                }
            );

            const res = await promise
            localStorage.setItem('userData', JSON.stringify(res.data.user)); // Save user data to localStorage
            set({loggedIn: true, loginForm:{
                email:'',
                password:'',
            },
            userData: res.data.user, // Set user data after successful login
        })
            // toast.success(`${res.data.user}, ${res.data.msg}`);
            console.log(res);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },

    checkAuth: async () => {
        try {
            await axios.get('/check-auth')
            set({loggedIn: true})  
        } catch (error) {
            set({loggedIn: false})
            console.log(error);
        }
    },

    updateSignupForm: (e) => {
        const  {name, value} = e.target
        
        set((state) => {
            return{
                signupForm:{
                    ...state.signupForm,
                [name]: value,
                }
            }
        })
    },

    signup: async() => {

        try {
            const { signupForm} = authStore.getState()


            const promise = toast.promise(
                axios.post('/signup', signupForm),
                {
                    loading: 'Signing up...', // Loading message
                    success: (res) => {
                        return `${res.data.msg}`; // Success message
                    },
                    error: (error) => {
                        return error.response?.data?.msg || 'An error occurred while logging in.'; // Error message
                    },
                }
            );
           const res = await promise
            console.log(res);
            set({
                signupForm:{
                    name:'',
                    email:'',
                    password:'',
                }
            })
        } catch (error) {
            console.log(error)
        }
    },

    logout: async () => {
        try {
            const promise = toast.promise(
                axios.get('/logout'),
                {
                    loading: 'Logging out...', // Loading message
                    success: (res) => {
                        return `${res.data.msg}`; // Success message
                    },
                    error: (error) => {
                        return error.response?.data?.msg || 'An error occurred while logging out.'; // Error message
                    },
                }
            );
    
            const res = await promise;
            localStorage.removeItem('userData'); // Remove user data from localStorage
            console.log(res);
            // Update state after successful logout
            set({ loggedIn: false });
    
        } catch (error) {
            console.log(error);
        }
    }
}))

export default authStore