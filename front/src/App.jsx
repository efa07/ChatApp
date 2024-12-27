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
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} =  useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }


  return (
    <>
    {/* Navbar is displayed only if the user is authenticated */}
    {
      authUser ? <Navbar /> : null
    }

    <Routes>
    <Route path="/"  element={authUser ? <Home /> : <Navigate to="/login" />} />
    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />}  />
    <Route path="/login" element={! authUser ? <LoginPage /> : <Navigate to="/" />} />
    <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />}  />
    <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
    </Routes>
    <Toaster />

    </>
  )
}

export default App