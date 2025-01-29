import React from 'react';
import Navbar from '../Components/NavBar.jsx';
import { MapPin, Navigation } from 'lucide-react';

const FireStations = () => {
  const fireStations = [
    { id: 1, name: "LAFD Station 3", position: { lat: 34.0522, lng: -118.2437 } },
    { id: 2, name: "LAFD Station 27", position: { lat: 34.0928, lng: -118.3287 } },
    { id: 3, name: "LAFD Station 41", position: { lat: 34.0195, lng: -118.4912 } },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex justify-center items-center">
            <MapPin className="mr-3 text-red-700" size={40} />
            Fire Stations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the nearest fire stations in your area
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-[500px] bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 text-lg mb-4">
                    Interactive Map Placeholder
                  </p>
                  <p className="text-sm text-gray-500">
                    Google Maps API integration coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fire Stations List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Nearby Fire Stations
            </h2>
            <div className="space-y-4">
              {fireStations.map(station => (
                <div key={station.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                  <h3 className="font-semibold text-lg mb-2">{station.name}</h3>
                  <p className="text-gray-600 mb-4">
                    Latitude: {station.position.lat}<br />
                    Longitude: {station.position.lng}
                  </p>
                  <button
                    className="w-full flex items-center justify-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => window.open(`https://www.google.com/maps?q=${station.position.lat},${station.position.lng}`, "_blank")}
                  >
                    <Navigation className="mr-2" size={20} />
                    Get Directions
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireStations;