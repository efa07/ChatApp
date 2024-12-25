import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Settings from './pages/Settings'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
    <Route path="/"  element={<Home />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </>
  )
}

export default App