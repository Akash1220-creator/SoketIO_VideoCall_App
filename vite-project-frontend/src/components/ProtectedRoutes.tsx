import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = () => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export { ProtectedRoutes as ProtectedRoute }
export default ProtectedRoutes
