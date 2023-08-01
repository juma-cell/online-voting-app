import React from 'react';
import image5 from '../assets/image5.png';
import image3 from '../assets/image3.png';

function Home() {
  return (
    <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
      {/* Card 1 */}
      <div style={{ marginRight: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <img src={image5} alt="" style={{ width: '400px', height: '200px', borderRadius: '8px 8px 0 0' }} />
        <div style={{ padding: '16px' }}>
          <h2>Card Title 1</h2>
          <p>Card description goes here.</p>
        </div>
      </div>

      {/* Card 2 */}
      <div style={{ marginRight: '90px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <img src={image3} alt="" style={{ width: '400px', height: '200px', borderRadius: '8px 8px 0 0' }} />
        <div style={{ padding: '16px' }}>
          <h2>Card Title 2</h2>
          <p>Card description goes here.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;