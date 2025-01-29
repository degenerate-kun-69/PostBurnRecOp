import React from 'react';
import Navbar from '../Components/NavBar.jsx';
import Content from '../Components/Content.jsx';
import { MapPin, Flame,Hospital,Map } from 'lucide-react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-center">Emergency Response & Resource Management</h1>
  <h3 className="text-xl text-center">Locate the nearest shelter, fire station.</h3>
</div>
<div className="flex flex-wrap justify-evenly gap-8 max-w-6xl mx-auto">
  <Link to="/shelters" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex-1 max-w-[22%]">
    <div className="flex items-center mb-4">
      <MapPin className="h-8 w-8 text-blue-600" />
      <h2 className="text-2xl font-semibold ml-3">Emergency Shelters</h2>
    </div>
    <p className="text-gray-600">Find nearby emergency shelters and temporary accommodation during disasters</p>
  </Link>
  <Link to="/fire-stations" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex-1 max-w-[22%]">
    <div className="flex items-center mb-4">
      <Flame className="h-8 w-8 text-red-600" />
      <h2 className="text-2xl font-semibold ml-3">Fire Stations</h2>
    </div>
    <p className="text-gray-600">Locate the nearest fire stations and emergency response units</p>
  </Link>
  <Link to="/hospitals" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex-1 max-w-[22%]">
    <div className="flex items-center mb-4">
      <Hospital className="h-8 w-8 text-red-600" />
      <h2 className="text-2xl font-semibold ml-3">Hospitals</h2>
    </div>
    <p className="text-gray-600">Locate the nearest Hospitals.</p>
  </Link>
  <Link to="/Map Views" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex-1 max-w-[22%]">
    <div className="flex items-center mb-4">
      <Map className="h-8 w-8 text-red-600" />
      <h2 className="text-2xl font-semibold ml-3">Map Views</h2>
    </div>
    <p className="text-gray-600">Map-Views To Plan the path.</p>
  </Link>
</div>

 {/* Prevention Guides and Plans */}



 <Content/>















      </div>
    </>
  );
};

export default HomePage;