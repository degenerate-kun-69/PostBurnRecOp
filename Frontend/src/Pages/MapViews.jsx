import React from "react";
import { Chart } from "react-google-charts";
import Navbar from "../Components/NavBar";

function MapViews() {
  const data = [
    ["State", "Population"],
    ["IN-UP", 200], // Uttar Pradesh
    ["IN-MH", 150], // Maharashtra
    ["IN-BR", 100], // Bihar
    ["IN-WB", 90],  // West Bengal
    ["IN-MP", 80],  // Madhya Pradesh
    ["IN-TN", 70],  // Tamil Nadu
    ["IN-RJ", 65],  // Rajasthan
    ["IN-KA", 60],  // Karnataka
    ["IN-GJ", 55],  // Gujarat
    ["IN-AP", 50],  // Andhra Pradesh
    ["IN-OR", 45],  // Odisha
    ["IN-TG", 40],  // Telangana
    ["IN-KL", 35],  // Kerala
    ["IN-JH", 30],  // Jharkhand
    ["IN-AS", 25],  // Assam
    ["IN-PB", 20],  // Punjab
    ["IN-CT", 18],  // Chhattisgarh
    ["IN-HR", 15],  // Haryana
    ["IN-JK", 12],  // Jammu and Kashmir
    ["IN-UT", 10],  // Uttarakhand
    ["IN-HP", 8],   // Himachal Pradesh
    ["IN-TR", 7],   // Tripura
    ["IN-ML", 6],   // Meghalaya
    ["IN-MN", 5],   // Manipur
    ["IN-NL", 4],   // Nagaland
    ["IN-GA", 3],   // Goa
    ["IN-AR", 2],   // Arunachal Pradesh
    ["IN-MZ", 1],   // Mizoram
    ["IN-SK", 1],   // Sikkim
    ["IN-DL", 15],  // Delhi
    ["IN-PY", 1],   // Puducherry
    ["IN-CH", 1],   // Chandigarh
    ["IN-AN", 1],   // Andaman and Nicobar Islands
    ["IN-DN", 1],   // Dadra and Nagar Haveli
    ["IN-DD", 1],   // Daman and Diu
    ["IN-LD", 1]    // Lakshadweep
  ];

  const options = {
    region: "IN",
    domain: "IN",
    displayMode: "regions",
    resolution: "provinces",
    colorAxis: { colors: ["#fff3e0", "#e65100"] },
    backgroundColor: "#81d4fa",
    datalessRegionColor: "#f8bbd0",
    defaultColor: "#f5f5f5",
    legend: {
      textStyle: {
        color: "black",
        fontSize: 16
      }
    }
  };

  return (
    <>
   <Navbar  />
    <Chart
      chartType="GeoChart"
      width="100%"
      height="600px"
      data={data}
      options={options}
    />
     </>
  );
}

export default MapViews;