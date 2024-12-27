import React, { Profiler } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Settings, User,LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const { logout, authUser } = useAuthStore()
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">Efa Chat</Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle avatar"
  >
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS Navbar component"
        src="https://lh3.googleusercontent.com/a/ACg8ocJ0QW2IUpuGS3aid-qjdWSZn9ely5b52tjTWpIyPNG4Y-xzyQE=s288-c-no"
      />
    </div>
  </div>
  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow-md space-y-2 transition-all"
  >
    {authUser && (
      <>
        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-primary hover:text-white"
        >
          <User className="w-5 h-5" />
          <span className="hidden sm:inline">Profile</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-primary hover:text-white"
        >
          <Settings className="w-5 h-5" />
          <span className="hidden sm:inline">Settings</span>
        </Link>

        <button
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition-all hover:bg-error hover:text-white"
          onClick={logout}
        >
          <LogOut className="w-5 h-5"/>
          <span className="hidden sm:inline">
            Logout
            </span>
        </button>
      </>
    )}
  </ul>
</div>

        </div>
      </div>
    </>
  )
}

export default Navbar 