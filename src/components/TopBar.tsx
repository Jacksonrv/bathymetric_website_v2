import React from 'react';
import './Topbar.css'; // optional

const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <h1>My Master's Thesis</h1>
      <div>
        {/* You can add user info, a profile icon, or links here */}
        <span>Jackson Vaughn</span>
      </div>
    </header>
  );
};

export default TopBar;