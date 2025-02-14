import React, { useState } from 'react';
import ChatBot from '../Components/ChatBot';
import NavBar from '../Components/NavBar';

const Dashboard = () => {
  const [alerts] = useState([
    { id: 1, type: 'Earthquake', lat: 28.6139, lon: 77.209, description: 'Magnitude 5.2', severity: 'High' },
    { id: 2, type: 'Flood', lat: 19.0760, lon: 72.8777, description: 'Severe flooding', severity: 'Critical' },
    { id: 3, type: 'Fire', lat: 13.0827, lon: 80.2707, description: 'Forest fire', severity: 'Medium' }
  ]);

  const disasterStats = [
    { name: 'Earthquakes', count: 5 },
    { name: 'Floods', count: 12 },
    { name: 'Fires', count: 8 },
    { name: 'Cyclones', count: 4 }
  ];

  const navItems = ['Live Alerts', 'Evacuation Routes', 'Rescue Teams', 'Reports'];
  const maxCount = Math.max(...disasterStats.map(stat => stat.count));

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh', color: 'white' }}>
      {/* Navbar */}
      <nav style={{ 
        backgroundColor: '#1F2937', 
        padding: '1rem', 
        marginBottom: '1rem'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Disaster Management Dashboard</h1>

  <NavBar/>

      </nav>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        gap: '1rem', 
        padding: '1rem' 
      }}>
        {/* Sidebar */}
        <div style={{ 
          gridColumn: 'span 2',
          backgroundColor: '#1F2937',
          padding: '1rem',
          borderRadius: '1rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Dashboard</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map(item => (
              <li key={item} style={{
                padding: '0.5rem',
                backgroundColor: '#374151',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#4B5563'}
              onMouseLeave={e => e.target.style.backgroundColor = '#374151'}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div style={{ gridColumn: 'span 7' }}>
          {/* Geo Chart Placeholder */}
          <div style={{
            backgroundColor: '#1F2937',
            padding: '1rem',
            borderRadius: '0.75rem',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Geographic Data Visualization
          </div>

          {/* Alert List */}
          <div style={{ 
            marginTop: '1rem',
            backgroundColor: '#1F2937',
            padding: '1rem',
            borderRadius: '0.75rem'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Current Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {alerts.map(alert => (
                <div key={alert.id} style={{
                  backgroundColor: '#374151',
                  padding: '0.75rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500' }}>{alert.type}</span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: alert.severity === 'High' ? '#EF4444' : 
                                     alert.severity === 'Critical' ? '#DC2626' : '#F59E0B',
                      color: 'white'
                    }}>
                      {alert.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#D1D5DB', marginTop: '0.25rem' }}>{alert.description}</p>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                    Location: {alert.lat}, {alert.lon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div style={{ 
          gridColumn: 'span 3',
          backgroundColor: '#1F2937',
          padding: '1rem',
          borderRadius: '1rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Disaster Stats</h2>
          
          {/* Simple Bar Chart */}
          <div style={{ 
            backgroundColor: '#374151',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <div style={{ height: '250px' }}>
              {disasterStats.map(stat => (
                <div key={stat.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                  gap: '0.5rem'
                }}>
                  <div style={{ width: '100px' }}>{stat.name}</div>
                  <div style={{
                    height: '24px',
                    backgroundColor: '#4F46E5',
                    width: `${(stat.count / maxCount) * 100}%`,
                    borderRadius: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '0 0.5rem',
                    color: 'white'
                  }}>
                    {stat.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{ 
              backgroundColor: '#374151',
              padding: '1rem',
              borderRadius: '0.75rem'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Total Alerts</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{alerts.length}</div>
            </div>
            <div style={{ 
              backgroundColor: '#374151',
              padding: '1rem',
              borderRadius: '0.75rem'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>Critical</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#EF4444' }}>
                {alerts.filter(a => a.severity === 'Critical').length}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Bot Placeholder */}
        <div style={{ 
          gridColumn: 'span 12',
          backgroundColor: '#1F2937',
          padding: '1rem',
          borderRadius: '0.75rem',
          marginTop: '1rem',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ChatBot/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;