import React from 'react';
import image5 from '../assets/image5.png';
import image3 from '../assets/image3.png';

function Home() {
  return (
    <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>        
     <img src={image5} alt="" style={{ marginRight: '20px', width: '700px', height: '400px' }} />

    <img src={image3} alt="" style={{ marginRight: '90px', width: '700px', height: '400px' }} />



    </div>

   
  );
}

export default Home;
