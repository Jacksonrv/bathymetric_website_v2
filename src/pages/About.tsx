import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Jackson';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>About This Project</h1>
      <p>This is the about page content.</p>
    </div>
  );
};

export default About;
