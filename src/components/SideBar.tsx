import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';


type SidebarProps = {
  closeSidebar?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const [showPlots, setShowPlots] = useState(false);

  const handleClick = () => {
    if (closeSidebar) closeSidebar();
        setShowPlots(false);
  };

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/About" onClick={handleClick}>About</Link>
        </li>
        <li>
          <Link to="/map" onClick={handleClick}>Map</Link>
        </li>
        <li>
          <button onClick={() => setShowPlots(!showPlots)}>
            Plots {showPlots ? '▾' : '▸'}
          </button>
          {showPlots && (
            <ul className="submenu">
              <li><Link to="/Plots/Barium" onClick={handleClick}>Barium</Link></li>
              <li><Link to="/Plots/TempProxy" onClick={handleClick}>Temperature Proxies</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
