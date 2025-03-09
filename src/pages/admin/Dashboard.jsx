import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import getData from '../../hooks/getData'
import { server } from '../../redux/store'
const Dashboard = () => {
    const { token } = useSelector(state => state.user)
    const { data, loading, error } = getData(`${server}/api/admin/dashboard`, {
        method: 'GET',
        token
    });
    console.log(data)

    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error.message}</h2>
    }
    return (
        <div className='h-screen flex gap-8 '>
            <div className='flex-1'>
                <Sidebar />
            </div>
            <div className='w-full flex justify-around pt-4 flex-3 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                <div className='h-[4rem] w-[10rem] flex flex-col items-center shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                    <h2>Total Ratings</h2>
                    <p>{data?.totalRatings}</p>
                </div>

                <div className='h-[4rem] w-[10rem] flex flex-col items-center shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                <h2>Total Users</h2>

                    <p>{data?.totalUsers}</p>

                </div>

                <div className='h-[4rem] w-[10rem] flex flex-col items-center shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                <h2>Total Stores</h2>

                    <p>{data?.totoalStores}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard