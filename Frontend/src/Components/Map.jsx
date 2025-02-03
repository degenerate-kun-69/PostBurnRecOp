import React from 'react';

const Map = () => {
  return (
    <div className="relative h-[300px] bg-gray-700 rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
        alt="World Map"
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-blue-500/20"></div>
      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
    </div>
  );
};

export default Map;