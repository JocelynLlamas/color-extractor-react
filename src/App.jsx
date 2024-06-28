import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
// import './App.css';

const App = () => {
  const [colors, setColors] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="Logo" className="h-10 mr-2" />
          <span className="text-xl font-bold text-gray-800">Color Extractor</span>
        </div>
        <a href="#" className="text-gray-600">Docs</a>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-5 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Upload an image to extract colors.</h1>
        <p className="text-lg text-gray-600 mb-8">
          This tool allows you to upload an image and extract the dominant colors from it. Simply drag and drop an image or click to select one.
        </p>
        <ImageUpload setColors={setColors} />
      </main>

      <section className="py-8 flex justify-center space-x-8">
        <img src="https://via.placeholder.com/40" alt="Figma" className="h-10" />
        <img src="https://via.placeholder.com/40" alt="React" className="h-10" />
        <img src="https://via.placeholder.com/40" alt="Other" className="h-10" />
      </section>

      {colors.length > 0 && (
        <section className="bg-gray-800 text-white py-8 w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-3">Extracted Colors:</h2>
          <ul className="flex flex-wrap justify-center">
            {colors.map((color, index) => (
              <li
                key={index}
                className="w-24 h-24 m-2 flex items-center justify-center text-white font-bold rounded-lg"
                style={{ backgroundColor: color }}>
                {color}
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="py-8">
        <p className="text-gray-600">Streamline Your Design with Color Extractor</p>
      </footer>
    </div>
  );
};

export default App;
