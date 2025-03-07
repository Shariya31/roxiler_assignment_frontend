import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Login = lazy(()=>import('./pages/Login'))
const Signup =  lazy(()=>import('./pages/Signup'))
const Temp = lazy(()=>import('./pages/Temp')) 
const ForgotPassword =  lazy(()=>import('./pages/ForgotPassword'))
const  Home = lazy(()=>import('./pages/Home'))
const Header = lazy(()=>import('./components/Header'))
const ResetPassword = lazy(()=> import('./pages/ResetPassword'));
const Dashboard = lazy(()=>import('./pages/admin/Dashboard')) 
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
          <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/temp' element={<Temp/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App