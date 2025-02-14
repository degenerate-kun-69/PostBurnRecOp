import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Flame, Search, Map, Hospital, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="text-xl font-bold">Disaster Management</span>
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for locations, services..."
                className="w-80 px-3 py-2 pl-10 pr-15 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-blue-400 transition-all duration-100"
              />
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-blue-200" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-3 top-2 px-2 py-1 text-sm bg-blue-700 rounded hover:bg-blue-800 transition-colors duration-200"
                >
                  Search
                </button>
              )}
            </div>
          </form>

          <div className="flex items-center space-x-6">
            <Link to="/map-views" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Map className="h-5 w-5" />
              <span>Map Views</span>
            </Link>
            <Link to="/shelters" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <MapPin className="h-5 w-5" />
              <span>Shelter Homes</span>
            </Link>
            <Link to="/fire-stations" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Flame className="h-5 w-5" />
              <span>Fire Stations</span>
            </Link>
            <Link to="/hospitals" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Hospital className="h-5 w-5" />
              <span>Hospitals</span>
            </Link>
            <Link to="/Awareness-Page" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Hospital className="h-5 w-5" />
              <span>Awareness-Page</span>
            </Link>
            <Link to="/DashBoard" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              <span>DashBoard</span>
            </Link>
            <Link to="/disaster-alerts" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              <span>Disaster Alerts</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;