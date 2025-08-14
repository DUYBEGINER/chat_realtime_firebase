import { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AppChat from './Pages/AppChat'
import { Routes, Route } from 'react-router'
function App() { useState(0)

  return (
    <div className="app-container bg-slate-800 ">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appchat" element={<AppChat />} />
      </Routes>
    </div>
  )
}

export default App

