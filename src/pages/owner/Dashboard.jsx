import React from 'react';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import getData from '../../hooks/getData';
import { Link } from 'react-router-dom';
import { server } from '../../redux/store';
import { FaMapMarkerAlt, FaEnvelope, FaStar, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const { token } = useSelector((state) => state.user);
  const { data, loading, error } = getData(`${server}/api/store-owner/dashboard`, {
    method: 'GET',
    token,
  });

  if (loading) return <h2 className="text-center text-xl mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500 mt-10">{error}</h2>;

  return (
    <div className="h-screen flex overflow-hidden relative bg-cover bg-center" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1740&q=80')`,
    }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 w-[16rem] min-w-[16rem] bg-white/30 backdrop-blur-md shadow-inner">
        <Sidebar />
      </div>

      <div className="relative z-10 flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 text-white">
          <h1 className="text-3xl font-bold">My Stores</h1>
          <Link
            to="/admin/create-store"
            className="mt-4 md:mt-0 inline-block px-6 py-2 bg-white/20 rounded-full shadow-md text-white hover:bg-white/40 transition duration-300"
          >
            + Add Store
          </Link>
        </div>

        {data?.stores?.length === 0 ? (
          <p className="text-center text-white">No stores yet.</p>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {data?.stores?.map((store, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 text-white shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <h2 className="text-xl font-semibold mb-4">{store.name}</h2>

                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-300" /> {store.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-pink-300" /> {store.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStar className="text-yellow-300" /> Average Rating:{' '}
                    {store.averageRating || 'N/A'}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUser className="text-green-300" /> Rated by:{' '}
                    {store.ratings.length}{' '}
                    {store.ratings.length === 1 ? 'user' : 'users'}
                  </p>
                </div>

                {store.ratings.length > 0 && (
                  <div className="mt-4 border-t border-white/30 pt-3 space-y-1">
                    <p className="font-medium text-white/90">Recent Ratings:</p>
                    {store.ratings.slice(0, 3).map((rating, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{rating.user.name}</span>
                        <span className="text-yellow-200">{rating.rating} ★</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
