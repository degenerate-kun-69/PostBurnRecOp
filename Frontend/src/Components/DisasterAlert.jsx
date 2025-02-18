import React, { useState, useEffect } from 'react';
import { AlertOctagon, RefreshCcw, ArrowUpRight, AlertTriangle, Clock } from 'lucide-react';

function DisastersAlert() {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDisasters = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch disaster data');
      }
      const data = await response.json();
      
      // Sort features by time (newest first) and take only 2
      const sortedFeatures = [...(data.features || [])]
        .sort((a, b) => (b.properties?.time || 0) - (a.properties?.time || 0))
        .slice(0, 2);
      
      setDisasters(sortedFeatures);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
    const interval = setInterval(fetchDisasters, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to determine severity color based on magnitude
  const getSeverityColor = (magnitude) => {
    const mag = parseFloat(magnitude);
    if (mag >= 7) return 'bg-red-900 border-red-700 border-l-red-500';
    if (mag >= 5) return 'bg-orange-900 border-orange-700 border-l-orange-500';
    if (mag >= 3) return 'bg-yellow-900 border-yellow-700 border-l-yellow-500';
    return 'bg-blue-900 border-blue-700 border-l-blue-500';
  };

  const getBorderLeft = (magnitude) => {
    const mag = parseFloat(magnitude);
    if (mag >= 7) return 'border-l-4 border-l-red-500';
    if (mag >= 5) return 'border-l-4 border-l-orange-500';
    if (mag >= 3) return 'border-l-4 border-l-yellow-500';
    return 'border-l-4 border-l-blue-500';
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 rounded-lg shadow-lg flex items-center justify-center h-28">
        <div className="text-blue-400 flex flex-col items-center space-y-2">
          <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
          <div className="text-sm animate-pulse">Loading alerts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 rounded-lg shadow-lg flex items-center justify-center h-28">
        <div className="text-red-400 flex items-center p-2 bg-gray-800 rounded-lg shadow-md text-sm">
          <AlertOctagon className="w-4 h-4 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-3 rounded-lg shadow-lg">
      <header className="mb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1 text-blue-400" />
            Latest Alerts
          </h2>
          <div className="flex space-x-2 items-center">
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
            </div>
            <button
              onClick={fetchDisasters}
              className={`p-1 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              disabled={isRefreshing}
              title="Refresh data"
            >
              <RefreshCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {disasters.length === 0 ? (
          <div className="text-center py-4 bg-gray-800 rounded-md shadow-md text-sm col-span-full">
            <p className="text-gray-400">No significant disasters reported</p>
          </div>
        ) : (
          disasters.map((disaster) => {
            const magnitude = disaster?.properties?.mag || 'N/A';
            return (
              <div
                key={disaster.id}
                className={`p-2 rounded-md border ${getSeverityColor(magnitude)} ${getBorderLeft(magnitude)} transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col h-full justify-between`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 pr-2">
                    <h3 className="font-medium text-sm text-white mb-1 line-clamp-2" title={disaster?.properties?.title || 'Unknown Title'}>
                      {disaster?.properties?.title || 'Unknown Title'}
                    </h3>
                    <p className="text-xs text-gray-300 truncate" title={disaster?.properties?.place || 'Unknown Location'}>
                      {disaster?.properties?.place || 'Unknown Location'}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-gray-800 rounded-full h-8 w-8 shrink-0">
                    <span className="font-bold text-white text-sm">{magnitude}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-700 text-xs">
                  <span className="text-gray-400">
                    {disaster?.properties?.time ? new Date(disaster.properties.time).toLocaleTimeString() : 'Unknown Time'}
                  </span>
                  <a
                    href={disaster?.properties?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    title="View details"
                  >
                    Details <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DisastersAlert;