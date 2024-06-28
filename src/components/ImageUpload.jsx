import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Palette, { getPalette } from "react-palette";

// PROPS
const ImageUpload = ({ setColors, setUploadedImage }) => {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                getPalette(img).then(palette => {
                    console.log(palette)
                    setColors(Object.values(palette));
                });
            };
            setUploadedImage(reader.result);
        };
        reader.readAsDataURL(file);
    }, [setColors, setUploadedImage]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="border-2 border-dashed border-gray-400 rounded-lg p-10 text-center cursor-pointer">
            <input {...getInputProps()} />
            <p className="text-gray-500">Drag 'n' drop an image here, or click to select one</p>
        </div>
    );
};

export default ImageUpload;