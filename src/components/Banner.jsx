import React from 'react';
import BannerImg from '../assets/BannerImg.jpg'
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12  rounded-lg  bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white">
      
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
        Discover the Best Stores Around You
        </h1>
        <p className="text-white text-lg md:text-xl">
        Read honest reviews, rate your favorite places, and help others find top-rated local stores.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white 
        font-semibold py-2 px-6 rounded transition duration-300">
          Start Exploring
        </button>
      </div>

      {/* <div className="flex-1 mt-6 md:mt-0">
       <img src={BannerImg} alt="" />
      </div> */}
    </div>
  );
};

export default Banner;
