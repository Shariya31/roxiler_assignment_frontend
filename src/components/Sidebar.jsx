import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const role = userData.user.role
  return (
    <div className='h-full flex flex-col items-start justify-start p-8 gap-5 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
        {role === 'admin' ? <Link to='/admin/dashboard'>Dashboard</Link> : <Link to='/owner/dashboard'>Dashboard</Link>}
        {role === 'admin' && <Link to='/admin/stores'>Stores</Link> }       
        {role === 'admin' && <Link to='/admin/users'>Users</Link>}        
    </div>
  )
}

export default Sidebar