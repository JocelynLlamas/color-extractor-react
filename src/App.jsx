import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ColorPickerImage from './components/ColorPickerImage';
import backgroundImg from './assets/images/Bitmap.png';
import logo from './assets/images/logo.png';
import githubIcon from './assets/images/Github.svg';
import websiteIcon from './assets/images/Portfolio.svg';

// Transform color codes
const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `(${r}, ${g}, ${b})`;
};

const App = () => {
  const [colors, setColors] = useState([]);
  const [namesColors, setNamesColors] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [pickedColor, setPickedColor] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleColorClick = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      setAlertMessage(`Copied ${color} to clipboard`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }).catch((err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const convertToRgb = () => {
    setColors(colors.map(color => color.startsWith('#') ? hexToRgb(color) : color));
  };

  const convertToHex = () => {
    setColors(colors.map(color => color.startsWith('(') ? rgbToHex(color) : color));
  };

  const handleColorSelect = (color) => {
    setPickedColor(color);
  };

  const isColorDark = (rgb) => {

    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness < 128;
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <img src={backgroundImg} alt="" className="absolute w-full z-0 max-h-screen" />

      <div className="relative flex flex-col flex-grow w-full">
        <header className="w-full bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 mr-2 rounded-lg" />
            <span className="text-xl font-bold text-gray-800">Color Extractor</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-5 text-center  mt-5">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Upload an image to extract colors.</h1>
          <p className="text-md md:text-lg text-gray-600 mb-8">
            This tool allows you to upload an image and extract the dominant colors from it. Simply drag and drop an image or click to select one.
          </p>
          <ImageUpload setColors={setColors} setUploadedImage={setUploadedImage} setNamesColors={setNamesColors} />
          {/* {uploadedImage && (
            <div className="mt-8 max-w-xs md:max-w-3xl">
              <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto" />
            </div>
          )} */}
          {uploadedImage && (
            <div className="mt-8 max-w-xs md:max-w-3xl relative">
              <ColorPickerImage src={uploadedImage} onColorSelect={handleColorSelect} />
              {pickedColor && (
                <div 
                  className={`rounded-lg absolute top-0 left-full ml-4 p-2 bg-white  ${isColorDark(pickedColor) ? 'text-white' : 'text-black'}`} 
                  style={{ backgroundColor: pickedColor }}
                  onClick={() => handleColorClick(pickedColor)}
                >
                  Picked Color: {pickedColor}
                  <span className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                    Copy
                  </span>
                </div>
              )}
            </div>
          )}

          {colors.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center space-x-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 mb-2"
                onClick={convertToRgb}>
                Convert to RGB
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 mb-2"
                onClick={convertToHex}>
                Convert to HEX
              </button>
            </div>
          )}
        </main>

        {colors.length > 0 && (
          <section className="bg-gray-800 text-white py-8 w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-3">Extracted Colors:</h2>
            <ul className="flex flex-wrap justify-center">
              {colors.map((color, index) => (
                <li
                  key={index}
                  className="w-24 h-24 m-2 flex items-center justify-center text-white font-bold rounded-lg cursor-pointer relative text-center"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}>
                  {color}
                  <span className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                    Copy
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {showAlert && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {alertMessage}
          </div>
        )}
        <footer className="static w-full bg-gray-900 text-white py-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <img src={logo} alt="Logo" className="h-28 mb-4 rounded-lg" />
                <p className="text-gray-400">Building Tomorrow, One Line at a Time.</p>
                <div className="flex space-x-4 mt-4">
                  <a href="https://github.com/JocelynLlamas" className="text-gray-400 hover:text-white">
                    <img src={githubIcon} alt="GitHub" className="h-6" />
                  </a>
                  <a href="https://jocelynllamas.github.io/portfolio/build/" className="text-gray-400 hover:text-white">
                    <img src={websiteIcon} alt="Website" className="h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-400">
              © 2024 Jocelyn Llamas. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
