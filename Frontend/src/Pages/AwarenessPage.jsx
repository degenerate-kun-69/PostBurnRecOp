import React from 'react';
import {
  Cloud, CloudRain, Wind, Waves, Flame, Mountain,
  Shield, AlertTriangle, Phone, ChevronFirst as FirstAid,
  Home, Package, Battery, Radio, Calendar, Thermometer,
  Snowflake, CloudLightning, CloudFog, Skull,
  Droplets, HeartPulse, Tent, Sandwich
} from 'lucide-react';
//import Navbar from '../Components/NavBar';

const DisasterGuide = ({ 
  icon: Icon, 
  title, 
  description, 
  guidelines,
  beforeDisaster,
  duringDisaster,
  afterDisaster 
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">Key Prevention Guidelines:</h4>
      <ul className="space-y-2">
        {guidelines.map((guideline, index) => (
          <li key={index} className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
            <span className="text-gray-700">{guideline}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-4 mt-6 pt-4 border-t border-gray-100">
      <div>
        <h4 className="font-semibold text-blue-600 mb-2">Before Disaster:</h4>
        <ul className="space-y-1">
          {beforeDisaster.map((item, index) => (
            <li key={index} className="text-sm text-gray-600">• {item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-red-600 mb-2">During Disaster:</h4>
        <ul className="space-y-1">
          {duringDisaster.map((item, index) => (
            <li key={index} className="text-sm text-gray-600">• {item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-green-600 mb-2">After Disaster:</h4>
        <ul className="space-y-1">
          {afterDisaster.map((item, index) => (
            <li key={index} className="text-sm text-gray-600">• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const EmergencyKit = () => (
  <div className="bg-blue-50 rounded-xl p-6 mt-8">
    <div className="flex items-center gap-3 mb-6">
      <Package className="h-8 w-8 text-blue-600" />
      <h2 className="text-2xl font-bold text-gray-800">Emergency Kit Essentials</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { icon: Battery, item: "Flashlights and extra batteries" },
        { icon: FirstAid, item: "First aid kit and medications" },
        { icon: Radio, item: "Battery-powered or hand-crank radio" },
        { icon: Sandwich, item: "3-day supply of non-perishable food" },
        { icon: Droplets, item: "1 gallon of water per person per day" },
        { icon: Home, item: "Important documents in waterproof container" },
        { icon: Calendar, item: "Change of clothes and sturdy shoes" },
        { icon: Tent, item: "Emergency shelter supplies" },
        { icon: HeartPulse, item: "Prescription medications" }
      ].map((item, index) => (
        <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
          <item.icon className="h-5 w-5 text-blue-600" />
          <span className="text-gray-700">{item.item}</span>
        </div>
      ))}
    </div>
  </div>
);

const EmergencyContacts = () => (
  <div className="bg-red-50 rounded-xl p-6 mt-8">
    <div className="flex items-center gap-3 mb-6">
      <Phone className="h-8 w-8 text-red-600" />
      <h2 className="text-2xl font-bold text-gray-800">Emergency Contacts</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
         { number: "112/108", service: "Emergency Disaster Management Helpline (NDRF):" },
         { number: "+91-11-26701728, 26701729", service: "National Disaster Management Authority (NDMA):" },
         { number: "+91-11-24619943, 24610201", service: "- Indian Meteorological Department (Weather Forecasts and Alerts)" },
         { number: "1070", service: "Flood Control Helpline" },
         { number: "24619943", service: "Indian Seismology Division (IMD)" },
         { number: "24652484", service: "IMD Cyclone Warning" },
        
      ].map((contact, index) => (
        <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
          <span className="text-gray-700">{contact.service}</span>
          <span className="font-bold text-red-600">{contact.number}</span>
        </div>
      ))}
    </div>
  </div>
);

const AwarenessPage = () => {
  const disasterGuides = [
    
    {
    

      icon: Mountain,
      title: "Volcanoes",
      description: "Volcanic eruptions can release lava, gases, rocks, and ash into the surrounding area, causing widespread destruction.",
      guidelines: [
        "Know your area's volcanic risk level",
        "Prepare an emergency evacuation plan",
        "Keep goggles and masks ready for ash",
        "Monitor volcanic activity alerts"
      ]
      ,
      beforeDisaster: [
        "Develop an evacuation plan and practice it",
        "Prepare emergency supplies including masks",
        "Keep vehicles fueled and ready",
        "Learn about community warning systems"
      ],
      duringDisaster: [
        "Follow evacuation orders immediately",
        "Avoid low-lying areas and valleys",
        "Protect yourself from ash fall",
        "Stay indoors if possible"
      ],
      afterDisaster: [
        "Stay away until authorities say it's safe",
        "Clear heavy ash from roofs",
        "Avoid driving in heavy ash",
        "Use masks when cleaning ash"
      ]
    },
    {
      icon: CloudRain,
      title: "Floods",
      description: "Flash floods can occur within minutes of excessive rainfall, or when a dam or levee breaks.",
      guidelines: [
        "Move to higher ground immediately if flooding occurs",
        "Never drive through flooded roadways",
        "Prepare a flood evacuation plan and emergency kit",
        "Install check valves in plumbing to prevent flood water backup"
      ],
      beforeDisaster: [
        "Elevate electrical components",
        "Install sump pumps with battery backup",
        "Document your possessions",
        "Get flood insurance if in risk area"
      ],
      duringDisaster: [
        "Move to higher ground immediately",
        "Follow evacuation routes",
        "Avoid walking through flood waters",
        "Turn off utilities if instructed"
      ],
      afterDisaster: [
        "Document damage for insurance",
        "Clean and disinfect everything that got wet",
        "Watch for downed power lines",
        "Check for structural damage"
      ]
    },
    {
      icon: Wind,
      title: "Hurricanes",
      description: "Hurricanes can bring heavy rains, strong winds, floods, and coastal storm surges.",
      guidelines: [
        "Board up windows and secure outdoor objects",
        "Have an evacuation plan and emergency supplies ready",
        "Stay informed about weather conditions and evacuation orders",
        "Keep important documents in a waterproof container"
      ],
      beforeDisaster: [
        "Install storm shutters",
        "Create a hurricane evacuation plan",
        "Stock up on emergency supplies",
        "Trim trees and shrubs"
      ],
      duringDisaster: [
        "Stay inside away from windows",
        "Monitor emergency broadcasts",
        "Keep emergency supplies accessible",
        "Fill bathtubs and containers with water"
      ],
      afterDisaster: [
        "Stay away from damaged areas",
        "Avoid downed power lines",
        "Document damage with photos",
        "Begin cleanup when safe"
      ]
    },
    {
      icon: Flame,
      title: "Wildfires",
      description: "Wildfires can spread quickly and ignite brush, trees, and homes.",
      guidelines: [
        "Create a 30-foot defensible space around your home",
        "Keep emergency supplies in your car if evacuation is necessary",
        "Follow evacuation orders immediately",
        "Have a family communication plan in place"
      ],
      beforeDisaster: [
        "Clear vegetation around home",
        "Use fire-resistant materials",
        "Create emergency evacuation plan",
        "Install smoke detectors"
      ],
      duringDisaster: [
        "Follow evacuation orders immediately",
        "Close all windows and doors",
        "Remove flammable curtains",
        "Turn on outside lights for visibility"
      ],
      afterDisaster: [
        "Wait for official clearance to return",
        "Check for hot spots",
        "Document damage for insurance",
        "Watch for flash floods"
      ]
    },
    {
      icon: Waves,
      title: "Tsunamis",
      description: "Tsunamis are series of waves caused by earthquakes or underwater landslides.",
      guidelines: [
        "Move inland and to higher ground immediately",
        "Follow evacuation routes and signs",
        "Never return to shore after first wave",
        "Wait for official all-clear before returning"
      ],
      beforeDisaster: [
        "Know evacuation routes",
        "Practice evacuation plan",
        "Prepare emergency kit",
        "Learn warning signs"
      ],
      duringDisaster: [
        "Move to high ground immediately",
        "Follow evacuation orders",
        "Stay away from coast",
        "Listen to emergency broadcasts"
      ],
      afterDisaster: [
        "Wait for official all-clear",
        "Stay away from flood waters",
        "Help injured or trapped persons",
        "Avoid damaged areas"
      ]
    },
    {
      icon: Cloud,
      title: "Tornadoes",
      description: "Tornadoes are violently rotating columns of air that can cause devastating damage.",
      guidelines: [
        "Seek shelter in a basement or interior room",
        "Stay away from windows and outside walls",
        "Keep emergency supplies in your shelter area",
        "Monitor weather reports and warning systems"
      ],
      beforeDisaster: [
        "Identify safe room or shelter",
        "Practice tornado drills",
        "Secure outdoor objects",
        "Install tornado alerts"
      ],
      duringDisaster: [
        "Get to lowest building level",
        "Stay away from windows",
        "Protect head with arms",
        "Listen for updates"
      ],
      afterDisaster: [
        "Stay in shelter until all-clear",
        "Watch for downed power lines",
        "Help injured people",
        "Document damage"
      ]
    },
    {
      icon: Thermometer,
      title: "Heat Waves",
      description: "Extended periods of extreme heat can cause severe health issues and infrastructure strain.",
      guidelines: [
        "Stay hydrated and avoid alcohol",
        "Stay in air-conditioned spaces",
        "Check on vulnerable neighbors",
        "Never leave children or pets in cars"
      ],
      beforeDisaster: [
        "Install window air conditioners",
        "Stock up on water",
        "Prepare cooling methods",
        "Check AC maintenance"
      ],
      duringDisaster: [
        "Stay indoors during peak heat",
        "Use cool compresses",
        "Drink plenty of fluids",
        "Minimize physical activity"
      ],
      afterDisaster: [
        "Continue hydrating",
        "Monitor for heat illness",
        "Help vulnerable people",
        "Prepare for future events"
      ]
    },
    {
      icon: Snowflake,
      title: "Blizzards",
      description: "Severe winter storms with high winds, heavy snow, and dangerous wind chills.",
      guidelines: [
        "Winterize your home before the season",
        "Keep emergency heating equipment ready",
        "Stock up on winter supplies",
        "Maintain communication devices"
      ],
      beforeDisaster: [
        "Insulate pipes",
        "Service heating systems",
        "Stock winter supplies",
        "Prepare emergency kit"
      ],
      duringDisaster: [
        "Stay indoors",
        "Conserve heat", 
        "Monitor carbon monoxide",
        "Keep pipes from freezing"
      ],
      afterDisaster: [
        "Clear snow safely",
        "Check for frozen pipes",
        "Help neighbors in need",
        "Restock supplies"
      ]
    },
    {
      icon: CloudLightning,
      title: "Severe Thunderstorms",
      description: "Dangerous storms with lightning, heavy rain, hail, and strong winds.",
      guidelines: [
        "Stay inside during storms",
        "Unplug electronic equipment",
        "Have backup power ready",
        "Monitor weather alerts"
      ],
      beforeDisaster: [
        "Trim dead tree branches",
        "Secure outdoor objects",
        "Install surge protectors",
        "Prepare safe room"
      ],
      duringDisaster: [
        "Stay away from windows",
        "Avoid electrical equipment",
        "Listen for warnings",
        "Be ready for power outages"
      ],
      afterDisaster: [
        "Check for damage",
        "Stay away from downed lines",
        "Report hazards",
        "Document damage"
      ]
    },
    {
      icon: CloudFog,
      title: "Landslides",
      description: "Mass movement of rock, earth, or debris down a slope that can be triggered by rain or earthquakes.",
      guidelines: [
        "Recognize warning signs like cracks",
        "Have evacuation route planned",
        "Monitor local warnings",
        "Install proper drainage"
      ],
      beforeDisaster: [
        "Assess property risk",
        "Install drainage systems",
        "Plant ground cover",
        "Learn warning signs"
      ],
      duringDisaster: [
        "Evacuate immediately",
        "Listen for unusual sounds",
        "Watch for debris flow",
        "Alert neighbors"
      ],
      afterDisaster: [
        "Stay away from slide area",
        "Check for damage",
        "Report hazards",
        "Monitor for more slides"
      ]
    },
    {
      icon: Skull,
      title: "Pandemics",
      description: "Widespread occurrence of infectious diseases affecting large populations.",
      guidelines: [
        "Follow public health guidelines",
        "Practice good hygiene",
        "Keep emergency supplies ready",
        "Stay informed through official sources"
      ],
      beforeDisaster: [
        "Stock medical supplies",
        "Create family plan",
        "Maintain hygiene supplies",
        "Learn about vaccines"
      ],
      duringDisaster: [
        "Follow health guidelines",
        "Practice social distancing",
        "Wear protective equipment",
        "Monitor symptoms"
      ],
      afterDisaster: [
        "Continue precautions",
        "Get recommended vaccines",
        "Support community recovery",
        "Prepare for future waves"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
     
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Natural Disaster Awareness & Prevention</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Being prepared for natural disasters can save lives. Learn about different types of disasters,
          prevention measures, and what to do when they occur.
        </p>
      </div>

      {/* Alert Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-yellow-400" />
          <p className="text-yellow-700">
            <strong>Stay Prepared:</strong> Keep emergency contacts handy and have an evacuation plan ready.
            Monitor local news and weather alerts for updates during emergencies.
          </p>
        </div>
      </div>

      {/* Disaster Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disasterGuides.map((guide, index) => (
          <DisasterGuide key={index} {...guide} />
        ))}
      </div>

      {/* Emergency Kit Section */}
      <EmergencyKit />

      {/* Emergency Contacts Section */}
      <EmergencyContacts />
    </div>
  );
};

export default AwarenessPage;