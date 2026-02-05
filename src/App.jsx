import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Verify from "../src/pages/Verify"
import { UserData } from '../context/UserContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authLoading , isAuth} = UserData()
   

  if (authLoading) {
    return <h2 style={{textAlign:"center"}}>Loading...</h2>;
  }
  return (
    <>
     <Toaster   reverseOrder={false} />
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {isAuth ? <Home/>: <Login/>} />
      <Route path = "/login" element = {<Login/>} />
      <Route path = "/verify" element = {<Verify/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App