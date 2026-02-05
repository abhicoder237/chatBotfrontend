// import 

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { server } from "../src/main";

const UserContext = createContext()

export const UserProvider = ({children}) =>{
    // for login 
    // loading
    const [btnLoading , setBtnLoading] = useState(false)
    const loginUser = async (email , navigate)=>{
        setBtnLoading(true)
        try {
            const {data} = await axios.post(`${server}/api/user/login` ,{email})
            toast.success(data.message)
            localStorage.setItem("verifyToken" ,data.verifyToken)
            navigate("/verify")
            setBtnLoading(false)
        } catch (error) {
              toast.error(error?.response?.data?.message || error.message || "Something went wrong")
           
        }finally{
             setBtnLoading(false)
        }
    }

    // for verify user
    
    const [user , setUser] = useState(null)
    // create a state for authentication
    const [ isAuth , SetIsAuth] = useState(false)

    const verifyUser = async (otp , navigate)=>{
        // verify token
        const verifyToken = localStorage.getItem("verifyToken")
        setBtnLoading(true)
        
        if(!verifyToken) return toast.error("Please Verify TOen")
        try {
            const {data} = await axios.post(`${server}/api/user/verify` ,{otp , verifyToken})
            toast.success(data.message)
            localStorage.removeItem("verifyToken")
            localStorage.setItem("token" ,data.token)
            
            setBtnLoading(false)
            SetIsAuth(true)
            setUser(data.user)
            navigate("/")
        } catch (error) {
              toast.error(error?.response?.data?.message || error.message || "Something went wrong")
           
        }finally{
             setBtnLoading(false)
        }
    }

    // for profile 
    const [authLoading, setAuthLoading] = useState(true)
    const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      SetIsAuth(false);
      setUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      SetIsAuth(true);
      setUser(data);
    } catch (error) {
      console.log(error);
      SetIsAuth(false);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

    // use effect hook 
    useEffect(()=>{
        fetchProfile()
    },[])

    // handle logout
    const handleLogout = async (navigate) =>{
      try {
        localStorage.clear()
        SetIsAuth(false)
        setUser([])
        navigate("/login")
        toast.success("See You Soon")
       
      } catch (error) {
        console.log(error)
      }
    }

   return  <UserContext.Provider value={{loginUser ,btnLoading , isAuth , SetIsAuth , verifyUser , user , authLoading , handleLogout}}>
        {children}
     </UserContext.Provider>
}

export const UserData =  () => useContext(UserContext)