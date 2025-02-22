import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center md:text-left">
          {/* Organization Info */}
          <div className="flex flex-col items-center md:items-start col-span-2 lg:col-span-3">
            <h1 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Disaster Response Hub
            </h1>
            <p className={`text-base flex items-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Emergency Operations Center, New Delhi, India
            </p>
          </div>

          {/* Resources Section */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1 lg:-ml-[20vw]">
            <h5 className={`text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Emergency Resources
            </h5>
            <ul className={`space-y-3 text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Alert System</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Emergency Maps</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Resource Locator</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Relief Camps</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Volunteer Portal</a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1 lg:-ml-[10vw]">
            <h5 className={`text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Help & Support
            </h5>
            <ul className={`space-y-3 text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Emergency Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Safety Protocols</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Report Incident</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Training Materials</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 hover:underline">Contact Centers</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            <h5 className={`text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Connect With Us
            </h5>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className={`hover:text-blue-500 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {platform === 'facebook' && (
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    )}
                    {platform === 'twitter' && (
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    )}
                    {platform === 'instagram' && (
                      <path d="M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-8 12a4 4 0 110-8 4 4 0 010 8zm8-10a1 1 0 110-2 1 1 0 010 2z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className={`my-8 ${darkMode ? "border-gray-600" : "border-gray-300"}`} />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <p className={`text-base flex items-center mb-4 md:mb-0 ${darkMode ? "text-gray-300" : "text-gray-700"} text-center`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Emergency Contact: {" "}
            <a href="mailto:emergency@disaster-response.org" className="hover:text-blue-500 hover:underline ml-1">
              emergency@disaster-response.org
            </a>
          </p>
          <p className={`text-base ${darkMode ? "text-gray-300" : "text-gray-700"} text-center`}>
            &copy; Disaster Response Hub {new Date().getFullYear()}
            <br />
            24/7 Emergency Hotline: 1800-DISASTER
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;