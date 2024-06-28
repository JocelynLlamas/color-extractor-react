import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import './App.css';

const App = () => {
  const [colors, setColors] = useState([]);

  return (
    <div className='App'>
      <h1>Color Extractor</h1>
      <ImageUpload setColors={setColors} />
      {colors.length > 0 && (
        <div>
          <h2>Extracted Colors:</h2>
          <ul className='color-list'>
            {colors.map((color, index) => (
              <li key={index} style={{ backgroundColor: color, padding: '10px', margin: '5px', color: '#fff' }}>
                {color}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
