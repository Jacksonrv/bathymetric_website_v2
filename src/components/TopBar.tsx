import React from 'react';
import './TopBar.css'; // optional

const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>My Master's Thesis</h1>
      </div>
      <div className="topbar-right">
        <span>Jackson Vaughn</span>
        <a href="mailto:jackson@example.com" className="email-link">
          jackson@example.com
        </a>
      </div>
    </header>
  );
};

export default TopBar;