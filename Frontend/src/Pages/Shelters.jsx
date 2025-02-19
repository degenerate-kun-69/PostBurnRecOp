import React from 'react';
import Navbar from '../Components/NavBar.jsx';
import { MapPin, Navigation } from 'lucide-react';
//import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 40.7128, // Example latitude
  lng: -74.0060, // Example longitude
};

const Shelters = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const shelterData = [
    {
      id: 1,
      name: "Central Emergency Shelter",
      position: { lat: 40.7128, lng: -74.0060 },
      address: "123 Main Street, Downtown",
      capacity: 500
    },
    {
      id: 2,
      name: "North City Shelter",
      position: { lat: 40.7282, lng: -73.7949 },
      address: "456 Shelter Avenue, North District",
      capacity: 350
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex justify-center items-center">
            <MapPin className="mr-3 text-blue-600" size={40} />
            Emergency Shelters
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find safe shelter locations near you during emergencies. Our network of shelters provides immediate refuge and essential support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map Section */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="h-[500px] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {isLoaded ? (
                  <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={12}>
                    {shelterData.map((shelter) => (
                      <Marker key={shelter.id} position={shelter.position} label={shelter.name} />
                    ))}
                  </GoogleMap>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                      Loading Map...
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Google Maps API integration in progress
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shelters List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Nearby Shelters
            </h2>
            {shelterData.map((shelter) => (
              <div 
                key={shelter.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2">
                  {shelter.name}
                </h3>
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  <p>{shelter.address}</p>
                  <p>Capacity: {shelter.capacity} people</p>
                </div>
                <button
                  className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => window.open(`https://www.google.com/maps?q=${shelter.position.lat},${shelter.position.lng}`, "_blank")}
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
  );
};

export default Shelters;
