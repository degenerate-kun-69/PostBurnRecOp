import React, { useState } from 'react';

const GeoChart = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  const data = [
    { country: "Germany", value: 200 },
    { country: "United States", value: 300 },
    { country: "Brazil", value: 400 },
    { country: "Canada", value: 500 },
    { country: "France", value: 600 },
    { country: "Russia", value: 700 }
  ];

  const maxValue = Math.max(...data.map(item => item.value));

  const handleClick = (country) => {
    setSelectedRegion(country);
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Geographic Data Distribution</h2>
      </div>
      <div>
        {data.map((item) => (
          <div
            key={item.country}
            onClick={() => handleClick(item)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              marginBottom: '8px',
              cursor: 'pointer',
              backgroundColor: selectedRegion?.country === item.country ? '#f0f0f0' : 'transparent',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{ width: '120px' }}>{item.country}</div>
            <div style={{ flex: 1, marginRight: '20px' }}>
              <div style={{ 
                position: 'relative',
                height: '24px',
                backgroundColor: '#eee',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: '#2196f3',
                    width: `${(item.value / maxValue) * 100}%`,
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
            <div style={{ width: '60px', textAlign: 'right' }}>{item.value}</div>
          </div>
        ))}
      </div>
      
      {selectedRegion && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <p style={{ margin: '0 0 5px 0' }}>Selected Region: {selectedRegion.country}</p>
          <p style={{ margin: '0' }}>Value: {selectedRegion.value}</p>
        </div>
      )}
    </div>
  );
};

export default GeoChart;