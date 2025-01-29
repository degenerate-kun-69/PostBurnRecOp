import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Shelters from './Pages/Shelters.jsx';
import FireStations from './Pages/FireStations.jsx';
import Hospitals from './Pages/Hospitals.jsx'; 
import AwarenessPage from './Pages/AwarenessPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shelters" element={<Shelters />} />
      <Route path="/fire-stations" element={<FireStations />} />
      <Route path="/hospitals" element={<Hospitals />} />
      <Route path="/Awareness-Page" element={<AwarenessPage />} />
    </Routes>
  );
}

export default App;