import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import getData from '../../hooks/getData'
import { Link } from 'react-router-dom'
import { server } from '../../redux/store'
const Dashboard = () => {
    const { token } = useSelector(state => state.user)
    const { data, loading, error } = getData(`${server}/api/store-owner/dashboard`, {
        method: 'GET',
        token
    });
    console.log(data, error)

    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }
    return (
        <div className='h-screen flex gap-8 '>
            <div className='flex-1'>
                <Sidebar />
            </div>

            <div className='w-full flex flex-wrap justify-around pt-4 flex-3 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                {data?.stores?.map((store, index) => (
                    <div key={index} className='h-[15rem] overflow-hidden w-[25rem] flex flex-col py-8 pl-3 items-start shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                        <p>Name: <span className=''>{store.name}</span></p>
                        <p>Address: {store.address}</p>
                        <p>Email: {store.email}</p>
                        <p>Average Rating: {store.averageRating}</p>
                        <p>Rated by users: {store.ratings.length}</p>
                        {store.ratings.length !== 0 && <div>
                            {store.ratings.map((rating, index) => (
                                <div className='flex gap-5' key={index}>
                                    <p>{rating.user.name}</p>
                                    <span>{rating.rating}</span>
                                </div>
                            ))}
                        </div>}
                    </div>
                ))}

                <Link className='mt-6 border-2 border-black h-[7%] pt-1.5 px-2 hover:text-white hover:bg-black ease-in-out duration-700' to='/admin/create-store'>Add Store</Link>
            </div>
        </div>
    )
}

export default Dashboard