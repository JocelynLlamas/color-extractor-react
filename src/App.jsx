import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import backgroundImg from './assets/images/Bitmap.png'

const App = () => {
  const [colors, setColors] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <img src={backgroundImg} alt="" className="relative" />

      <div className="absolute w-full">

        <header className="w-full bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://via.placeholder.com/40" alt="Logo" className="h-10 mr-2" />
            <span className="text-xl font-bold text-gray-800">Color Extractor</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-5 text-center m-5">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Upload an image to extract colors.</h1>
          <p className="text-lg text-gray-600 mb-8">
            This tool allows you to upload an image and extract the dominant colors from it. Simply drag and drop an image or click to select one.
          </p>
          <ImageUpload setColors={setColors} setUploadedImage={setUploadedImage} />
          {uploadedImage && (
            <div className="mt-8 max-w-96">
              <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto" />
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
                  className="w-24 h-24 m-2 flex items-center justify-center text-white font-bold rounded-lg cursor-pointer relative"
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

        <footer className="py-8">
          <p className="text-gray-600">Streamline Your Design with Color Extractor</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
