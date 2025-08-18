import { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AppChat from './Pages/ChatRoom/AppChat'
import { Routes, Route } from 'react-router'
import { ToastContainer } from "react-toastify";
import  AuthProvider from './context/AuthProvider';
import "react-toastify/dist/ReactToastify.css";
import AppProvider from './context/AppProvider'
import AddRoomModal from './components/Modal/AddRoomModal';
import InviteMemberModal from './components/Modal/InviteMemberModal'
function App() { useState(0)

  return (
    <div className="app-container bg-slate-800 ">
      <AuthProvider>
        <AppProvider>
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
        <AddRoomModal />
        <InviteMemberModal />
        </AppProvider>
    </AuthProvider>
  </div>
  )
}

export default App

