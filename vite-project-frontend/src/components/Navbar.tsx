import { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboardIcon,
  HistoryIcon,
  AstroidIcon,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useClickOutside } from '../hooks'
import toast from 'react-hot-toast'

interface UserButtonProps {
  afterSignOutUrl?: string
}

// Custom Profile Dropdown helper component that will be used in the navbar 
export const UserButton = ({ afterSignOutUrl = '/login' }: UserButtonProps) => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close dropdown on click outside using custom hook
  useClickOutside(dropdownRef, () => setIsOpen(false))

  const handleSignOut = () => {
    logout()
    setIsOpen(false)
    toast.success('Signed out successfully')
    navigate(afterSignOutUrl)
  }

  const userEmail = user?.primaryEmailAddress?.emailAddress || 'user@example.com'
  const userFullName = user?.fullName || user?.name || 'User'
  const userImage = user?.imageUrl

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 p-0.5 rounded-full ring-2 ring-slate-200 hover:ring-primary focus:outline-none transition-all cursor-pointer group"
      >
        {userImage ? (
          <img
            src={userImage}
            alt={userFullName}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
            {userFullName.charAt(0).toUpperCase()}
          </div>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 hidden sm:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* User Profile Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Profile Header */}
          <div className="p-3 bg-slate-50 rounded-xl mb-1.5 flex items-center gap-3">
            {userImage ? (
              <img
                src={userImage}
                alt={userFullName}
                className="size-10 rounded-full object-cover border border-white shadow-sm"
              />
            ) : (
              <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {userFullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {userFullName}
              </p>
              <p className="text-xs text-slate-500 truncate">{userEmail}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full">
                Premium Plan
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1 space-y-0.5 text-xs font-medium text-slate-700">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <LayoutDashboardIcon className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/sessions"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <HistoryIcon className="w-4 h-4 text-slate-400" />
              <span>Sessions History</span>
            </Link>

            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <AstroidIcon className="w-4 h-4 text-slate-400" />
              <span>Upgrade & Plans</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="my-1.5 border-t border-slate-100" />

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  const { isSignedIn, user } = useAuth()
  const location = useLocation()
  const userName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
    'User'

  return (
    <header className="w-full max-w-305 mx-auto bg-white/90 backdrop-blur xl:rounded-b-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between border border-slate-200">
      {/* Brand Logo & Navigation Links */}
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="flex items-center gap-1.5">
          <img src="/logo.svg" alt="MeetUp Logo" className="size-6.5" />
          <span className="text-2xl font-medium tracking-tight text-slate-900 flex items-center">
            MeetUp<span className="text-primary">.</span>
          </span>
        </Link>

        {isSignedIn && (
          <nav className="hidden md:flex items-center gap-1.5 ml-2">
            <Link
              to="/dashboard"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                location.pathname === '/dashboard'
                  ? 'ring ring-blue-100 bg-blue-50 text-slate-800'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboardIcon className="w-3.5 h-3.5" />
              Dashboard
            </Link>

            <Link
              to="/sessions"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                location.pathname === '/sessions'
                  ? 'ring ring-blue-100 bg-blue-50 text-slate-800'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <HistoryIcon className="w-3.5 h-3.5" />
              Sessions
            </Link>

            <Link
              to="/pricing"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                location.pathname === '/pricing'
                  ? 'ring ring-blue-100 bg-blue-50 text-slate-800'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <AstroidIcon className="w-3.5 h-3.5" />
              Pricing
            </Link>
          </nav>
        )}
      </div>

      {/* Right Profile / UserButton */}
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Link
            to="/sessions"
            className="md:hidden text-xs font-medium text-slate-600 hover:text-primary flex items-center gap-1"
          >
            <HistoryIcon className="w-4 h-4" />
            Sessions
          </Link>
          <span className="font-medium hidden sm:inline tracking-wide text-sm text-slate-700">
            Welcome, {userName}
          </span>
          <UserButton afterSignOutUrl="/login" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
