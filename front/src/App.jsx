import React from 'react'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Settings from './pages/Settings'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import { Navigate } from 'react-router-dom'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} =  useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser})
  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <>
    <Navbar />
    <Routes>
    <Route path="/"  element={authUser ? <Home /> : <Navigate to="/login" />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
    </>
  )
}

export default App