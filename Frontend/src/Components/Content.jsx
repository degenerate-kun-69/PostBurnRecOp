import React from 'react';
import { 
  Hospital, 
  Building, 
  Flame, 
  Map, 

  Phone, 
  
  Shield 
} from 'lucide-react';

const Content = () => {
  const emergencyServices = [
    {
      title: "Emergency Shelters",
      icon: Building,
      color: "green",
      tips: [
        "Provide safe refuge during disasters",
        "24/7 security and basic amenities",
        "Multiple locations across city"
      ],
      emergencyContact: "Shelter Helpline: 911"
    },
    {
      title: "Fire Stations",
      icon: Flame,
      color: "red",
      tips: [
        "Fire prevention guidelines",
        "Regular safety drills",
        "Rapid emergency response"
      ],
      emergencyContact: "Fire Emergency: 911"
    },
    {
      title: "Hospitals",
      icon: Hospital,
      color: "blue",
      tips: [
        "24/7 emergency medical services",
        "Comprehensive trauma care",
        "Advanced medical equipment"
      ],
      emergencyContact: "Medical Emergency: 911"
    },
    {
      title: "Map Views",
      icon: Map,
      color: "purple",
      tips: [
        "Real-time disaster tracking",
        "Evacuation route planning",
        "Emergency zone identification"
      ],
      emergencyContact: "Emergency Coordination: 112"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Emergency Services Prevention Guide</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {emergencyServices.map((service, index) => {
          const ServiceIcon = service.icon;
          return (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform`}
            >
              <div className={`flex items-center mb-4 text-${service.color}-500`}>
                <ServiceIcon className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <ul className="space-y-2 mb-4">
                {service.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-center text-gray-600">
                    <Shield className="h-4 w-4 mr-2 text-gray-400" />
                    {tip}
                  </li>
                ))}
              </ul>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-green-500" />
                  <span className="font-medium">{service.emergencyContact}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;