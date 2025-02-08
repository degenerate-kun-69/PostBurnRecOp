import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSun, FaMoon, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
 

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    }
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold">Stay Connected</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border bg-white px-4 py-2 pr-12 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition-transform hover:scale-105 hover:bg-blue-600"
              >
                <FaPaperPlane className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {["Home", "About Us", "Services", "Products", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-gray-600 dark:text-gray-300">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>

          {/* Social Links & Dark Mode */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              {[
                { Icon: FaFacebook, label: "Facebook" },
                { Icon: FaTwitter, label: "Twitter" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaLinkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                  title={`Follow us on ${label}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              <FaSun className="h-4 w-4" />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  isDarkMode ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? "translate-x-5" : ""
                  }`}
                />
              </button>
              <FaMoon className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
