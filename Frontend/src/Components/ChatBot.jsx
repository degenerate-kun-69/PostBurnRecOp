import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

import EmergencyCallButton from './EmergencyCallButton';
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);




  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
   /* const emergencyKeywords = ['emergency', 'help', 'panic', 'accident'];
    if (emergencyKeywords.some(keyword => input.toLowerCase().includes(keyword))) {
      return {
        text: 'If this is an emergency, please call 911 immediately. Would you like me to connect you with emergency services?',
        action: 'emergency',
      };
    }*/   


   /*   ! for typing or showing all  the words in the chatbot 
     */
    
      if (lowerMessage.includes('help') || lowerMessage.includes('call')) {
        return {
          text: 'I can help you with emergency services. Would you like to learn about emergency services or make an emergency call?',
          action: 'help',
          showCallButton: true  // Add flag to show call button
        };
      }
    
    if (lowerMessage.includes('flood')) {
      return {
        text: 'For flood-related emergencies: 1. Move to higher ground immediately 2. Avoid walking through flowing water 3. Stay tuned to local news. Do you need specific evacuation routes?',
      };
    }
  
    if (lowerMessage.includes('earthquake')) {
      return {
        text: 'During an earthquake: 1. Drop, Cover, and Hold On 2. Stay away from windows 3. If inside, stay inside. If outside, stay outside. Would you like more detailed safety instructions?',
      };
    }
  
    if (lowerMessage.includes('hurricane') || lowerMessage.includes('typhoon')) {
      return {
        text: 'For hurricane or typhoon emergencies: 1. Secure your home and board up windows 2. Stay indoors and away from windows 3. Follow evacuation orders if given. Do you need more information on hurricane preparedness?',
      };
    }
  
    if (lowerMessage.includes('tornado')) {
      return {
        text: 'During a tornado: 1. Seek shelter in a basement or an interior room on the lowest floor 2. Stay away from windows 3. Cover yourself with a mattress or heavy blankets. Would you like more detailed safety instructions?',
      };
    }
  
    if (lowerMessage.includes('wildfire')) {
      return {
        text: 'For wildfire emergencies: 1. Evacuate immediately if instructed 2. Close all windows and doors 3. Wear protective clothing and masks to avoid smoke inhalation. Do you need evacuation routes?',
      };
    }
  
    if (lowerMessage.includes('tsunami')) {
      return {
        text: 'During a tsunami warning: 1. Move to higher ground immediately 2. Stay away from the coast 3. Follow local authorities\' instructions. Would you like more detailed safety instructions?',
      };
    }
  
    if (lowerMessage.includes('volcano')) {
      return {
        text: 'For volcanic eruptions: 1. Stay indoors and close all windows and doors 2. Wear protective masks to avoid ash inhalation 3. Follow evacuation orders if given. Do you need more information on volcanic safety?',
      };
    }
  
    if (lowerMessage.includes('blizzard') || lowerMessage.includes('snowstorm')) {
      return {
        text: 'During a blizzard or snowstorm: 1. Stay indoors and keep warm 2. Avoid unnecessary travel 3. Keep emergency supplies ready. Would you like more detailed safety instructions?',
      };
    }
  
    if (lowerMessage.includes('heatwave')) {
      return {
        text: 'During a heatwave: 1. Stay hydrated and avoid strenuous activities 2. Stay indoors in air-conditioned spaces 3. Check on vulnerable individuals. Do you need more information on heatwave safety?',
      };
    }
  
    if (lowerMessage.includes('drought')) {
      return {
        text: 'During a drought: 1. Conserve water and follow local restrictions 2. Avoid using water for non-essential purposes 3. Stay informed about water supply updates. Would you like more detailed conservation tips?',
      };
    }
  
    if (lowerMessage.includes('landslide')) {
      return {
        text: 'For landslide emergencies: 1. Evacuate immediately if you are in a susceptible area 2. Stay away from the path of the landslide 3. Follow local authorities\' instructions. Do you need more information on landslide safety?',
      };
    }
  
    if (lowerMessage.includes('avalanche')) {
      return {
        text: 'During an avalanche: 1. Move to the side of the avalanche path 2. Grab onto something sturdy if possible 3. Cover your mouth and nose to avoid suffocation. Would you like more detailed safety instructions?',
      };
    }
  
    if (lowerMessage.includes('thunderstorm') || lowerMessage.includes('lightning')) {
      return {
        text: 'During a thunderstorm: 1. Stay indoors and away from windows 2. Avoid using electrical appliances 3. Do not take a bath or shower. Would you like more detailed safety instructions?',
      };
    }
  
    if (lowerMessage.includes('hail')) {
      return {
        text: 'During a hailstorm: 1. Stay indoors and away from windows 2. Protect your head and body if caught outside 3. Move vehicles to a covered area. Do you need more information on hailstorm safety?',
      };
    }
  
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const response = getBotResponse(input);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">



      
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    </button>
    
    {isOpen && (
      <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Emergency Chatbot</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 p-4 bg-gray-700 overflow-y-auto">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 bg-gray-700 border-t border-gray-700">
          <div className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your emergency..."
              className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
            >
              <Send size={20} />
            
            </button>
           
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default ChatBot;
