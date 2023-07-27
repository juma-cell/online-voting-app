import React from 'react';
import image4 from '../assets/image4.png';

function Home() {
  return (
    <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
      <img src={image4} alt="Image 4" style={{ marginRight: '20px' }} />
      <span>Home</span>
    </div>
  );
}

export default Home;
