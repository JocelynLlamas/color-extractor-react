import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Palette, { getPalette } from "react-palette";

const ImageUpload = ({ setColors }) => {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                getPalette(img).then(palette => {
                    setColors(Object.values(palette));
                });
            };
        };
        reader.readAsDataURL(file);
    }, [setColors]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
    );
};

const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAling: 'center',
    cursor: 'pointer'
};

export default ImageUpload;