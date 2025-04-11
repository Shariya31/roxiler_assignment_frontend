import React from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import getData from '../../hooks/getData'
import { server } from '../../redux/store'

const Dashboard = () => {
  const { token } = useSelector(state => state.user)
  const { data, loading, error } = getData(`${server}/api/admin/dashboard`, {
    method: 'GET',
    token
  })

  if (loading) {
    return <h2 className="text-center text-xl font-semibold mt-10 text-white">Loading...</h2>
  }

  if (error) {
    return <h2 className="text-center text-xl font-semibold text-red-400 mt-10">{error.message}</h2>
  }

  return (
    <div className='min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white'>
      <Sidebar />

      <div className='flex-1 p-6 md:p-10 overflow-auto'>
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.2)] border border-white/20'>
            <h2 className='text-lg font-semibold text-white/80 mb-2'>Total Ratings</h2>
            <p className='text-3xl font-bold'>{data?.totalRatings}</p>
          </div>

          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.2)] border border-white/20'>
            <h2 className='text-lg font-semibold text-white/80 mb-2'>Total Users</h2>
            <p className='text-3xl font-bold'>{data?.totalUsers}</p>
          </div>

          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.2)] border border-white/20'>
            <h2 className='text-lg font-semibold text-white/80 mb-2'>Total Stores</h2>
            <p className='text-3xl font-bold'>{data?.totoalStores}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
