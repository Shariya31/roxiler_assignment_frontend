import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getData from '../hooks/getData';
import axios from 'axios';
import { server } from '../redux/store';
import Banner from '../components/Banner';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [submittedSearchText, setSubmittedSearchText] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [showModal, setShowModal] = useState(null);
  const [rating, setRating] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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
  }, [refreshKey]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearchText(searchText);
  };

  const handleChange = (e) => setSelectedValue(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);
    setSuccess(null);
    try {
      const response = await axios.post(`${server}/api/stores/${id}/rating`, { rating }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess(response.data.message);
      setShowModal(null);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
      setRating('');
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1920&q=80')" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col gap-8">
        <Banner />

        {/* Search & Filters */}
        <div className='w-full flex justify-center mt-6 px-4'>
          <div className="w-full max-w-6xl p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 flex flex-col md:flex-row items-center gap-6">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col md:flex-row items-center gap-4 w-full"
            >
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                className="w-full md:w-72 px-4 py-2 rounded-xl border border-white/30 bg-white/10 text-white 
                placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 
                text-white rounded-xl font-semibold transition duration-300"
              >
                Search
              </button>
            </form>

            <select
              value={selectedValue}
              onChange={handleChange}
              className="w-full md:w-40 px-4 py-2 rounded-xl border border-white/30 bg-white/10 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option className='text-white' value="">Sort By</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="address">Address</option>
              <option value="rating">Rating</option>
            </select>

            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="w-full md:w-40 px-4 py-2 rounded-xl border border-white/30 bg-white/10 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option className='text-white' value="">Order</option>
              <option value="aesc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className='w-full flex flex-wrap justify-center gap-8 px-4 pb-10'>
          {data?.stores?.map((store, index) => (
            <div
              key={index}
              className='bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white w-[20rem] sm:w-[22rem] lg:w-[25rem] h-auto rounded-2xl p-6 flex flex-col gap-2'
            >
              <p><strong>Name:</strong> {store.name}</p>
              <p><strong>Address:</strong> {store.address}</p>
              <p><strong>Email:</strong> {store.email}</p>
              <p><strong>Owner:</strong> {store.owner.name}</p>
              <p><strong>Average Rating:</strong> {store.averageRating}</p>
              <p><strong>Rated by users:</strong> {store.ratings.length}</p>

              <button
                onClick={() => setShowModal(store._id)}
                className='mt-4 border-2 border-white rounded-md font-semibold hover:bg-white hover:text-black transition duration-300 w-fit px-4 py-1 self-center'
              >
                Rate
              </button>

              {showModal === store._id && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-white/90 rounded-lg shadow-2xl w-full max-w-md p-6 text-black">
                    <h2 className="text-2xl font-bold mb-4">Please Rate Us</h2>
                    <form onSubmit={(e) => handleSubmit(e, store._id)}>
                      <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                          Rate between 1 to 5
                        </label>
                        <input
                          type="number"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                          min="1"
                          max="5"
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowModal(null)}
                          className='border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition'
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className='border border-black px-4 py-2 rounded font-bold hover:bg-black hover:text-white transition'
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
