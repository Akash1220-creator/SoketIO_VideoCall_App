import { Toaster } from "react-hot-toast"
import { Login } from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoutes"
import Protectedlayout from "./components/ProtectedLayout"
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Session from "./pages/Session"
import Pricing from "./pages/Pricing"
import MeetingRoom from "./pages/MeetingRoom"

const App = () => {
  return (
    <div>
      <Toaster />
      
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login mode="login" />} />
        <Route path='/register' element={<Login mode="register" />} />  
        <Route path='/' element={<Navigate to="/login" replace />} />

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Protectedlayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/sessions' element={<Session />} />
            <Route path='/pricing' element={<Pricing />} />
          </Route>
         <Route path='*' element={<MeetingRoom />} /> 
        </Route>

        {/* other Routes */}
        <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  )
}

export default App
