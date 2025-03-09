import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header = () => {
  // const {role, user:{name}} = useSelector(state => state.user)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const name = userData.user.name
  const role = userData.user.role
  const navigate = useNavigate();
  
  return (
    <div className='flex gap-8 justify-end p-4 bg-gray-400 text-lg font-bold'>
      <Link className='hover:text-white ease-in-out duration-500' to="/">Home</Link>

      <button className='cursor-pointer hover:text-white ease-in-out duration-500' onClick={()=>navigate('/login')}>Login</button>

      <button className='cursor-pointer hover:text-white ease-in-out duration-500' onClick={()=>navigate('/signup')}>Signup</button>

      {role === "admin" && <Link className='hover:text-white ease-in-out duration-500' to="/admin/dashboard">Admin Dashboard</Link>}
      
      {role === "store_owner" && <Link className='hover:text-white ease-in-out duration-500' to="/owner/dashboard">Owner Dashboard</Link>}
      {/* <Link onClick={handleLogout}>Logout</Link> */}
      <button>{name}</button>
    </div>
  )
}

export default Header