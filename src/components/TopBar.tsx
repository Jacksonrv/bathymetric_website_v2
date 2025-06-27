import React from 'react';
import './TopBar.css'; // optional

const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>Controls Over the Geochemistry of Galapagos Stylasterids</h1>
      </div>
      <div className="topbar-right">
        <span>Jackson Vaughn</span>
        <a href="mailto:jackson.vaughn@bristol.ac.uk" className="email-link">
          jackson.vaughn@bristol.ac.uk
        </a>
      </div>
    </header>
  );
};

export default TopBar;