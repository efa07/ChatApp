import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera ,User,Mail } from 'lucide-react'

const ProfilePage = () => {
  const { authUser, isupdatingProfile, updateProfile } = useAuthStore()
  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-6'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold'>Profile</h1>
            <p className='text-base'>Welcome back, {authUser?.fullName}</p>
          </div>

          {/* avatar upload */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img
                src={authUser?.profilePic || '/public/hacker.png'}
                alt='avatar'
                className='size-32 rounded-full object-cover border-4'
              />
              <label
                htmlFor='avatar'
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105
              p-2 rounded-full cursor-pointer transition-all duration-300 ${isupdatingProfile ? 'animate-pulse pointer-events-none' : ''} `}>
                <Camera className='w-5 h-5 text-base-200' />
                <input
                  type='file'
                  id='avatar'
                  className='hidden'
                  // onChange={handleImageUpload}
                  disabled={isupdatingProfile}
                />
              </label>
            </div>
            <div>
              <p className='text-sm text-base-content'>
                {isupdatingProfile ? 'Updating profile...' : 'Update profile picture'}

              </p>
            </div>

            {/* user info section */}
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-ainc-400 flex items-center gap-2'>
                <User className="w-4 h-4" />
                  Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>
                {authUser?.fullName}
              </p>
            </div>

            <div className='space-y-1.5'>
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>
                {authUser?.email}
              </p>
            </div>

            <div className='mt-6 bg-base-300 rounded-xl p-6'>
              <h2 className='text-lg font-medium mb-4'>
                Account Info
              </h2>
              <div className='flex items-center justify-between py-2'>
                <span>Account created</span>
                <span>{authUser.createdAt?.split("|","0")}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account Status</span>
                <span className='text-green-500'>
                  Active
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage