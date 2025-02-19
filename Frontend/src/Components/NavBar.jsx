import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Flame, 
  Search, 
  Map, 
  Hospital, 
  LayoutDashboard, 
 Book,
  AlertOctagon,
  Bell,
  User,
  LogOut
} from 'lucide-react';

const Navbar = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would typically call an API or use a search function
  };

  const getUserInitials = () => {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return 'U';
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle profile dropdown
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Google Sign-in handler
  const handleGoogleSignIn = () => {
    console.log('Initiating Google Sign-in...');
    // Implement Google OAuth logic here
  };

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
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <span className="text-2xl">×</span>
              ) : (
                <span className="text-2xl">≡</span>
              )}
            </button>
          </div>
          
          {/* Search Form - Full width on mobile, constrained on desktop */}
          <form onSubmit={handleSearch} className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto md:mr-auto mb-3 md:mb-0`}>
  <div className="relative">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search..."
      className="w-full md:w-48 ml-4 px-2 py-1 pl-7 pr-8 rounded-md bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:bg-blue-400 transition-all duration-100 text-sm"
    />
    <Search className="absolute ml-4 left-1.5 top-1.5 h-4 w-4 text-blue-200" />
    {searchQuery && (
      <button
        type="submit"
        className="absolute right-2 top-1 px-1.5 py-0.5 text-xs bg-blue-700 rounded hover:bg-blue-800 transition-colors duration-200"
      >
        Go
      </button>
    )}
  </div>
</form>
          
          {/* Navigation Links */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6 w-full md:w-auto`}>
            <Link to="/map-views" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Map className="h-5 w-5" />
              <span>Live Map</span>
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
            <Link to="/awareness-page" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Book className="h-5 w-5" />
              <span>Awareness</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/DisasterAlert" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <AlertOctagon className="h-5 w-5" />
              <span>Alerts</span>
            </Link>
            
            {/* User Profile or Sign In */}
            <div className="relative">
              {user ? (
                <>
                  <div 
                    className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                    onClick={toggleProfileMenu}
                  >
                    {getUserInitials()}
                  </div>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black z-50">
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link 
                          to="/profile" 
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        <Link 
                          to="/notifications" 
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          Notifications
                        </Link>
                        <button 
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => console.log('Logging out...')}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center space-x-2 bg-white text-blue-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 18 18" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path 
                        d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 Z" 
                        fill="#4285F4" 
                      />
                      <path 
                        d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 Z" 
                        fill="#34A853" 
                      />
                      <path 
                        d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 Z" 
                        fill="#FBBC05" 
                      />
                      <path 
                        d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 Z" 
                        fill="#EA4335" 
                      />
                    </g>
                  </svg>
                  <span>Sign in</span>
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