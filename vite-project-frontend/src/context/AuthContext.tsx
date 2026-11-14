import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { dummyUser } from '../assets/assets'
import type { DummyUser } from '../types'

interface AuthContextType {
  user: DummyUser | null
  isSignedIn: boolean
  login: (userData?: Partial<DummyUser>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'meetup_auth_user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DummyUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    // Default to dummyUser so existing flow works smoothly
    return dummyUser
  })

  const isSignedIn = !!user

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // ignore
    }
  }, [user])

  const login = (userData?: Partial<DummyUser>) => {
    const updatedUser: DummyUser = {
      ...dummyUser,
      ...userData,
      primaryEmailAddress: {
        emailAddress: userData?.primaryEmailAddress?.emailAddress || dummyUser.primaryEmailAddress.emailAddress,
      },
    }
    setUser(updatedUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isSignedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
