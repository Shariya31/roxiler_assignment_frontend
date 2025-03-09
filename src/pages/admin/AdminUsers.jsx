import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getData from '../../hooks/getData';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import { server } from '../../redux/store';

const AdminUsers = () => {
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [submittedSearchText, setSubmittedSearchText] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [sortOrder, setSortOrder] = useState('')
    const { token } = useSelector(state => state.user);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 7000);

        return () => clearTimeout(debounceTimer);
    }, [searchText]);

    const { data, loading, error } = getData(`${server}/api/admin/users`, {
        method: 'GET',
        token,
        filters: {
            search: submittedSearchText ? submittedSearchText || debouncedSearchText : null,
            sortBy: selectedValue,
            order: sortOrder
        },
    });

    console.log(data)

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearchText(searchText);
        // setSearchText('')
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }
    if (error) {
        return <h2>{error.message}</h2>;
    }

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
    }

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    }

    return (
        <div className='h-screen relative flex gap-8'>
            <div className='flex-1 '>
                <Sidebar />
            </div>

            <div className='w-full h-full flex flex-col justify-around pt-4 flex-3 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                <div className='flex justify-around p-8'>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder='Search'
                        />
                        <button type='submit'>Search</button>
                    </form>
                    <select name="" id="dropdown" value={selectedValue} onChange={handleChange}>
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="address">Address</option>
                        <option value="role">Role</option>
                    </select>

                    <select name="" id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="">Sort Order</option>
                        <option value="aesc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <Link className='p-3 border-2 border-black rounded-md font-bold hover:bg-black hover:text-white ease-in-out duration-500' to='/admin/create-user'>Add User</Link>

                </div>

                <div className='w-full h-screen flex flex-wrap justify-around pt-4 p-8 flex-3 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)] overflow-auto'>
                    {data?.users?.map((user, index) => (
                        <div key={index} className='h-[20rem] overflow-auto w-[25rem] flex flex-col py-8 pl-3 items-start shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
                            <p>Name: <span className=''>{user.name}</span></p>
                            <p>Email: {user.email}</p>
                            <p>Address: {user.address}</p>
                            <p>Role: {user.role}</p>
                            {user.stores.length !==0 && <div>
                            <h2 className='mt-4'>Store Details</h2>
                                {user.stores.map((store, index)=>(
                                    <div className='my-8' key={index}>
                                        <p>Name: {store.store.name}</p>
                                        <p>Email: {store.store.email}</p>
                                        <p>Address: {store.store.address}</p>
                                        <p>Average Rating: {store.store.averageRating}</p>
                                        <p>Rated by Users: {store.store.ratings.length}</p>
                                    </div>
                                ))}    
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminUsers