import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const Alert = ({ title, magnitude, location, time, alert, url }) => {
  const getAlertColor = (alert) => {
    switch (alert) {
      case 'red':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'orange':
        return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'yellow':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div
      className={`rounded-lg border-l-4 p-4 mb-4 ${getAlertColor(alert)} transition-all hover:scale-[1.02]`}
    >
      <div className="flex items-start">
        <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm mt-1">
            <span className="font-semibold">Magnitude:</span> {magnitude}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Time:</span> {time}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm mt-2 hover:underline"
          >
            More details
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Alert;