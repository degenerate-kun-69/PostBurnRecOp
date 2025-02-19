import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Chart } from 'react-google-charts';
import { AlertTriangle, Droplets, Wind, Sun, Waves, Mountain, Tornado, Thermometer, Snowflake } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const getIcon = (type) => {
  const iconMapping = {
    earthquake: AlertTriangle,
    flood: Droplets,
    cyclone: Wind,
    drought: Sun,
    tsunami: Waves,
    landslide: Mountain,
    tornado: Tornado,
    heatwave: Thermometer,
    avalanche: Snowflake
  };
  
  return iconMapping[type] || AlertTriangle;
};

const getMarkerIcon = (type) => {
  const colors = {
    earthquake: '#ef4444',
    flood: '#3b82f6',
    cyclone: '#8b5cf6',
    drought: '#f59e0b',
    tsunami: '#06b6d4',
    landslide: '#84cc16',
    tornado: '#d946ef',
    heatwave: '#dc2626',
    avalanche: '#1d4ed8'
  };

  const color = colors[type] || '#666666';

  return new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24" height="24">
        <circle cx="12" cy="12" r="10" fill="${color}"/>
      </svg>`
    )}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const getRiskLevelStyle = (riskLevel) => {
  const styles = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  return styles[riskLevel] || styles.low;
};

const isValidCoordinates = (coords) => {
  if (!Array.isArray(coords) || coords.length !== 2) return false;
  const [lat, lng] = coords;
  return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

const MapViews = ({ initialView = 'disaster' }) => {
  const [selectedMap, setSelectedMap] = useState(initialView);

  const disasterZones = [
    {
      id: '1',
      name: 'Bihar Flood Zone',
      type: 'flood',
      coordinates: [25.0961, 85.3131],
      description: 'Regular flooding area in Bihar',
      riskLevel: 'high',
      state: 'IN-BR'
    },
    {
      id: '2',
      name: 'Gujarat Drought Region',
      type: 'drought',
      coordinates: [22.2587, 71.1924],
      description: 'Drought-prone area in Gujarat',
      riskLevel: 'medium',
      state: 'IN-GJ'
    }
  ];



  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <h1 className="text-xl font-bold">India Map Analysis</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedMap('disaster')}
                  className={`px-4 py-2 rounded-md ${
                    selectedMap === 'disaster' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  aria-label="Show disaster zones map"
                  aria-pressed={selectedMap === 'disaster'}
                >
                  Disaster Zones
                </button>
           
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        {selectedMap === 'disaster' ? (
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="MAP_TOKEN">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {disasterZones.map((zone) => {
              if (!isValidCoordinates(zone.coordinates)) {
                console.error(`Invalid coordinates for zone ${zone.id}`);
                return null;
              }

              const Icon = getIcon(zone.type);
              return (
                <Marker
                  key={zone.id}
                  position={zone.coordinates}
                  icon={getMarkerIcon(zone.type)}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <h3 className="font-semibold">{zone.name}</h3>
                      </div>
                      <p className="text-sm mt-1">{zone.description}</p>
                      <span className={`
                        inline-block px-2 py-1 rounded-full text-xs mt-2
                        ${getRiskLevelStyle(zone.riskLevel)}
                      `}>
                        {zone.riskLevel.charAt(0).toUpperCase() + zone.riskLevel.slice(1)} Risk
                      </span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <Chart
            chartType="GeoChart"
            width="100%"
            height="100%"
            data={populationData}
            options={populationOptions}
          />
        )}
      </div>
      
    </div>
  );
};

export default MapViews;