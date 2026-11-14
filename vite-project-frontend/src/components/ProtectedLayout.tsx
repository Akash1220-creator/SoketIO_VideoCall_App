import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const ProtectedLayout = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-slate-50 text-slate-900 flex flex-col font-sans bg-[url('/layout_bg.png')] bg-cover bg-center bg-no-repeat">

      <Navbar/>

      <main className="flex-1 flex flex-col">
      <Outlet />
      </main>
      
      <Footer/>
    </div>
  )
}

export { ProtectedLayout as Protectedlayout }
export default ProtectedLayout
