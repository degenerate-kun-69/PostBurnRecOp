import React, { useState, useEffect } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';
import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-900">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const IndiaDisasterMap = () => {
  const [activeDisaster, setActiveDisaster] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const disasterTypes = {
    floods: { 
      color: '#1e90ff', 
      title: 'Floods',
      description: 'Flooding is common in coastal areas and river basins during monsoon season.'
    },
    earthquakes: { 
      color: '#ff4500', 
      title: 'Earthquakes',
      description: 'Seismic activity is highest in the northern regions and western Gujarat.'
    },
    cyclones: { 
      color: '#8a2be2', 
      title: 'Cyclones',
      description: 'Coastal regions are vulnerable to tropical cyclones, especially eastern coast.'
    },
    droughts: { 
      color: '#ffd700', 
      title: 'Droughts',
      description: 'Central and western regions frequently experience water scarcity and drought.'
    },
    landslides: { 
      color: '#a52a2a', 
      title: 'Landslides',
      description: 'Hilly regions, especially in the north, are prone to landslides during heavy rain.'
    }
  };

  const regions = [
    {
      name: "Mumbai",
      lat: 19.0760,
      lng: 72.8777,
      disasters: ['floods', 'cyclones'],
      description: "India's financial capital faces flooding during monsoons and cyclone risks."
    },
    {
      name: "Chennai",
      lat: 13.0827,
      lng: 80.2707,
      disasters: ['floods', 'cyclones'],
      description: "Vulnerable to flooding and cyclones from the Bay of Bengal."
    },
    {
      name: "Uttarakhand",
      lat: 30.0668,
      lng: 79.0193,
      disasters: ['landslides', 'earthquakes'],
      description: "Mountainous terrain at high risk for landslides and seismic activity."
    },
    {
      name: "Gujarat",
      lat: 22.2587,
      lng: 71.1924,
      disasters: ['earthquakes', 'floods'],
      description: "High seismic risk zone with 2001 Bhuj earthquake still remembered."
    },
    {
      name: "Rajasthan",
      lat: 27.0238,
      lng: 74.2179,
      disasters: ['droughts'],
      description: "Arid climate leads to frequent drought conditions in this desert state."
    },
    {
      name: "Assam",
      lat: 26.2006,
      lng: 92.9376,
      disasters: ['floods', 'landslides'],
      description: "Brahmaputra river causes severe flooding and landslides annually."
    },
    {
      name: "Odisha",
      lat: 20.9517,
      lng: 85.0985,
      disasters: ['cyclones', 'floods'],
      description: "Bay of Bengal cyclones frequently impact this coastal state."
    },
    {
      name: "Bihar",
      lat: 25.0961,
      lng: 85.3131,
      disasters: ['floods'],
      description: "Ganges river basin is highly prone to seasonal flooding."
    },
    {
      name: "Kerala",
      lat: 10.8505,
      lng: 76.2711,
      disasters: ['floods', 'landslides'],
      description: "Heavy rainfall causes flooding and landslides in this lush state."
    },
    {
      name: "Himachal Pradesh",
      lat: 31.1048,
      lng: 77.1734,
      disasters: ['landslides', 'earthquakes'],
      description: "Mountainous terrain vulnerable to landslides and seismic activity."
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;

    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const newMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.5937, lng: 78.9629 },
      zoom: 5,
      styles: [
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ visibility: "simplified" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }]
        }
      ]
    });
    setMap(newMap);
  };

  useEffect(() => {
    if (!map) return;

    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    const filteredRegions = activeDisaster === 'all' 
      ? regions 
      : regions.filter(region => region.disasters.includes(activeDisaster));

    filteredRegions.forEach(region => {
      const marker = new window.google.maps.Marker({
        position: { lat: region.lat, lng: region.lng },
        map,
        title: region.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: selectedRegion === region.name ? 12 : 8,
          fillColor: region.disasters.includes(activeDisaster) || activeDisaster === 'all'
            ? disasterTypes[region.disasters[0]].color
            : '#999999',
          fillOpacity: selectedRegion === region.name ? 1 : 0.7,
          strokeColor: selectedRegion === region.name ? '#333333' : 'white',
          strokeWeight: 2
        }
      });

      marker.addListener('click', () => {
        setSelectedRegion(region.name === selectedRegion ? null : region.name);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, activeDisaster, selectedRegion]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>India Disaster Risk Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96">
          <div id="map" className="w-full h-full rounded-lg overflow-hidden" />
          
          {/* Disaster type selector */}
          <div className="absolute top-2 left-2 bg-white rounded shadow-md p-2">
            <div className="text-xs font-semibold mb-1 text-gray-700">Disaster Types:</div>
            <div className="grid grid-cols-2 gap-1">
              <button
                className={`text-xs py-1 px-2 rounded flex items-center ${
                  activeDisaster === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveDisaster('all')}
              >
                All Types
              </button>
              
              {Object.entries(disasterTypes).map(([key, disaster]) => (
                <button
                  key={key}
                  className={`text-xs py-1 px-2 rounded flex items-center ${
                    activeDisaster === key ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveDisaster(key)}
                >
                  <span
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: disaster.color }}
                  />
                  {disaster.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Region details panel */}
          {selectedRegion && (
            <div className="absolute bottom-2 left-2 right-2 bg-white rounded shadow-lg p-3 max-w-xs">
              <button 
                className="absolute top-1 right-1 p-1 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedRegion(null)}
              >
                <X size={14} />
              </button>
              
              <h4 className="font-bold text-sm">{selectedRegion}</h4>
              
              {regions.find(r => r.name === selectedRegion)?.disasters.map(disaster => (
                <div key={disaster} className="mt-1 flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: disasterTypes[disaster].color }}
                  />
                  <span className="text-xs">{disasterTypes[disaster].title}</span>
                </div>
              ))}
              
              <p className="mt-2 text-xs text-gray-600">
                {regions.find(r => r.name === selectedRegion)?.description}
              </p>
            </div>
          )}
          
          {/* Information tooltip */}
          {showInfo && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded shadow-md p-2 max-w-xs">
              <button 
                className="absolute top-1 right-1 p-1 text-gray-500 hover:text-gray-700"
                onClick={() => setShowInfo(false)}
              >
                <X size={12} />
              </button>
              
              <div className="flex items-start">
                <Info size={16} className="text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-700 font-medium">Interactive Disaster Risk Map</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Click on markers to see detailed information. Filter by disaster type using the controls.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaDisasterMap;