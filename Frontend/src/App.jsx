import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Shelters from './Pages/Shelters.jsx';
import FireStations from './Pages/FireStations.jsx';
import Hospitals from './Pages/Hospitals.jsx'; 
import AwarenessPage from './Pages/AwarenessPage.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import MapViews from './Pages/MapViews.jsx';
import DisasterAlert from './Pages/DisasterAlert.jsx';
function App() {
  return (
  <>
 
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shelters" element={<Shelters />} />
      <Route path="/fire-stations" element={<FireStations />} />
      <Route path="/hospitals" element={<Hospitals />} />
      <Route path="/Awareness-Page" element={<AwarenessPage />} />
      <Route path="/DashBoard" element={<DashBoard />} />
      <Route path="/map-views" element={<MapViews />} />
      <Route path="/disaster-alerts" element={<DisasterAlert />} />
    </Routes>
 
    </>
  );
}

export default App;