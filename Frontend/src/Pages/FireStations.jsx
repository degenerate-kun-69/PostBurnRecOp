import React from "react";
import Navbar from "../Components/NavBar.jsx";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {  Phone, MapPin, ShieldCheck, Navigation, Flame } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 34.0522, // Default center (Los Angeles)
  lng: -118.2437,
};

const FireStations = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const fireStationsData = [
    {
      id: 1,
      name: "LAFD Station 3",
      specialties: ["Emergency Response", "Firefighting", "Rescue Operations"],
      address: "101 Flame Street, Downtown",
      phone: "(555) 111-2222",
      staff: 40,
      position: { lat: 34.0522, lng: -118.2437 },
    },
    {
      id: 2,
      name: "LAFD Station 27",
      specialties: ["Wildfire Control", "Rescue Operations", "Hazmat"],
      address: "202 Rescue Lane, North District",
      phone: "(555) 333-4444",
      staff: 35,
      position: { lat: 34.0928, lng: -118.3287 },
    },
    {
      id: 3,
      name: "LAFD Station 41",
      specialties: ["Urban Firefighting", "Medical Emergencies"],
      address: "303 Firefighter Rd, West Side",
      phone: "(555) 555-6666",
      staff: 50,
      position: { lat: 34.0195, lng: -118.4912 },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex justify-center items-center">
            <Flame className="mr-3 text-red-600" size={40} />
            Fire & Emergency Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Locate the nearest fire stations equipped to handle emergencies, fires, and rescues.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map Section */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="h-[500px] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {isLoaded ? (
                  <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={12}>
                    {fireStationsData.map((station) => (
                      <Marker key={station.id} position={station.position} label={station.name} />
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

          {/* Fire Stations List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Nearby Fire Stations
            </h2>
            {fireStationsData.map((station) => (
              <div 
                key={station.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2">
                  {station.name}
                </h3>
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="mr-2 text-red-500" size={18} />
                    <p>{station.address}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <Phone className="mr-2 text-green-500" size={18} />
                    <p>{station.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck className="mr-2 text-blue-500" size={18} />
                    <p>Staff Members: {station.staff}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {station.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-blue-100 dark:bg-blue-800 dark:text-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${station.position.lat},${station.position.lng}`,
                      "_blank"
                    )
                  }
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

export default FireStations;
