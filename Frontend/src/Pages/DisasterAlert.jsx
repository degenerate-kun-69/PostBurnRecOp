import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisasterAlerts = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch disaster data from multiple sources
  const fetchDisasterData = async () => {
    try {
      // NASA EONET API
      const nasaRes = await axios.get("https://eonet.gsfc.nasa.gov/api/v3/events");
      const nasaEvents = nasaRes.data.events.map(event => ({
        id: event.id,
        title: event.title,
        category: event.categories[0]?.title || "Unknown",
        source: "NASA EONET"
      }));

      // USGS Earthquake API (last 7 days)
      const usgsRes = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson");
      const usgsEvents = usgsRes.data.features.map(event => ({
        id: event.id,
        title: `Earthquake: M${event.properties.mag} - ${event.properties.place}`,
        category: "Earthquake",
        source: "USGS"
      }));

      // GDACS API (Global Disaster Alert System) - Simulated data (as it requires API Key)
      const gdacsEvents = [
        { id: "GDACS-001", title: "Cyclone Freddy in the Indian Ocean", category: "Cyclone", source: "GDACS" },
        { id: "GDACS-002", title: "Tsunami Warning near Japan", category: "Tsunami", source: "GDACS" }
      ];

      const allEvents = [...nasaEvents, ...usgsEvents, ...gdacsEvents];

      setEvents(allEvents);
      setFilteredEvents(allEvents);

      // Show notifications for each disaster event
      allEvents.forEach((event) => {
        toast.warn(`${event.title} reported! 🌍`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });

    } catch (error) {
      console.error("Error fetching disaster data:", error);
      toast.error("Failed to load disaster data! ❌", { theme: "dark" });
    }
  };

  useEffect(() => {
    fetchDisasterData();
    const interval = setInterval(fetchDisasterData, 3600000); // Refresh every 1 hour
    return () => clearInterval(interval);
  }, []);

  // Filter events by disaster category
  const handleFilterChange = (category) => {
    setFilter(category);
    if (category === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === category));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
        🌍 Disaster Alerts
      </h2>
      <ToastContainer />

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "Earthquake", "Cyclone", "Tsunami", "Wildfire"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterChange(cat)}
            className={`px-4 py-2 rounded-lg ${
              filter === cat ? "bg-yellow-400 text-black" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Disaster List */}
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg p-6 rounded-xl">
        {filteredEvents.length > 0 ? (
          <ul className="space-y-4">
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                className="p-4 border border-gray-600 rounded-lg shadow-md transition hover:bg-gray-700 hover:scale-105"
              >
                <strong className="text-lg text-yellow-300">{event.title}</strong> <br />
                <span className="text-gray-400">Category: {event.category}</span> <br />
                <span className="text-gray-500">Source: {event.source}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">No recent disasters reported.</p>
        )}
      </div>
    </div>
  );
};

export default DisasterAlerts;
