import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const Sidebar: React.FC = () => {
  const [showPlots, setShowPlots] = useState(false);

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <button onClick={() => setShowPlots(!showPlots)}>
            Plots {showPlots ? '▾' : '▸'}
          </button>
          {showPlots && (
            <ul className="submenu">
              <li><Link to="/Plots/Barium">Plot 1</Link></li>
              <li><Link to="/Plots/TempProxy">Plot 2</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
