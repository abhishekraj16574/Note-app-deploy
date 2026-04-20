import React from 'react'
import Signup from './Component/Signup'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './Component/Login'
import { AuthProvider } from './Context/Auth'
import Protected from './Component/Protected'
import Home from './Component/Home'
import Contact from './Component/Contact'
import About from './Component/About'
import Footer from './Component/Footer'
import Navbar from './Component/Navbar'
import PublicRoute from './Component/PublicRoute/PublicRoute'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

      <Navbar />
    <div className='flex flex-col bg-gray-100 min-h-screen'>
     <Routes>
      <Route path='/' element={
        <Protected>
         <Home />
        </Protected>
      } />

      <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      }/>
      <Route path="/login" element={
        <PublicRoute>
           <Login />
        </PublicRoute>
        
        }/>
       <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
     </Routes>
    </div>

    <Footer />
    </BrowserRouter>
    </AuthProvider>
    
   
  )
}

export default App
