import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/SideBar';
import Map from './pages/Map';
import Plot1 from './pages/Plots/Barium';
import Plot2 from './pages/Plots/TempProxy';
import About from './pages/About';
import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />

      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
        {/* Sidebar */}
        <div
          style={{
            position: isMobile ? 'absolute' : 'relative',
            zIndex: 1000,
            width: isMobile ? '100vw' : '220px',
            height: isMobile ? '100vh' : '100%',
            backgroundColor: '#111',
            color: 'white',
            transition: 'transform 0.3s ease-in-out',
            transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          }}
        >
          <Sidebar closeSidebar={isMobile ? () => setSidebarOpen(false) : undefined} />
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'white',
                color: '#111',
                border: 'none',
                padding: '0.5rem',
                cursor: 'pointer',
                zIndex: 1001,
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, position: 'relative' }}>
          {isMobile && !sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 1000,
                background: '#111',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>
          )}

          <Routes>
            <Route path="/" element={<Navigate to="/About" replace />} />
            <Route path="/About" element={<About />} />
            <Route path="/map" element={<Map />} />
            <Route path="/plots/Barium" element={<Plot1 />} />
            <Route path="/plots/TempProxy" element={<Plot2 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
