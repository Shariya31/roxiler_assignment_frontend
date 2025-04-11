import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getData from '../../hooks/getData';
import Sidebar from '../../components/Sidebar';
import { server } from '../../redux/store';

const AdminStores = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [submittedSearchText, setSubmittedSearchText] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 7000);

    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  const { data, loading, error } = getData(`${server}/api/admin/stores`, {
    method: 'GET',
    token,
    filters: {
      search: submittedSearchText ? submittedSearchText || debouncedSearchText : null,
      sortBy: selectedValue,
      order: sortOrder,
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearchText(searchText);
  };

  const handleChange = (e) => setSelectedValue(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  if (loading) return <h2 className="text-white text-xl">Loading...</h2>;
  if (error) return <h2 className="text-red-500 text-xl">{error.message}</h2>;

  return (
    <div className='min-h-screen w-full flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden'>
      <Sidebar />

      <div className='flex flex-col flex-1 px-6 py-8 overflow-y-auto'>
        <div className='w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-6 mb-10'>
          <form onSubmit={handleSearchSubmit} className='flex flex-col md:flex-row gap-4 flex-1'>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search stores..."
              className="bg-[#ffffff0a] text-white px-4 py-2 rounded-lg border border-white/20 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
            >
              Search
            </button>
          </form>

          <select
            value={selectedValue}
            onChange={handleChange}
            className="bg-black text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
            <option value="rating">Rating</option>
          </select>

          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="bg-black text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none"
          >
            <option value="">Sort Order</option>
            <option value="aesc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Store Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {data?.stores?.map((store, index) => (
            <div
              key={index}
              className='p-6 rounded-2xl shadow-lg backdrop-blur-md bg-white/5 border border-white/10'
            >
              <h3 className='text-lg font-semibold text-white mb-2'>{store.name}</h3>
              <p className='text-white/80'>📍 Address: {store.address}</p>
              <p className='text-white/80'>📧 Email: {store.email}</p>
              <p className='text-white/80'>👤 Owner: {store.owner.name}</p>
              <p className='text-white/80'>⭐ Avg Rating: {store.averageRating}</p>
              <p className='text-white/80'>🗳️ Total Ratings: {store.ratings.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStores;
