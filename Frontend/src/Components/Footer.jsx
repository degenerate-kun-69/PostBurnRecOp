"use client"

import React, { useState, useEffect } from 'react';
import { Instagram, Moon, Send, Sun } from "lucide-react";
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-muted-foreground">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-12 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition-transform hover:scale-105 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {['Home', 'About Us', 'Services', 'Products', 'Contact'].map((link) => (
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
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' }
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  title={`Follow us on ${label}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative h-6 w-11 rounded-full bg-gray-200 transition-colors ${
                  isDarkMode ? 'bg-blue-500' : ''
                }`}
              >
                <div
                  className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-5' : ''
                  }`}
                />
              </button>
              <Moon className="h-4 w-4" />
              <label className="sr-only">Toggle dark mode</label>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © 2024 Your Company. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Chat Widget */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg transition-colors hover:bg-blue-600"
      >
        {isChatOpen ? "Close Chat" : "Open Chat"}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-800">
          <h4 className="mb-4 text-lg font-semibold">Live Chat</h4>
          <div className="mb-4 h-40 overflow-y-auto rounded border p-2">
            <p className="mb-2">
              <strong>Support:</strong> Hello! How can I assist you today?
            </p>
          </div>
          <form className="flex gap-2">
            <textarea
              placeholder="Type your message..."
              className="flex-grow rounded-lg border p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition-transform hover:scale-105 hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </button>
          </form>
        </div>
      )}
    </footer>
  );
};

export default Footer;