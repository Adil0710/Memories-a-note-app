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

           const res = await axios.post('/login', loginForm)
            set({loggedIn: true, loginForm:{
                email:'',
                password:'',
            },
            userData: res.data.user, // Set user data after successful login
        })
            toast.success(`${res.data.user}, ${res.data.msg}`);
            console.log(res);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg);
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

           const res = await axios.post('/signup', signupForm)
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
        await axios.get('/logout')
        set({loggedIn: false})
    }
}))

export default authStore