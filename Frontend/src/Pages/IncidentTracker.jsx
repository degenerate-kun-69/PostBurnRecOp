import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, MapPin, Clock, Shield, AlertCircle, Users, Phone, Ambulance, FileText, ChevronDown, ChevronUp, Building2, Radio } from 'lucide-react';

const mockIncidents = [
  {
    id: '1',
    title: 'Forest Fire',
    location: 'Northern District, Sector 7',
    severity: 'critical',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'active',
    description: 'Large forest fire spreading rapidly. Multiple teams deployed.',
    affectedArea: '2.5 km²',
    populationAffected: 1500,
    resources: [
      { type: 'Fire Trucks', count: 8, status: 'deployed' },
      { type: 'Emergency Response Teams', count: 12, status: 'active' },
      { type: 'Medical Units', count: 4, status: 'standby' }
    ],
    leadResponder: 'Chief John Smith',
    contactNumber: '555-0123',
    updates: [
      { time: new Date(Date.now() - 1800000).toISOString(), message: 'Fire spreading towards east. Additional units requested.' },
      { time: new Date(Date.now() - 3600000).toISOString(), message: 'Initial response teams deployed. Setting up containment lines.' }
    ],
    weatherConditions: 'Strong winds from SW, 15-20 mph'
  },
  {
    id: '2',
    title: 'Flash Flood',
    location: 'Riverside Community',
    severity: 'high',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'responding',
    description: 'Flash flood affecting residential areas. Evacuation in progress.',
    affectedArea: '1.2 km²',
    populationAffected: 800,
    resources: [
      { type: 'Rescue Boats', count: 6, status: 'active' },
      { type: 'Emergency Response Teams', count: 8, status: 'deployed' },
      { type: 'Medical Units', count: 3, status: 'active' }
    ],
    leadResponder: 'Sarah Johnson',
    contactNumber: '555-0124',
    updates: [
      { time: new Date(Date.now() - 3600000).toISOString(), message: 'Evacuation 60% complete. Water levels rising.' },
      { time: new Date(Date.now() - 5400000).toISOString(), message: 'Emergency shelters established at community centers.' }
    ],
    evacuationStatus: 'In Progress - 60% Complete',
    weatherConditions: 'Heavy rainfall continuing, visibility poor'
  },
  {
    id: '3',
    title: 'Power Outage',
    location: 'Downtown District',
    severity: 'medium',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    status: 'contained',
    description: 'Power outage affecting 500 households. Repair crews on site.',
    affectedArea: '0.8 km²',
    populationAffected: 2000,
    resources: [
      { type: 'Repair Crews', count: 4, status: 'active' },
      { type: 'Emergency Generators', count: 6, status: 'deployed' },
      { type: 'Support Vehicles', count: 3, status: 'standby' }
    ],
    leadResponder: 'Mike Chen',
    contactNumber: '555-0125',
    updates: [
      { time: new Date(Date.now() - 2700000).toISOString(), message: 'Main transformer replaced. Testing in progress.' },
      { time: new Date(Date.now() - 4500000).toISOString(), message: 'Cause identified as lightning strike. Crews accessing damage.' }
    ]
  }
];

const ResourceCard = ({ resource }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="text-sm font-medium">{resource.type}</div>
    <div className="text-sm text-gray-600">Count: {resource.count}</div>
    <div className={`text-sm font-medium ${getResourceStatusColor(resource.status)} capitalize`}>
      {resource.status}
    </div>
  </div>
);

ResourceCard.propTypes = {
  resource: PropTypes.shape({
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

const StatusBadge = ({ status }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium">Status:</span>
    <div className="flex items-center gap-1">
      <div className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
      <span className="text-sm capitalize">{status}</span>
    </div>
  </div>
);

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['active', 'responding', 'contained']).isRequired
};

const UpdateItem = ({ time, message }) => (
  <div className="text-sm">
    <span className="text-gray-500">{new Date(time).toLocaleTimeString()}: </span>
    <span className="text-gray-700">{message}</span>
  </div>
);

UpdateItem.propTypes = {
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-red-500';
    case 'responding': return 'bg-yellow-500';
    case 'contained': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getResourceStatusColor = (status) => {
  switch (status) {
    case 'active': return 'text-green-600';
    case 'deployed': return 'text-blue-600';
    case 'standby': return 'text-yellow-600';
    default: return 'text-gray-600';
  }
};

const IncidentCard = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{incident.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {incident.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(incident.timestamp).toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {incident.affectedArea}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {incident.populationAffected.toLocaleString()} affected
            </div>
          </div>
          
          <p className="text-gray-600 mb-2">{incident.description}</p>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            {isExpanded ? (
              <>Less details <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>More details <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        </div>

        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={incident.status} />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
                <Radio className="h-4 w-4" /> Response Team
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{incident.leadResponder}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{incident.contactNumber}</span>
                </div>
              </div>
            </div>

            {incident.weatherConditions && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Weather Conditions</h4>
                <p className="text-sm text-gray-600">{incident.weatherConditions}</p>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
              <Ambulance className="h-4 w-4" /> Deployed Resources
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {incident.resources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
              <FileText className="h-4 w-4" /> Recent Updates
            </h4>
            <div className="space-y-2">
              {incident.updates.map((update, index) => (
                <UpdateItem key={index} time={update.time} message={update.message} />
              ))}
            </div>
          </div>

          {incident.evacuationStatus && (
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-1">Evacuation Status</h4>
              <p className="text-sm text-orange-700">{incident.evacuationStatus}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

IncidentCard.propTypes = {
  incident: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['critical', 'high', 'medium', 'low']).isRequired,
    timestamp: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['active', 'responding', 'contained']).isRequired,
    description: PropTypes.string.isRequired,
    affectedArea: PropTypes.string.isRequired,
    populationAffected: PropTypes.number.isRequired,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired
      })
    ).isRequired,
    leadResponder: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    updates: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
      })
    ).isRequired,
    evacuationStatus: PropTypes.string,
    weatherConditions: PropTypes.string
  }).isRequired
};

const StatusCard = ({ icon: Icon, title, value, color }) => (
  <div className={`flex items-center gap-3 p-4 bg-${color}-50 rounded-lg`}>
    <Icon className={`h-6 w-6 text-${color}-600`} />
    <div>
      <div className={`font-medium text-${color}-800`}>{title}</div>
      <div className={`text-sm text-${color}-600`}>{value}</div>
    </div>
  </div>
);

StatusCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

const IncidentTracker = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            Active Incidents
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Last updated:</span>
            <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          {mockIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-3 gap-4">
          <StatusCard
            icon={Shield}
            title="Response Teams"
            value="24 Active Units"
            color="green"
          />
          <StatusCard
            icon={AlertCircle}
            title="Monitoring Status"
            value="24/7 Active"
            color="blue"
          />
          <StatusCard
            icon={Radio}
            title="Communication"
            value="All Channels Open"
            color="purple"
          />
        </div>
        </div>
    </div>
  );
};

export default IncidentTracker;