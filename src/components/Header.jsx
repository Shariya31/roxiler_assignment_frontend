import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header = () => {
  const {role, user:{name}} = useSelector(state => state.user)
  console.log(role, name)
  const navigate = useNavigate();
  return (
    <div className='flex gap-8 justify-end p-4 bg-gray-400'>
      <Link to="/">Home</Link>
      <button className='cursor-pointer' onClick={()=>navigate('/login')}>Login</button>
      <button className='cursor-pointer' onClick={()=>navigate('/signup')}>Signup</button>
      {role === "admin" && <Link to="/admin-dashboard">Admin Dashboard</Link>}
      {role === "store_owner" && <Link to="/store-dashboard">Store Dashboard</Link>}
      <Link to="/logout">Logout</Link>
      <button>{name}</button>
    </div>
  )
}

export default Header