import React from 'react'

import Map from '../Components/Map'
import ChatBot from '../Components/ChatBot'
import Navbar from '../Components/NavBar'
const DashBoard = () => {
  return (
    <>
    <div><Navbar/></div>
     <Map />
     <ChatBot />
    </>
   
  )
}

export default DashBoard