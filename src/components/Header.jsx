import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const name = userData?.user?.name || '';
  const role = userData?.user?.role || 'user';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className='bg-gray-400 p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Rate It</h1>

        {/* Hamburger for small screens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden text-2xl font-bold transition duration-300'
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <div className='hidden md:flex gap-6 text-lg font-bold'>
          <Link className='hover:text-white transition duration-300' to="/">Home</Link>
          <button className='hover:text-white transition duration-300' onClick={() => navigate('/login')}>Login</button>
          <button className='hover:text-white transition duration-300' onClick={() => navigate('/signup')}>Signup</button>

          {role === "admin" && (
            <Link className='hover:text-white transition duration-300' to="/admin/dashboard">Admin Dashboard</Link>
          )}

          {role === "store_owner" && (
            <Link className='hover:text-white transition duration-300' to="/owner/dashboard">Owner Dashboard</Link>
          )}

          <button className='hover:text-white transition duration-300' onClick={handleLogout}>Logout</button>
          {name && <span>{name}</span>}
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
        }`}
      >
        <div className='flex flex-col gap-4 mt-4 text-lg font-bold'>
          <Link className='hover:text-white transition duration-300' to="/">Home</Link>
          <button className='hover:text-white text-left transition duration-300' onClick={() => navigate('/login')}>Login</button>
          <button className='hover:text-white text-left transition duration-300' onClick={() => navigate('/signup')}>Signup</button>

          {role === "admin" && (
            <Link className='hover:text-white transition duration-300' to="/admin/dashboard">Admin Dashboard</Link>
          )}

          {role === "store_owner" && (
            <Link className='hover:text-white transition duration-300' to="/owner/dashboard">Owner Dashboard</Link>
          )}

          <button className='hover:text-white text-left transition duration-300' onClick={handleLogout}>Logout</button>
          {name && <span>{name}</span>}
        </div>
      </div>
    </div>
  );
};

export default Header;
