import React, { useRef, useState } from "react";

const ColorPickerImage = ({ src, onColorSelect }) => {

    const canvasRef = useRef(null);
    const [pickedColor, setPickedColor] = useState(null);

    const isColorDark = (rgb) => {

        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        return brightness < 128;

    };


    const handleImageClick = (event) => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;

        setPickedColor(color);
        if (onColorSelect) {
            onColorSelect(color);
        }
    };

    const handleImageLoad = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = src;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    };

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                onClick={handleImageClick}
                // className="cursor-crosshair"
                className="cursor-pointer text-white" // Cambia el cursor aquí
                style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 612 612\'%3E%3Cpath fill=\'white\' d=\'M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z\'/%3E%3C/svg%3E") 16 16, auto' }}
            />
            <img src={src} alt="Uploaded" onLoad={handleImageLoad} className="hidden" />
            {pickedColor && (
                <div className={`rounded-lg absolute top-0 right-0 p-2 ${isColorDark(pickedColor) ? 'text-white' : 'text-black'}`}
                    style={{ backgroundColor: pickedColor }}>
                    {pickedColor}
                </div>
            )}
        </div>
    );
};

export default ColorPickerImage;