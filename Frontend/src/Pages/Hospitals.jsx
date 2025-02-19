import React from "react";
import Navbar from "../Components/NavBar.jsx";
//import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Hospital, Phone, MapPin, ShieldCheck, Navigation } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 34.0522, // Default center (Los Angeles)
  lng: -118.2437,
};

const Hospitals = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const hospitalData = [
    {
      id: 1,
      name: "City Central Hospital",
      specialties: ["Emergency", "Trauma", "Cardiology"],
      address: "789 Health Street, Downtown",
      phone: "(555) 123-4567",
      beds: 350,
      position: { lat: 34.0522, lng: -118.2437 },
    },
    {
      id: 2,
      name: "North Medical Center",
      specialties: ["Pediatrics", "Oncology", "Surgery"],
      address: "456 Wellness Avenue, North District",
      phone: "(555) 987-6543",
      beds: 250,
      position: { lat: 34.0928, lng: -118.3287 },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex justify-center items-center">
            <Hospital className="mr-3 text-red-600" size={40} />
            Emergency Medical Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive healthcare facilities equipped to provide immediate and specialized medical care during emergencies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map Section */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="h-[500px] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {isLoaded ? (
                  <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={12}>
                    {hospitalData.map((hospital) => (
                      <Marker key={hospital.id} position={hospital.position} label={hospital.name} />
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

          {/* Hospitals List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Nearby Hospitals
            </h2>
            {hospitalData.map((hospital) => (
              <div 
                key={hospital.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2">
                  {hospital.name}
                </h3>
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="mr-2 text-red-500" size={18} />
                    <p>{hospital.address}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <Phone className="mr-2 text-green-500" size={18} />
                    <p>{hospital.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck className="mr-2 text-blue-500" size={18} />
                    <p>Total Beds: {hospital.beds}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty) => (
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
                      `https://www.google.com/maps?q=${hospital.position.lat},${hospital.position.lng}`,
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

export default Hospitals;
