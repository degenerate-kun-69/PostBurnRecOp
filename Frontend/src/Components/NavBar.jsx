import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, MapPin, Flame, Search, Map, Hospital, 
  LayoutDashboard, Book, AlertOctagon, Bell, 
  User, LogOut, ChevronDown, Settings, Info,
  Phone, Shield, ArrowRight,
  AlertCircle,
  LayoutDashboardIcon,
  HospitalIcon,
  Flag,
  HelpCircleIcon,
  HelpingHandIcon
} from 'lucide-react';

const Navbar = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifications, setNotifications] = useState([
   
  ]);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        const response = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
        );
        const data = await response.json();

        if (data.features) {
          const newNotifications = data.features.map((quake, index) => ({
            id: index + 1,
            text: `Earthquake: ${quake.properties.place} (M${quake.properties.mag})`,
            time: new Date(quake.properties.time).toLocaleTimeString(),
            type: "earthquake",
          }));

          setNotifications(newNotifications);
        }
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };

    fetchEarthquakeData();

    // Fetch data every 10 minutes
    const interval = setInterval(fetchEarthquakeData, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);


  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Dropdown menus configuration
  const dropdownMenus = {
    resources: {
      title: "Resources",
      items: [
    //    { label: "Disaster Alert", icon: AlertCircle, path: "/DisasterAlert" },
        { label: "DashBoard", icon: LayoutDashboardIcon, path: "/DashBoard" },
        { label: "Training Materials", icon: Book, path: "/Awareness-Page" },
        { label: "Incident Tracker", icon: AlertOctagon, path: "/IncidentTracker" },
   //     { label: "Hospitals", icon: HospitalIcon, path: "/hospitals" }
      ]
    },
    services: {
      title: "Services",
      items: [
        { label: "Find Shelter", icon: MapPin, path: "/shelters" },
        { label: " Report Incident", icon: Flag , path: "/Report" },
        { label: "Volunteer", icon: Shield, path: "/VolunteerForm" },
        { label: "Medical Help", icon: Hospital, path: "/hospitals" },
        { label: "Fire Stations", icon: Flame, path: "/fire-stations" },
        {label:"RequirementForm", icon: HelpingHandIcon, path: "/ResourceRequirement"}
      ]
    }
  };

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  }, [searchQuery]);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowProfileMenu(false);
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Escape') {
      setShowProfileMenu(false);
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const renderDropdownMenu = (key, menu) => (
    <div className="relative group">
      <button
        onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
        className="flex items-center space-x-1 hover:text-blue-200 transition-colors py-2"
      >
        <span>{menu.title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
      </button>
      
      {activeDropdown === key && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg py-2 text-gray-800 z-50">
          {menu.items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-4 py-2 hover:bg-blue-50 transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              <item.icon className="h-5 w-5 mr-3 text-blue-600" />
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between w-full md:w-auto mb-3 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6" />
              <span className="text-xl font-bold">Disaster Management</span>
            </Link>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '×' : '≡'}
            </button>
          </div>

          {/* Enhanced Search with Autocomplete */}
          <form onSubmit={handleSearch} className={`${isMenuOpen ? 'block' : 'hidden'}  md:block w-full md:w-auto md:mr-auto mb-3 md:mb-0`}>
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations, services..."
                className="w-full ml-2 md:w-64 px-4 py-2 pl-10 pr-8 rounded-lg bg-blue-500 text-white placeholder-blue-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-blue-400 transition-all duration-200"
              />
              <Search className="absolute  left-3 top-2.5 h-5 w-5 text-blue-200" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-2 py-1 text-sm bg-blue-700 rounded hover:bg-blue-800 
                           transition-colors duration-200"
                >
                  Search
                </button>
              )}
            </div>
          </form>

          {/* Navigation Links with Dropdowns */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6 w-full md:w-auto`} ref={dropdownRef}>
            {Object.entries(dropdownMenus).map(([key, menu]) => renderDropdownMenu(key, menu))}
            
            <Link to="/map-views" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Map className="h-5 w-5" />
              <span>Live Map</span>
            </Link>

            {/* Notifications */}
            <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setActiveDropdown(activeDropdown === "notifications" ? null : "notifications")}
        className="relative flex items-center hover:text-blue-200 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {activeDropdown === "notifications" && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 text-gray-800 z-50">
          <div className="px-4 py-2 border-b border-gray-100 font-semibold">
            Notifications
          </div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <span
                    className={`h-2 w-2 rounded-full mr-2 ${
                      notification.type === "alert"
                        ? "bg-red-500"
                        : notification.type === "emergency"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <p className="text-sm flex-1">{notification.text}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-sm text-gray-500">No new alerts</p>
          )}
          <div className="px-4 py-2 border-t border-gray-100">
            <Link to="/DisasterAlert" className="text-sm text-blue-600 hover:text-blue-800">
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>

            {/* User Profile */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center">
                      {`${user.firstName?.[0]}${user.lastName?.[0]}`}
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-50">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        Profile
                      </Link>
                      <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-50">
                        <Settings className="h-4 w-4 mr-2 text-gray-500" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {/* Implement logout */}}
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-red-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {/* Implement Google Sign-in */}}
                  className="flex items-center space-x-2 bg-white text-blue-700 px-4 py-2 rounded-lg 
                           hover:bg-gray-100 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;