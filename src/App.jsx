import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
const CreateUser = lazy(() => import('./pages/admin/management/CreateUser'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const CreateStore = lazy(() => import('./pages/admin/management/CreateStore'))
const AdminStores = lazy(() => import('./pages/admin/AdminStores'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Temp = lazy(() => import('./pages/Temp'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Home = lazy(() => import('./pages/Home'))
const Header = lazy(() => import('./components/Header'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const OwnerDashboard = lazy(() => import('./pages/owner/Dashboard'))
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />

          {/* Admin path */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/stores' element={<AdminStores />} />
            <Route path='/admin/users' element={<AdminUsers />} />
            <Route path='/admin/create-user' element={<CreateUser />} />
          </Route>

          {/* Store owner path */}
          <Route element={<ProtectedRoute roles={['admin','store_owner']} />}>
            <Route path='/admin/create-store' element={<CreateStore />} />

            <Route path='/owner/dashboard' element={<OwnerDashboard />} />
          </Route>
          <Route path='*' element={<Temp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App