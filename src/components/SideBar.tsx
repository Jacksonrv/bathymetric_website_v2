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
            <Link to="/map" onClick={handleClick}>Map</Link>
        </li>

        <li>
            <button
            onClick={() => setShowPlots(!showPlots)}
            className="submenu-toggle"
            >
            Plots
            <span className={`arrow ${showPlots ? 'open' : ''}`}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 185.343 185.343"
                width="16"
                height="16"
                fill="white"
                >
                <path
                    d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 
                    l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 
                    c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"
                />
                </svg>
            </span>
            </button>

            <ul className={`submenu ${showPlots ? 'open' : ''}`}>
            <li>
                <Link to="/Plots/Barium" onClick={handleClick}>Barium</Link>
            </li>
            <li>
                <Link to="/Plots/TempProxy" onClick={handleClick}>Temperature Proxies</Link>
            </li>
            </ul>
        </li>

        <li>
            <Link to="/About" onClick={handleClick}>About</Link>
        </li>
        </ul>
    </nav>
    );

};

export default Sidebar;
