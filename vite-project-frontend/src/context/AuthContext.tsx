import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { dummyUser } from '../assets/assets'
import type { DummyUser } from '../types'

interface AuthContextType {
  user: DummyUser | null
  isSignedIn: boolean
  login: (userData?: Partial<DummyUser>) => void
  logout: () => void
}
//AuthContext is a class created by createContext() method for using useContext() hook to all over the application  
const AuthContext = createContext<AuthContextType | undefined>(undefined)
//AuthProvider is a component that provides the authentication context to its children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DummyUser | null>(dummyUser)
  //login is a function that updates the user state by using setUser() method 
  const login = (userData?: Partial<DummyUser>) => {
    if (userData) {
      setUser({ ...dummyUser, ...userData })
    } else {
      setUser(dummyUser)
    }
  }
  //logout is a function that updates the user state by using setUser() method 
  const logout = () => setUser(null)
//
  return (
    <AuthContext.Provider value={{ user, isSignedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}