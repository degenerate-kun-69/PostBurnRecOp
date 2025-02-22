import React, { useEffect, useState } from 'react';
import {   Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Shelters from './Pages/Shelters.jsx';
import FireStations from './Pages/FireStations.jsx';
import Hospitals from './Pages/Hospitals.jsx'; 
import AwarenessPage from './Pages/AwarenessPage.jsx';
import DashBoard from './Pages/DashBoard.jsx';
//import MapViews from './Pages/MapViews.jsx';
import DisasterAlert from './Pages/DisasterAlert.jsx';

import axios from 'axios';
import Login from './Pages/Auth/Login.jsx';
import Signup from './Pages/Auth/Signup.jsx';
import Footer from './Components/Footer.jsx';
import Report from './Pages/Report.jsx';
import VolunteerForm from './Pages/VolunteerForm.jsx';
import ResourceForm from './Pages/ResourcesRequirement.jsx';

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/alerts/alerts")
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/fire-stations" element={<FireStations />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/Awareness-Page" element={<AwarenessPage />} />
        <Route path="/DashBoard" element={<DashBoard />} />
    {/*  <Route path="/map-views" element={<MapViews />} /> */}
        <Route path="/DisasterAlert" element={<DisasterAlert />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/VolunteerForm" element={<VolunteerForm />} />
        <Route path="/ResourceRequirement" element={<ResourceForm />} />
      </Routes>
      <Footer />
      </>

  );
}

export default App;
