import { Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  return <Outlet />
}

export { ProtectedRoutes as ProtectedRoute }
export default ProtectedRoutes
