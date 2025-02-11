import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const EmergencyCallButton = () => {
  const [showCallConfirmation, setShowCallConfirmation] = useState(false);

  const handleInitiateCall = () => {
    setShowCallConfirmation(true);
  };

  const handleConfirmCall = () => {
    // In a real app, this would integrate with phone/emergency services
    window.open('tel:911', '_self');
    setShowCallConfirmation(false);
  };

  const handleCancelCall = () => {
    setShowCallConfirmation(false);
  };

  return (
    <div>
      <button 
        onClick={handleInitiateCall}
        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-105"
      >
        <Phone size={24} />
      </button>

      {showCallConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Emergency Call</h2>
            <p className="mb-6">Are you sure you want to call emergency services?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleConfirmCall}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Confirm Call
              </button>
              <button 
                onClick={handleCancelCall}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyCallButton;