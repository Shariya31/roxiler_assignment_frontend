import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const role = userData?.user?.role || 'user';

  return (
    <>
      <button
        className='md:hidden fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-md border border-white/20 hover:bg-white/20 transition'
        onClick={() => setOpen(!open)}
      >
        {open ? '✖' : '☰'}
      </button>

      <div
        className={`
          h-screen w-64 px-6 py-10 flex flex-col gap-6 
          fixed top-0 left-0 z-40 transition-transform duration-500 ease-in-out
          bg-white/10 backdrop-blur-xl border-r border-white/20 text-white
          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-tr-2xl rounded-br-2xl
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex
        `}
      >
        <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">
          {role === 'admin' ? 'Admin Panel' : 'Owner Panel'}
        </h2>

        <Link
          to={role === 'admin' ? '/admin/dashboard' : '/owner/dashboard'}
          className="hover:text-cyan-300 transition-colors duration-200"
        >
          Dashboard
        </Link>

        {role === 'admin' && (
          <>
            <Link
              to='/admin/stores'
              className="hover:text-cyan-300 transition-colors duration-200"
            >
              Stores
            </Link>
            <Link
              to='/admin/users'
              className="hover:text-cyan-300 transition-colors duration-200"
            >
              Users
            </Link>
          </>
        )}
      </div>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className='fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden'
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
