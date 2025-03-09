import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getData from '../hooks/getData';
import axios from 'axios';
import { server } from '../redux/store';

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
      order: sortOrder
    },
  }, [refreshKey]); 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearchText(searchText);
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

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
      console.log(response, id);
      setSuccess(response.data.message);
      setShowModal(null);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      setIsError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setRating('');
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className='h-screen relative flex gap-8'>
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
            <option value="rating">Rating</option>
          </select>

          <select name="" id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="">Sort Order</option>
            <option value="aesc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className='w-full h-screen flex flex-wrap justify-around pt-4 p-8 flex-3 shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)] overflow-auto'>
          {data?.stores?.map((store, index) => (
            <div key={index} className='h-[15rem] overflow-hidden w-[25rem] flex mb-12 flex-col py-8 pl-3 items-start shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]'>
              <p>Name: <span className=''>{store.name}</span></p>
              <p>Address: {store.address}</p>
              <p>Email: {store.email}</p>
              <p>Owner: {store.owner.name}</p>
              <p>Average Rating: {store.averageRating}</p>
              <p>Rated by users: {store.ratings.length}</p>
              <button
                onClick={() => setShowModal(store._id)}
                className='mt-6 mx-auto border-2 border-black w-[30%] rounded-md font-bold hover:bg-black hover:text-white ease-in-out duration-500'
              >
                Rate
              </button>

              {showModal === store._id && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
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
                          className='mt-6 mx-auto border-2 border-black w-[30%] rounded-md font-bold hover:bg-black hover:text-white ease-in-out duration-500'
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className='mt-6 mx-auto border-2 border-black w-[30%] rounded-md font-bold hover:bg-black hover:text-white ease-in-out duration-500'
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