import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getData from '../../hooks/getData';
import Sidebar from '../../components/Sidebar';
import { server } from '../../redux/store';

const AdminUsers = () => {
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

  const { data, loading, error } = getData(`${server}/api/admin/users`, {
    method: 'GET',
    token,
    filters: {
      search: submittedSearchText || debouncedSearchText,
      sortBy: selectedValue,
      order: sortOrder
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearchText(searchText);
  };

  const handleChange = (e) => setSelectedValue(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  if (loading) return <h2 className="text-white text-xl p-8">Loading...</h2>;
  if (error) return <h2 className="text-red-400 p-8">{error.message}</h2>;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <Sidebar />

      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        {/* Controls Panel */}
        <div className="glassmorphism flex flex-col md:flex-row items-center justify-between gap-4 p-6 mb-4 rounded-2xl shadow-xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or email"
              className="bg-white/10 backdrop-blur-md placeholder-white/60 text-white px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full md:w-[20rem]"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-xl transition-all"
            >
              Search
            </button>
          </form>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={selectedValue}
              onChange={handleChange}
              className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
              className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Order</option>
              <option value="aesc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pr-2">
            {data?.users?.map((user, index) => (
              <div
                key={index}
                className="glassmorphism rounded-2xl p-6 shadow-2xl backdrop-blur-xl border border-white/20 flex flex-col gap-2 overflow-y-auto max-h-[22rem] scroll-thin scroll-thumb-white/20 scroll-track-white/5"
              >
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Role:</strong> {user.role}</p>

                {user.stores.length !== 0 && (
                  <div className="mt-4">
                    <h3 className="text-cyan-400 mb-2">Store Details:</h3>
                    {user.stores.map((store, i) => (
                      <div key={i} className="bg-white/5 p-3 rounded-xl mb-3">
                        <p><strong>Name:</strong> {store.store.name}</p>
                        <p><strong>Email:</strong> {store.store.email}</p>
                        <p><strong>Address:</strong> {store.store.address}</p>
                        <p><strong>Average Rating:</strong> {store.store.averageRating}</p>
                        <p><strong>Rated By:</strong> {store.store.ratings.length} users</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
