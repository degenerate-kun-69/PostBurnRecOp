import React, { useState, useEffect } from 'react';
import { AlertOctagon, Search, RefreshCcw, Map, List, Grid } from 'lucide-react';
import Alert from './AlertNotifications.jsx';

function DisasterAlert() {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      setDisasters(data.features || []);
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

  const filteredDisasters = disasters.filter(disaster =>
    disaster?.properties?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disaster?.properties?.place?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-blue-400 flex flex-col items-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          <div className="animate-pulse">Loading disaster alerts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-red-400 flex items-center p-6 bg-gray-800 rounded-lg shadow-xl">
          <AlertOctagon className="w-6 h-6 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Disaster Alerts
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                title={viewMode === 'list' ? 'Switch to grid view' : 'Switch to list view'}
              >
                {viewMode === 'list' ? <Grid className="w-5 h-5" /> : <List className="w-5 h-5" />}
              </button>
              <button
                onClick={fetchDisasters}
                className={`p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
                disabled={isRefreshing}
                title="Refresh data"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-400 mb-6">
            Monitoring significant earthquakes from the past 30 days
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by location or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-100 placeholder-gray-500"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </header>

        <div className={`space-y-4 ${viewMode === 'grid' ? 'sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0' : ''}`}>
          {filteredDisasters.length === 0 ? (
            <div className="text-center py-8 bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-400">
                {searchTerm ? 'No disasters match your search.' : 'No significant disasters reported at this time.'}
              </p>
            </div>
          ) : (
            filteredDisasters.map((disaster) => (
              <Alert
                key={disaster.id}
                title={disaster?.properties?.title || 'Unknown Title'}
                magnitude={disaster?.properties?.mag || 'N/A'}
                location={disaster?.properties?.place || 'Unknown Location'}
                time={disaster?.properties?.time ? new Date(disaster.properties.time).toLocaleString() : 'Unknown Time'}
                alert={disaster?.properties?.alert || 'N/A'}
                url={disaster?.properties?.url || '#'}
              />
            ))
          )}
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Data refreshes automatically every 5 minutes</p>
          <p>Last updated: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
}

export default DisasterAlert;
