import { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AppChat from './Pages/ChatRoom/AppChat'
import { Routes, Route } from 'react-router'
import { ToastContainer } from "react-toastify";
import  AuthProvider from './context/AuthProvider';
import "react-toastify/dist/ReactToastify.css";

function App() { useState(0)

  return (
    <div className="app-container bg-slate-800 ">
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
     
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AppChat />} />
        </Routes>
    </AuthProvider>
  </div>
  )
}

export default App

