import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Initialize Google Sign-In after script loads
        window.google.accounts.id.initialize({
          client_id: "173772257249-pvntvkqk4k5nofd2e2r3plu0j56mp2gd.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });

        window.google.accounts.id.renderButton(
          document.getElementById('googleButton'),
          { theme: 'outline', size: 'large' }
        );
      };
      
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    };

    loadGoogleScript();
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      // Send the token to your backend
      const result = await fetch('http://localhost:5000/auth/google', {  // Update with your actual backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: response.credential
        })
      });

      const data = await result.json();
      
      if (data.success) {
        // Store the user data or token
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token); // If your backend sends a token
        
        // Navigate to home page
        navigate('/');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to authenticate. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in with Google</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Google Sign-In Button */}
        <div id="googleButton" className="flex justify-center mb-4" />
        
        {/* Optional: Custom button */}
        <button 
          onClick={() => window.google?.accounts.id.prompt()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;